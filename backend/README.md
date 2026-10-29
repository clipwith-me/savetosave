# Google Sheet backend (optional, recommended before launch)

A free Google Apps Script attached to a Google Sheet. It gives the site:

- **Reliable seat and bed numbers.** They are issued one at a time under a lock, so two people never get the same seat.
- **One seat per email.** Someone who registers again, even on another phone, gets their original numbers back.
- **A live registration list** in the `Registrations` tab, plus one tab per form (Giving, Partners, Training, Prayer, Conference).
- **Protected counters.** Only a real registration moves the seat counter, and resetting needs your secret `RESET_KEY`.

Without it, the site uses a free public counter (counterapi.dev). Anyone on the internet can reset or fill that counter, and it cannot spot duplicate registrations. That is fine for testing, but not for the real conference.

Cost: free (Google Workspace limits are far above what 200 registrations need).

## Set-up (about 10 minutes)

1. Create a new Google Sheet with the ministry Google account, for example *STS Website*.
2. In the Sheet: **Extensions > Apps Script**. Delete the sample code, paste in all of [`Code.gs`](Code.gs), then save.
3. **Project Settings** (gear icon) > **Script properties** > add:
   | Property | Value |
   | --- | --- |
   | `RESET_KEY` | a long random phrase. Keep it private: it is needed to reset the counters after testing. |
   | `CONF_MAX` | `200` (conference capacity) |
   | `FIRST_SEAT` | `11` (seats 1-10 are reserved for ministers) |
4. **Deploy > New deployment** > type **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   Press **Deploy**, allow the permissions, and copy the **Web app URL** (it ends in `/exec`).
5. In `assets/js/config.js` set:
   ```js
   sheetUrl: "https://script.google.com/macros/s/XXXX/exec",
   sheetViewUrl: "https://docs.google.com/spreadsheets/d/YYYY/edit",
   ```
6. Publish the site, then make one test registration and check that a row appears in the `Registrations` tab.

### After testing

In the admin backend press **Reset registration counters** and enter your `RESET_KEY`. The test registrations move to an archived tab (nothing is deleted), the counters return to 0, and the next seat number is 11 again.

### Updating the script later

Paste the new `Code.gs`, then **Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy**. The URL stays the same.

## How the site talks to it

| Request | Purpose |
| --- | --- |
| `GET ?p=/mc-seat` | seats taken (also `mc-bed`, `april-join`, `give-seq`, `partner-seq`) |
| `GET ?p=/april-join/up` | +1 for public, non-critical counters only |
| `POST {"action":"register", person, days, hostel}` | issue (or look up) a seat and bed |
| `POST {"action":"log", type, data}` | add a row to the matching tab |
| `POST {"action":"reset", key}` | archive registrations and reset counters (needs `RESET_KEY`) |

Text that looks like a spreadsheet formula (`=...`, `+...`) is stored as plain text, so a form cannot inject formulas into your Sheet. Requests are capped per minute so a script cannot flood it.

Tests for this file live in `tests/backend.test.mjs` and run in Node with stand-ins for the Google services (`npm test`).
