// Browser tests for the public site and the admin backend.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { pbkdf2Sync } from "node:crypto";
import { setup, teardown, openSite, SHEET } from "./helpers.mjs";

before(setup);
after(teardown);

// Skip the welcome popup unless a test is about it.
const NO_POPUP = { sts_welcome_seen_at: String(Date.now()) };

async function fillRegistration(page, email, { hostel = "yes", days = "3" } = {}) {
  await page.click("text=Register as one of the 200 Missionaries");
  await page.fill("#regFullName", "Ada Obi");
  await page.fill("#regEmail", email);
  await page.fill("#regPhone", "+2348011111111");
  await page.fill("#regLocation", "Ibadan, Oyo, Nigeria");
  await page.selectOption("#regDays", days);
  await page.selectOption("#regHostel", hostel);
  await page.selectOption("#regHeard", "WhatsApp");
  await page.click("#regSubmitBtn");
  await page.waitForSelector("#invoiceModal:not(.hidden)");
}

test("home page renders with no script errors", async () => {
  const { page, context, log } = await openSite({ storage: NO_POPUP });
  assert.equal(await page.locator("#catalogGrid > div").count(), 6);
  assert.equal(await page.locator("[data-ngn]").first().textContent(), "₦14,000", "Naira copy follows the configured rate");
  assert.match(await page.textContent("#confDays"), /^\d{2,}$/, "countdown is zero-padded");
  assert.match(await page.textContent("#videoGrid"), /Outreach videos are on their way/, "no placeholder videos");
  assert.equal(await page.locator("#draftBadge").count(), 0);
  assert.deepEqual(log.errors, []);
  await context.close();
});

test("countdown counts to Nigerian time, whatever the visitor's time zone", async () => {
  const { page, context } = await openSite({ storage: NO_POPUP });
  const parts = await page.evaluate(() => [
    countdownParts("2027-02-10T09:00:00+01:00", "2027-02-12T18:00:00+01:00", Date.parse("2027-02-09T08:00:00Z")),
    countdownParts("2027-02-10T09:00:00+01:00", "2027-02-12T18:00:00+01:00", Date.parse("2027-02-11T12:00:00Z")),
    countdownParts("2027-02-10T09:00:00+01:00", "2027-02-12T18:00:00+01:00", Date.parse("2027-03-01T00:00:00Z"))
  ]);
  assert.deepEqual(parts[0], { state: "upcoming", days: 1, hours: 0, mins: 0, secs: 0 });
  assert.equal(parts[1].state, "live");
  assert.equal(parts[2].state, "ended");
  await context.close();
});

test("published content.json reaches visitors, and is escaped", async () => {
  const content = {
    souls: "5,123+",
    catalog: [{ title: "<img src=x onerror=window.__xss=1>Crusade", category: "Crusades", img: "javascript:alert(1)", desc: "<b>bold</b>" }],
    mapLocations: [{ name: "<script>window.__xss=2</script>Village", region: "AFRICA_REACHED", lat: 1, lng: 1, note: "n" }],
    videos: [{ title: "Real video", embed: "https://youtu.be/abcdefghijk" }, { title: "Bad", embed: "javascript:alert(1)" }]
  };
  const { page, context, log } = await openSite({ content, storage: NO_POPUP });
  assert.equal(await page.textContent("#statSoulsDisplay"), "5,123+");
  assert.match(await page.textContent("#catalogGrid"), /<img src=x onerror=window.__xss=1>Crusade/, "shown as text");
  assert.equal(await page.locator("#catalogGrid img").count(), 0, "unsafe image link dropped");
  assert.match(await page.textContent("#listAfricaReached"), /<script>/);
  assert.equal(await page.locator(".yt-facade").count(), 1, "only the valid YouTube link is shown");
  await page.click(".sts-tab[data-t='videos']");
  await page.click(".yt-facade");
  assert.match(await page.getAttribute("#videoGrid iframe", "src"), /^https:\/\/www\.youtube-nocookie\.com\/embed\/abcdefghijk\?/);
  assert.equal(await page.evaluate(() => window.__xss), undefined);
  assert.deepEqual(log.errors, []);
  await context.close();
});

