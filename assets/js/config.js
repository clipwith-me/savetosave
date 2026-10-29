/*
 * STS website settings.
 * ---------------------------------------------------------------------------
 * Everything the ministry may need to change without touching the app code
 * lives here. Content that changes often (numbers, catalog, events, gallery,
 * bank details) is NOT here: edit it in the Admin backend and publish
 * content.json (see README.md, "Publishing content").
 */
window.STS_CONFIG = {
  // Every form on the site is delivered to this inbox (through FormSubmit.co).
  // The FIRST submission after changing it sends an activation email that must be confirmed.
  receiverEmail: "stsglobaloutreach@gmail.com",

  // Secret-ish address of the admin backend: https://your-site/#sts-office-7k29
  // This only hides the login screen. The real protection is the password below.
  adminRoute: "#sts-office-7k29",

  // TEST RUN SWITCH. While true:
  //  - a yellow "TEST RUN" badge shows on every page,
  //  - conference registration still issues temporary TEST numbers when the
  //    numbering service cannot be reached.
  // Set to false before the real launch (see docs/LAUNCH_CHECKLIST.md).
  testMode: true,

  // SHARED DATABASE (Google Sheet + Apps Script, see backend/README.md).
  // Paste the Web app URL (ends in /exec). While empty, the site falls back to
  // the free public counter below and email only.
  sheetUrl: "",
  // Link to the Google Sheet itself (opened from the Admin backend).
  sheetViewUrl: "",
  // Fallback numbering service used only while sheetUrl is empty.
  publicCounterUrl: "https://api.counterapi.dev/v1/stsglobaloutreach-2027",

  // Exchange rate used for every Naira/Dollar amount on the site.
  ngnPerUsd: 1400,

  conference: {
    name: "Missionaries Conference 2027",
    // Times are Nigerian time (WAT, UTC+1) so the countdown is right for visitors abroad too.
    start: "2027-02-10T09:00:00+01:00",
    end: "2027-02-12T18:00:00+01:00",
    // Seats 1 to 10 are reserved for ministers, so generated seat numbers start at 11.
    firstGeneratedSeat: 11,
    days: [
      { label: "Day 1", date: "Wed, Feb 10, 2027" },
      { label: "Day 2", date: "Thu, Feb 11, 2027" },
      { label: "Day 3", date: "Fri, Feb 12, 2027" }
    ]
  },

  aprilOutreach: {
    start: "2027-04-16T09:00:00+01:00",
    end: "2027-04-18T18:00:00+01:00"
  },

  // Admin password check (PBKDF2-SHA256, 600,000 rounds). The password itself is
  // never stored here. To change it, follow "Changing the admin password" in README.md.
  admin: {
    salt: "ad4fefd9d67e0518d074b2c5ccbc5fd7",
    hash: "d860733f7b8d1038a9c57fb8f7349ce9d131f033f854b0bf68dae34e516f8e98"
  },

  // The welcome popup shows at most once in this many days per visitor.
  welcomePopupEveryDays: 3
};
