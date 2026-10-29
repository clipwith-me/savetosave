/**
 * STS website backend: Google Apps Script bound to a Google Sheet.
 * Setup steps are in backend/README.md.
 *
 * What it does
 *  - Issues conference seat and bed numbers under a lock, one per email address,
 *    and keeps the official list in the "Registrations" tab.
 *  - Logs every website form (giving, partners, training, prayer...) to its own tab.
 *  - Keeps small public counters (April outreach sign-ups, email sequence numbers).
 *
 * Why it exists
 *  The free public counter the site used before can be reset or filled up by anyone
 *  on the internet, and it cannot tell that one person registered twice. Here the
 *  seat counter can only move when a registration row is written, and resetting
 *  needs the secret RESET_KEY.
 *
 * Script properties (Project Settings > Script properties)
 *  RESET_KEY   required to reset the counters from the Admin backend (long random text)
 *  CONF_MAX    conference capacity (default 200)
 *  FIRST_SEAT  first generated seat number (default 11; seats 1-10 are for ministers)
 */

var SETTINGS = {
  confMaxDefault: 200,
  firstSeatDefault: 11,
  maxDays: 3,
  regPrefix: "STS-MC27-",
  registrationsSheet: "Registrations",
  // Anyone may read these counts.
  readableCounters: ["mc-seat", "mc-bed", "april-join", "give-seq", "partner-seq"],
  // Anyone may add 1 to these: they only decide wording variety and a sign-up tally.
  // mc-seat and mc-bed only move through a registration.
  publicCounters: ["april-join", "give-seq", "partner-seq"],
  maxFieldLength: 2000,
  // Soft limits per minute for the whole site, so a script cannot flood the Sheet.
  perMinute: { register: 60, log: 120, up: 120 }
};

var REG_HEADERS = ["Registered at", "Registration ID", "Sequence", "Seat", "Bed", "Name", "Email", "Phone", "Location", "Heard about us", "Days", "Hostel", "Note"];

// ---------- Web entry points ----------

function doGet(e) {
  var p = String((e && e.parameter && e.parameter.p) || "");
  var m = p.match(/^\/([a-z-]+)(\/up)?$/);
  if (!m || SETTINGS.readableCounters.indexOf(m[1]) === -1) return json_({ error: "unknown counter" });
  var key = m[1];
  if (!m[2]) return json_({ count: getCount_(key) });
  if (SETTINGS.publicCounters.indexOf(key) === -1) return json_({ error: "forbidden" });
  if (!allow_("up")) return json_({ error: "busy" });
  return json_({ count: withLock_(function () { return bump_(key); }) });
}

function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return json_({ error: "bad request" }); }
  if (!body || typeof body !== "object") return json_({ error: "bad request" });
  try {
    if (body.action === "register") return json_(register_(body));
    if (body.action === "log") return json_(log_(body));
    if (body.action === "reset") return json_(reset_(body));
    return json_({ error: "unknown action" });
  } catch (err) {
    console.error(err);
    return json_({ error: "server error" });
  }
}

// ---------- Conference registration ----------

function register_(body) {
  var p = body.person || {};
  var email = clean_(p.email).toLowerCase();
  var name = clean_(p.name);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "invalid" };
  var days = Math.min(Math.max(parseInt(body.days, 10) || SETTINGS.maxDays, 1), SETTINGS.maxDays);
  var hostel = body.hostel === true;
  if (!allow_("register")) return { error: "busy" };

  return withLock_(function () {
    var sheet = registrationsSheet_();
    var existing = findRegistration_(sheet, email);
    if (existing) {
      existing.ok = true;
      existing.existing = true;
      return existing;
    }
    var props = PropertiesService.getScriptProperties();
    var max = Number(props.getProperty("CONF_MAX")) || SETTINGS.confMaxDefault;
    if (getCount_("mc-seat") >= max) return { full: true };
    var seq = bump_("mc-seat");
    var bed = hostel ? bump_("mc-bed") : null;
    var firstSeat = Number(props.getProperty("FIRST_SEAT")) || SETTINGS.firstSeatDefault;
    sheet.appendRow([
      new Date(), SETTINGS.regPrefix + pad3_(seq), seq, firstSeat + seq - 1, bed === null ? "" : bed,
      cell_(name), cell_(email), cell_(p.phone), cell_(p.location), cell_(p.heardAbout),
      days, hostel ? "Yes" : "No", body.testMode ? "TEST RUN" : ""
    ]);
    return { ok: true, seq: seq, bed: bed, days: days, hostel: hostel, name: name };
  });
}

function registrationsSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SETTINGS.registrationsSheet);
  if (!sheet) {
    sheet = ss.insertSheet(SETTINGS.registrationsSheet);
    sheet.appendRow(REG_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Returns the stored numbers for this email, or null.
function findRegistration_(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return null;
  var rows = sheet.getRange(2, 1, last - 1, REG_HEADERS.length).getValues();
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][6]).replace(/^'/, "").toLowerCase() === email) {
      var r = rows[i];
      return {
        seq: Number(r[2]),
        bed: r[4] === "" ? null : Number(r[4]),
        name: String(r[5]).replace(/^'/, ""),
        days: Number(r[10]) || SETTINGS.maxDays,
        hostel: r[11] === "Yes"
      };
    }
  }
  return null;
}

// ---------- Form log ----------

var LOG_TABS = [
  [/conference/i, "Conference"], [/giv|donat|gift/i, "Giving"], [/partner/i, "Partners"],
  [/train|join/i, "Training"], [/prayer/i, "Prayer"]
];

function log_(body) {
  var type = clean_(body.type) || "Other";
  var data = body.data && typeof body.data === "object" ? body.data : {};
  if (!allow_("log")) return { error: "busy" };
  var tab = "Other";
  for (var i = 0; i < LOG_TABS.length; i++) if (LOG_TABS[i][0].test(type)) { tab = LOG_TABS[i][1]; break; }

  return withLock_(function () {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tab);
    if (!sheet) {
      sheet = ss.insertSheet(tab);
      sheet.appendRow(["Received", "Type"]);
      sheet.setFrozenRows(1);
    }
    // New fields get a new column, so no detail is ever dropped.
    var lastCol = Math.max(sheet.getLastColumn(), 2);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(String);
    var keys = Object.keys(data).filter(function (k) { return /^[\w .()-]{1,60}$/.test(k); });
    var added = keys.filter(function (k) { return headers.indexOf(k) === -1; });
    if (added.length) {
      sheet.getRange(1, headers.length + 1, 1, added.length).setValues([added]);
      headers = headers.concat(added);
    }
    var row = headers.map(function (h, idx) {
      if (idx === 0) return new Date();
      if (idx === 1) return cell_(type);
      return keys.indexOf(h) === -1 ? "" : cell_(data[h]);
    });
    sheet.appendRow(row);
    return { ok: true };
  });
}

// ---------- Reset after testing ----------

function reset_(body) {
  var expected = PropertiesService.getScriptProperties().getProperty("RESET_KEY");
  if (!expected) return { error: "RESET_KEY is not set in the script properties" };
  if (!safeEqual_(String(body.key || ""), expected)) return { error: "forbidden" };
  return withLock_(function () {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS.registrationsSheet);
    // Test registrations are archived, not deleted, and the email check starts afresh.
    if (sheet && sheet.getLastRow() > 1) {
      sheet.setName(SETTINGS.registrationsSheet + " (archived " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm") + ")");
    }
    ["mc-seat", "mc-bed", "april-join"].forEach(function (k) { setCount_(k, 0); });
    return { ok: true };
  });
}

// ---------- Helpers ----------

function getCount_(key) {
  return Number(PropertiesService.getScriptProperties().getProperty("count:" + key)) || 0;
}
function setCount_(key, n) {
  PropertiesService.getScriptProperties().setProperty("count:" + key, String(n));
}
// Must be called while holding the lock.
function bump_(key) {
  var n = getCount_(key) + 1;
  setCount_(key, n);
  return n;
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

// Site-wide per-minute budget for one kind of request.
function allow_(kind) {
  var cache = CacheService.getScriptCache();
  var key = "rate:" + kind + ":" + Math.floor(Date.now() / 60000);
  var used = Number(cache.get(key)) || 0;
  if (used >= SETTINGS.perMinute[kind]) return false;
  cache.put(key, String(used + 1), 120);
  return true;
}

function clean_(v) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, SETTINGS.maxFieldLength);
}
// Text that starts with = + - or @ would run as a spreadsheet formula (for example
// =IMPORTXML(...) sending data elsewhere). A leading apostrophe keeps it as plain text;
// it also keeps "+234..." phone numbers from turning into numbers.
function cell_(v) {
  if (typeof v === "number" || typeof v === "boolean") return v;
  var s = clean_(typeof v === "object" && v !== null ? JSON.stringify(v) : v);
  return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
}
function pad3_(n) { return ("00" + n).slice(-Math.max(3, String(n).length)); }

function safeEqual_(a, b) {
  if (a.length !== b.length) return false;
  var diff = 0;
  for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