test("a visitor's old saved copy no longer hides published content", async () => {
  const legacy = {
    souls: "4,000+", bibles: "2,500+", villages: "15+", missionaries: "40+", statsV2: true, bankVer: 2,
    catalog: [{ title: "Old card", category: "Crusades", img: "", desc: "old" }],
    lastReg: { regId: "STS-MC27-007", seat: 17, name: "Old Visitor", meals: [], days: 1 },
    regs: { "old@example.com": { regId: "STS-MC27-007" } }, submissions: []
  };
  const { page, context } = await openSite({ content: { souls: "9,999+" }, storage: Object.assign({ sts_ministry_state_v4: legacy }, NO_POPUP) });
  assert.equal(await page.textContent("#statSoulsDisplay"), "9,999+");
  assert.doesNotMatch(await page.textContent("#catalogGrid"), /Old card/);
  assert.equal(await page.isVisible("#viewMyInvoiceBtn"), true, "their registration was kept");
  const stored = await page.evaluate(() => ({
    legacy: localStorage.getItem("sts_ministry_state_v4"),
    visitor: JSON.parse(localStorage.getItem("sts_visitor_v5")),
    backup: JSON.parse(localStorage.getItem("sts_legacy_v4_backup"))
  }));
  assert.equal(stored.legacy, null);
  assert.equal(stored.visitor.lastReg.regId, "STS-MC27-007");
  assert.equal(stored.backup.catalog[0].title, "Old card", "edited content is kept for the admin to restore");
  await context.close();
});

test("conference registration through the Google Sheet backend", async () => {
  let seq = 0;
  const sheet = body => {
    if (body.action === "register") return body.person.email === "back@example.com"
      ? { ok: true, existing: true, seq: 4, bed: 2, days: 2, hostel: true, name: "Returning Person" }
      : { ok: true, seq: ++seq, bed: body.hostel ? seq : null, days: body.days, hostel: body.hostel };
    return { ok: true };
  };
  const { page, context, log } = await openSite({ config: { sheetUrl: SHEET, testMode: false }, sheet, storage: NO_POPUP });
  await fillRegistration(page, "ada@example.com");
  const sheetText = await page.textContent("#invoiceSheet");
  assert.match(sheetText, /STS-MC27-001/);
  assert.match(sheetText, /SEAT NO\.\s*11/);
  assert.match(sheetText, /BED NO\.\s*1/);
  assert.equal(await page.locator(".inv-ticket").count(), 6, "2 meals x 3 days");
  const reg = log.sheet.find(b => b.action === "register");
  assert.equal(reg.person.email, "ada@example.com");
  assert.equal(reg.hostel, true);
  assert.ok(log.formsubmit.length >= 2, "ministry email and the person's copy were sent");
  assert.equal(await page.locator("text=TEST RUN").count(), 0, "no test badge when testMode is off");

  // Someone who registered on another phone gets their original numbers back.
  await page.evaluate(() => document.getElementById("invoiceModal").classList.add("hidden"));
  await fillRegistration(page, "back@example.com");
  assert.match(await page.textContent("#invoiceSheet"), /STS-MC27-004/);
  assert.match(await page.textContent("#invoiceNotice"), /already registered/);
  assert.equal(log.sheet.filter(b => b.action === "register").length, 2);
  assert.deepEqual(log.errors, []);
  await context.close();
});

test("a full conference is reported and no invoice is issued", async () => {
  const { page, context, log } = await openSite({ config: { sheetUrl: SHEET }, sheet: b => (b.action === "register" ? { full: true } : { ok: true }), storage: NO_POPUP });
  await page.click("text=Register as one of the 200 Missionaries");
  await page.fill("#regFullName", "Late Person");
  await page.fill("#regEmail", "late@example.com");
  await page.fill("#regPhone", "+2348000000000");
  await page.fill("#regLocation", "Abuja");
  await page.selectOption("#regDays", "1");
  await page.selectOption("#regHostel", "no");
  await page.selectOption("#regHeard", "Facebook");
  await page.click("#regSubmitBtn");
  await page.waitForFunction(() => !document.getElementById("regSubmitBtn").disabled);
  assert.match(log.lastDialog, /seats .* are now filled/);
  assert.equal(await page.isVisible("#invoiceModal"), false);
  await context.close();
});

