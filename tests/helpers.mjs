// Shared set-up for the browser tests: a local server, a headless Chromium, and
// stand-ins for every outside service (CDNs, FormSubmit, counters, Apps Script),
// so tests are fast, offline and never send real emails.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { startServer } from "../scripts/serve.mjs";

const CONFIG_SRC = readFileSync(new URL("../assets/js/config.js", import.meta.url), "utf8");
export const SHEET = "https://script.google.com/macros/s/TEST/exec";

// A tiny stand-in for Leaflet, enough for the map code paths.
const FAKE_LEAFLET = `window.L = (function () {
  function layer() { return { addTo: function (m) { (m._layers = m._layers || []).push(this); return this; }, bindPopup: function (h) { this.popup = h; return this; } }; }
  return {
    map: function () { return { setView: function () { return this; }, removeLayer: function (l) { this._layers = (this._layers || []).filter(function (x) { return x !== l; }); }, invalidateSize: function () {} }; },
    tileLayer: function () { return layer(); },
    divIcon: function (o) { return o; },
    marker: function () { return layer(); }
  };
})();`;

let server, browser, port;
export async function setup() {
  port = 8200 + Math.floor(Math.random() * 700);
  server = await startServer(port);
  browser = await chromium.launch();
}
export async function teardown() {
  await browser?.close();
  server?.close();
}

/**
 * Opens the site in a fresh browser profile.
 * options.config      overrides merged into window.STS_CONFIG
 * options.content     object served as content.json (default: the real file)
 * options.storage     localStorage entries set before the page loads
 * options.sheet       function(body) -> response object for Apps Script POSTs
 * options.counter     function(path) -> count for the public counter
 * options.formsubmit  false to make FormSubmit fail
 */
export async function openSite(options = {}) {
  // Reduced motion keeps count-up numbers and scroll reveals out of the assertions.
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, acceptDownloads: true, reducedMotion: options.motion ? "no-preference" : "reduce" });
  const page = await context.newPage();
  const log = { errors: [], formsubmit: [], sheet: [], counter: [] };
  page.on("pageerror", e => log.errors.push(e.message));
  page.on("dialog", d => { log.lastDialog = d.message(); (log.dialogs = log.dialogs || []).push(d.message()); d.accept(options.promptAnswer).catch(() => {}); });

  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, async route => {
    const req = route.request();
    const url = req.url();
    if (url.startsWith("https://formsubmit.co/")) {
      log.formsubmit.push({ url, body: req.postData() });
      const ok = options.formsubmit !== false;
      return route.fulfill({ status: ok ? 200 : 500, contentType: "application/json", body: JSON.stringify({ success: ok }) });
    }
    if (url.startsWith(SHEET)) {
      if (req.method() === "POST") {
        const body = JSON.parse(req.postData());
        log.sheet.push(body);
        const res = options.sheet ? options.sheet(body) : { ok: true };
        return res === null ? route.abort() : route.fulfill({ contentType: "application/json", body: JSON.stringify(res) });
      }
      return route.fulfill({ contentType: "application/json", body: JSON.stringify({ count: 0 }) });
    }
    if (url.startsWith("https://api.counterapi.dev/")) {
      const path = url.replace(/^https:\/\/api\.counterapi\.dev\/v1\/[^/]+/, "");
      log.counter.push(path);
      const n = options.counter ? options.counter(path) : null;
      return n === null ? route.abort() : route.fulfill({ contentType: "application/json", body: JSON.stringify({ count: n }) });
    }
    if (/leaflet\.min\.js$/.test(url)) return route.fulfill({ contentType: "text/javascript", body: FAKE_LEAFLET });
    return route.fulfill({ status: 200, body: "" });
  });
  if (options.config) {
    await page.route("**/assets/js/config.js", r => r.fulfill({ contentType: "text/javascript", body: CONFIG_SRC + `\nObject.assign(window.STS_CONFIG, ${JSON.stringify(options.config)});` }));
  }
  if (options.content) {
    await page.route("**/content.json", r => r.fulfill({ contentType: "application/json", body: JSON.stringify(options.content) }));
  }
  if (options.storage) {
    await context.addInitScript(entries => {
      if (sessionStorage.getItem("__seeded")) return; // seed once, not on every reload
      sessionStorage.setItem("__seeded", "1");
      Object.entries(entries).forEach(([k, v]) => localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v)));
    }, options.storage);
  }
  await page.goto(`http://127.0.0.1:${port}/${options.hash || ""}`);
  await page.waitForFunction(() => document.querySelectorAll("#catalogGrid > *").length > 0);
  return { page, context, log };
}
