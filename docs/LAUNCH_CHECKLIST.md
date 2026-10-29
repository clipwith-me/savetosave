# Launch checklist

Work through this before sharing the link widely (church announcements, WhatsApp broadcasts, flyers).

## Must do

- [ ] **Turn test mode off.** Set `testMode: false` in `assets/js/config.js`. The yellow "TEST RUN: nothing here is final" badge currently shows to every visitor.
- [ ] **Connect the Google Sheet backend** (`backend/README.md`) and set `sheetUrl`. Without it, seat numbers come from a public counter that anyone can reset or fill, and duplicate registrations cannot be detected.
- [ ] **Reset the counters after testing.** Admin backend > "Reset registration counters", so the first real person gets seat 11.
- [ ] **Activate FormSubmit.** Submit any form once and confirm the activation email sent to `stsglobaloutreach@gmail.com`. Until then, no form email is delivered.
- [ ] **Check the bank details.** The site currently shows *Union Bank (Temporary Account)*. Update them in the admin backend and publish `content.json`.
- [ ] **Choose a strong admin password** (`node scripts/hash-password.mjs`). The password check is visible in the page source, so a short password can be guessed offline. Use a long passphrase.
- [ ] **Publish `content.json`** with any edits you made in the admin backend. Edits made before this update lived only in that browser. The backend offers to load them as a draft.

## Should do (trust and growth)

- [ ] **Use real photos.** The hero, catalog and gallery use stock photos from Unsplash. Donors notice stock pictures. Real outreach photos (with permission from the people in them) build far more trust. Replace catalog and gallery pictures in the admin backend, and the hero and hook-card pictures in `index.html`.
- [ ] **Add real videos.** The video tab invites people to Facebook until you add YouTube links in the admin backend. The old placeholders all played the same unrelated music video.
- [ ] **Confirm the published claims.** Impact numbers ("4,000+ souls", "2,500+ Bibles") and "100% of it goes strictly to that need" should be numbers and promises the ministry can stand behind if asked.
- [ ] **Set the link preview image.** Replace the `og:image` URL in `index.html` with a real 1200x630 photo hosted on your site. It is what WhatsApp and Facebook show when the link is shared.
- [ ] **Add Paystack and Stripe payment links** in the admin backend. One-tap card payment converts far better than copying an account number.
- [ ] **Use a custom domain** (for example `savedtobesent.org`, about $10-15 a year). It looks more trustworthy than a free subdomain and keeps links stable if you change host.

## After launch

- Check the `Registrations` tab against the ministry inbox during the first week.
- Watch the conference count. The site closes registration automatically at `CONF_MAX`.
- Keep `content.json` in GitHub: every change is recorded and can be undone.