test("registration with the public counter, and offline test numbers", async () => {
  let seat = 0;
  const { page, context } = await openSite({ counter: p => (p === "/mc-seat/up" ? ++seat : p === "/mc-bed/up" ? 1 : 0), storage: NO_POPUP });
  await fillRegistration(page, "first@example.com", { hostel: "no", days: "2" });
  assert.match(await page.textContent("#invoiceSheet"), /STS-MC27-001/);
  assert.equal(await page.locator(".inv-ticket").count(), 4);
  await context.close();

  // Counter unreachable while testMode is on: temporary numbers, clearly labelled.
  const offline = await openSite({ counter: () => null, storage: NO_POPUP });
  await fillRegistration(offline.page, "offline@example.com");
  assert.match(await offline.page.textContent("#invoiceSheet"), /TEST-MC27-001/);
  assert.match(await offline.page.textContent("#invoiceNotice"), /TEST RUN/);
  await offline.context.close();
});

test("spam bots filling the hidden field are dropped silently", async () => {
  const { page, context, log } = await openSite({ storage: NO_POPUP });
  await page.fill("#prayName", "Bot");
  await page.fill("#prayContact", "bot@example.com");
  await page.fill("#prayMessage", "buy now");
  await page.evaluate(() => { document.querySelector("#prayer input[name=website]").value = "http://spam.example"; });
  await page.click("text=Send Prayer Request to Altar");
  await page.waitForTimeout(300);
  assert.equal(log.formsubmit.length, 0);

  await page.evaluate(() => { document.querySelector("#prayer input[name=website]").value = ""; });
  await page.fill("#prayName", "Real Person");
  await page.fill("#prayContact", "real@example.com");
  await page.fill("#prayMessage", "Please pray for my family");
  await page.click("text=Send Prayer Request to Altar");
  await page.waitForFunction(() => document.getElementById("prayName").value === "");
  assert.equal(log.formsubmit.length, 1);
  assert.match(log.lastDialog, /prayer request has been received/);
  await context.close();
});

test("a giving form that fails to send says so and keeps what was typed", async () => {
  const { page, context, log } = await openSite({ formsubmit: false, storage: NO_POPUP });
  await page.fill("#giveName", "Ada Obi");
  await page.fill("#givePhone", "+2348011111111");
  await page.fill("#giveAmount", "50");
  await page.fill("#giveEmail", "ada@example.com");
  await page.setInputFiles("#giveShot", { name: "receipt.png", mimeType: "image/png", buffer: Buffer.from("89504e470d0a1a0a", "hex") });
  await page.check("#giveDone");
  await page.click("#giveSubmitBtn");
  await page.waitForFunction(() => !document.getElementById("giveSubmitBtn").disabled && document.getElementById("giveSubmitBtn").textContent.includes("Confirm"));
  assert.match(log.lastDialog, /NOT sent/);
  assert.equal(await page.inputValue("#giveName"), "Ada Obi");
  const logged = await page.evaluate(() => JSON.parse(localStorage.getItem("sts_visitor_v5")).submissions[0].details);
  assert.equal(logged.screenshot, undefined, "the bank screenshot is not kept in the browser");
  await context.close();
});

test("the welcome popup shows once, then stays away", async () => {
  const { page, context } = await openSite();
  await page.waitForSelector("#hookPopupModal:not(.hidden)", { timeout: 4000 });
  assert.equal(await page.evaluate(() => document.activeElement.closest("#hookPopupModal") !== null), true, "focus moves into the popup");
  await page.keyboard.press("Escape");
  assert.equal(await page.isVisible("#hookPopupModal"), false);
  await page.reload();
  await page.waitForFunction(() => document.querySelectorAll("#catalogGrid > *").length > 0);
  await page.waitForTimeout(2000);
  assert.equal(await page.isVisible("#hookPopupModal"), false);
  await context.close();
});

