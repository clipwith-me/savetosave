// Mobile responsiveness check: the page and every popup at six screen widths,
// from a small phone (320px) to a small laptop. Fails on anything wider than the
// screen, clipped labels, tap targets under 40px, or text under 12px
// (11px inside the printable invoice).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { setup, teardown, openSite } from "./helpers.mjs";

before(setup);
after(teardown);

const audit = page => page.evaluate(() => {
  const vw = window.innerWidth, out = { overflow: [], clipped: [], small: [], tiny: [] };
  const name = el => el.id ? "#" + el.id : el.tagName.toLowerCase() + "." + [...el.classList].slice(0, 3).join(".") + (el.textContent.trim() ? ` "${el.textContent.trim().slice(0, 30)}"` : "");
  const visible = el => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && !el.closest(".hp-field,.hidden,.skip-link,#heroSlides,[aria-hidden=true]") };
  const root = document.querySelector(".sts-modal:not(.hidden)") || document.body;
  root.querySelectorAll("*").forEach(el => {
    if (!visible(el)) return;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !el.closest(".overflow-x-auto")) out.overflow.push(name(el) + ` [${Math.round(r.left)}..${Math.round(r.right)}]`);
    if ((el.matches(".btn,button,.contact-value,h1,h2,h3,label") ) && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible") out.clipped.push(name(el));
    if (el.matches("a,button,input,select,textarea,[role=button]") && !el.closest("p,li .work-desc,.inv-sheet") && (r.height < 40 || r.width < 40) && !el.matches(".hero-dot,#adminDashboardView > div:first-child button") && !el.closest("svg") && el.type !== "checkbox" && el.type !== "file") out.small.push(name(el) + ` ${Math.round(r.width)}x${Math.round(r.height)}`);
    if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(el).fontSize) < (el.closest(".inv-sheet") ? 11 : 12) && !el.closest("svg")) out.tiny.push(name(el) + " " + getComputedStyle(el).fontSize);
  });
  out.docOverflow = document.documentElement.scrollWidth > vw ? document.documentElement.scrollWidth : 0;
  return out;
});

const POPUPS = [
  ["payment options", () => openAccountModal("Bibles for Unreached Areas ($10/Bible)")],
  ["registration", () => openEventModal("Missionaries Conference 2027 (Feb 10-12)")],
  ["monthly partner", () => openPartnerModal()],
  ["why $10 matters", () => openHookModal()],
  ["invoice", () => showInvoice(buildRegistration({ seq: 5, bed: 3, days: 3, hostel: true, shared: true, name: "Oluwaseun Adebayo-Johnson", email: "averyveryverylongemailaddress@example.com", phone: "+2348011111111", location: "Ile-Ife, Osun State, Nigeria" }))],
  ["admin", () => { adminUnlocked = true; openAdminModal(); document.getElementById("adminLoginView").classList.add("hidden"); document.getElementById("adminDashboardView").classList.remove("hidden"); }]
];

test("the page and every popup fit screens from 320px to 1024px wide", async () => {
  const { page, context, log } = await openSite({});
  const problems = [];
  const check = (label, r) => {
    if (r.docOverflow) problems.push(`${label}: page is ${r.docOverflow}px wide`);
    for (const k of ["overflow", "clipped", "small", "tiny"]) if (r[k].length) problems.push(`${label} ${k}: ${[...new Set(r[k])].slice(0, 5).join(" | ")}`);
  };
  for (const [w, h] of [[320, 568], [360, 740], [390, 844], [414, 896], [768, 1024], [1024, 768]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(200);
    check(`${w}px page`, await audit(page));
    for (const [label, open] of POPUPS) {
      await page.evaluate(open);
      await page.waitForTimeout(150);
      check(`${w}px ${label}`, await audit(page));
      await page.evaluate(() => document.querySelectorAll(".sts-modal").forEach(m => m.classList.add("hidden")));
    }
  }
  assert.deepEqual(problems, []);
  assert.deepEqual(log.errors, []);
  await context.close();
});
