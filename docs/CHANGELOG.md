# Change log

## 2026-10: production hardening

### Fixed
- **Admin edits now reach visitors.** Edits used to be saved only in the admin's own browser, and each visitor's browser kept its own frozen copy of the content. Content is now published through `content.json`. Admin edits are a clearly labelled draft until then, and visitor data (their registration) is stored separately.
- **Seat numbers cannot be tampered with** when the Google Sheet backend is connected. The public counter could be reset or filled by anyone, and duplicates across devices were not caught. `backend/Code.gs` issues seat and bed numbers under a lock, one per email.
- **Countdowns use Nigerian time.** Visitors abroad used to count down to 9am in their own time zone. Countdowns are now zero-padded and show "Happening now" or "ended" when the date comes.
- **Naira amounts match the exchange rate.** Copy said ₦15,000 per Bible while the calculator used ₦1,400 per dollar (₦14,000).
- **Placeholder videos removed.** All three "outreach videos" played the same unrelated music video.
- **Honest failure messages.** A failed giving submission used to say "your giving was recorded". It now says it was not sent and keeps the form filled in.
- Visitor registration data is kept when upgrading from the previous version.
- Bed numbers are no longer used up when the conference is already full.
- The two duplicate start-up routines (which opened the admin twice) are merged.
- The catalog filter buttons show which filter is active.
- The mobile menu's "Give Now" button text is readable.

### Security
- Everything inserted into the page from content, imports or forms is escaped. Unsafe image and video links are dropped.
- Form text that looks like a spreadsheet formula is stored as plain text in the Sheet.
- Hidden spam trap field on every form. Double-tap protection on every submit button.
- The giver's bank screenshot is no longer stored in their browser (it still goes to the ministry inbox).
- The reset of registration counters needs a server-side `RESET_KEY`.

### Performance
- Tailwind is compiled ahead of time: 26 KB of CSS instead of a ~400 KB in-browser compiler that flashed unstyled content.
- The map library loads only when the Gospel Map tab is opened. Videos load the YouTube player only when tapped.
- Below-the-fold images are lazy-loaded, and the logo is one cached file instead of two 23 KB inline copies.

### Accessibility
- Popups are real dialogs: focus moves in and back out, Tab stays inside, Escape closes, and the page behind does not scroll.
- Giving cards and partner pictures work with the keyboard. Every form field has a label. There is a skip link, visible focus rings, and reduced-motion support.

### Growth
- Link previews for WhatsApp, Facebook and X (Open Graph), meta description, favicon, and structured data for search engines.
- The welcome popup shows at most once every 3 days, and never to someone arriving on a direct link.

### Project
- Split into `index.html`, `assets/`, `config.js` (all settings in one place) and `content.json`.
- Automated tests: 12 backend tests and 13 browser tests. CI on GitHub Actions.
- README, backend set-up guide, launch checklist, and an admin password tool.