test("giving cards work from the keyboard", async () => {
  const { page, context } = await openSite({ storage: NO_POPUP });
  const card = page.locator(".give-cat-card").nth(2);
  await card.focus();
  await page.keyboard.press("Enter");
  await page.waitForSelector("#accountModal:not(.hidden)");
  assert.equal(await page.textContent("#modalPurpose"), "Missionary Support in the Field");
  assert.equal(await card.getAttribute("aria-pressed"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await page.isVisible("#accountModal"), false);
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains("give-cat-card")), true, "focus returns to the card");
  await context.close();
});

test("the map loads only when its tab is opened", async () => {
  const { page, context } = await openSite({ storage: NO_POPUP });
  assert.equal(await page.evaluate(() => typeof window.L), "undefined");
  await page.click(".sts-tab[data-t='gospel-map']");
  await page.waitForFunction(() => window.mapInstance || (typeof mapInstance !== "undefined" && mapInstance));
  assert.equal(await page.evaluate(() => mapMarkers.length), 12);
  await page.click("[data-region='AFRICA_UNREACHED']");
  await page.waitForFunction(() => mapMarkers.length === 4);
  await context.close();
});

test("admin edits stay a draft until content.json is published", async () => {
  const salt = "testsalt", password = "test-password";
  const hash = pbkdf2Sync(password, salt, 600000, 32, "sha256").toString("hex");
  const config = { admin: { salt, hash } };
  const { page, context } = await openSite({ config, hash: "#sts-office-7k29" });
  await page.waitForSelector("#adminModal:not(.hidden)");
  await page.fill("#adminEmailInput", "stsglobaloutreach@gmail.com");
  await page.fill("#adminPassInput", "wrong");
  await page.click("text=Unlock Backend Dashboard");
  await page.waitForFunction(() => document.getElementById("adminDashboardView").classList.contains("hidden") && adminFails === 1);
  await page.fill("#adminPassInput", password);
  await page.click("text=Unlock Backend Dashboard");
  await page.waitForSelector("#adminDashboardView:not(.hidden)", { timeout: 15000 });

  await page.fill("#editSouls", "7,777+");
  await page.click("text=Save Numbers & Bank Details (draft)");
  assert.equal(await page.textContent("#statSoulsDisplay"), "7,777+");
  assert.equal(await page.locator("#draftBadge").count(), 1);
  assert.match(await page.textContent("#publishStatus"), /unpublished changes/);

  const download = page.waitForEvent("download");
  await page.click("button:has-text(\"Download content.json\")");
  const file = await download;
  assert.equal(file.suggestedFilename(), "content.json");
  const published = JSON.parse(await (await import("node:fs/promises")).readFile(await file.path(), "utf8"));
  assert.equal(published.souls, "7,777+");
  assert.equal(published.submissions, undefined, "visitor data is never published");
  assert.equal(published.lastReg, undefined);
  await context.close();

  // Another visitor sees the published file, not the admin's draft.
  const visitor = await openSite({ content: published, storage: NO_POPUP });
  assert.equal(await visitor.page.textContent("#statSoulsDisplay"), "7,777+");
  assert.equal(await visitor.page.locator("#draftBadge").count(), 0);
  await visitor.context.close();
});

test("with motion on, numbers count up to the published value and sections reveal", async () => {
  const { page, context, log } = await openSite({ motion: true, content: { souls: "5,123+" }, storage: NO_POPUP });
  await page.waitForFunction(() => document.getElementById("statSoulsDisplay").textContent === "5,123+", null, { timeout: 5000 });
  assert.equal(await page.evaluate(() => document.documentElement.classList.contains("js-reveal")), true);
  await page.evaluate(() => goTo("#about"));
  await page.waitForFunction(() => document.querySelector("#about .sec-title").classList.contains("in"), null, { timeout: 5000 });
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForFunction(() => document.getElementById("siteHeader").classList.contains("is-scrolled"));
  assert.deepEqual(log.errors, []);
  await context.close();
});
