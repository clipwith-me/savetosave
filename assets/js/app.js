/*
 * STS website application code.
 * Settings live in config.js. Content (numbers, catalog, events, gallery,
 * bank details...) has three layers, later ones winning:
 *   1. DEFAULT_CONTENT below (built into the site),
 *   2. content.json, published next to index.html: what every visitor sees,
 *   3. an admin DRAFT kept only in the admin's own browser until it is published.
 * Each visitor's own data (their registration, local counters) is stored separately
 * so a visitor's old copy can never hide newly published content.
 */
const CONFIG = window.STS_CONFIG || {};
const RECEIVER_EMAIL = CONFIG.receiverEmail || "stsglobaloutreach@gmail.com";
const ADMIN_ROUTE = CONFIG.adminRoute || "#sts-office-7k29";

const DEFAULT_CONTENT = {
  souls: "4,000+",
  bibles: "2,500+",
  villages: "15+",
  missionaries: "40+",
  confMax: 200,
  // Shown until the live count loads (or if the counter cannot be reached).
  confReg: 0,
  bankName: "Union Bank (Temporary Account)",
  acctNum: "0054212216",
  acctName: "Saved To Be Sent Mission Outreach",
  paystackLink: "",
  stripeLink: "",
  cryptoWallet: "",
  cryptoNetwork: "USDT (TRC20)",
  events: [],
  catalog: [
    {
      title: "Ile-Ife & Osun Rural Crusade Invasion",
      category: "Crusades",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      desc: "3 nights of open-air Gospel power, 1,400+ decisions for Christ, and free village Bible distribution."
    },
    {
      title: "Ogun Waterside & Isolated Village Trek",
      category: "Village Invasions",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
      desc: "Field missionaries crossed riverine settlements bringing audio & print Bibles to unreached families."
    },
    {
      title: "10,000 Dialect Bibles & Gospel Tracts Drive",
      category: "Bibles & Tracts",
      img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=800&q=80",
      desc: "Powered by $10 Bible sponsors—equipping new converts in rural Africa & Asia with God's Word."
    },
    {
      title: "Free Rural Medical & Welfare Outreach",
      category: "Medical & Welfare",
      img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
      desc: "Combining compassionate medical care, food bags, and one-on-one soul winning."
    },
    {
      title: "Northern Frontier Motorcycle Missionaries",
      category: "Village Invasions",
      img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
      desc: "Every penny given fuels motorbikes taking Sent Ones into unreached nomadic settlements."
    },
    {
      title: "Youth & Campus Evangelism Fire",
      category: "Crusades",
      img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80",
      desc: "Raising radical student witnesses and deploying them into streets and marketplaces."
    }
  ],
  // Add real outreach videos from the Admin backend (YouTube links).
  videos: [],
  mapLocations: [
    // Reached in Africa
    { name: "Ogun & Lagos Rural Belt, Nigeria", region: "AFRICA_REACHED", lat: 6.89, lng: 3.35, note: "28 Villages Reached | 4,200+ Bibles Given" },
    { name: "Ile-Ife & Osun Interior, Nigeria", region: "AFRICA_REACHED", lat: 7.49, lng: 4.55, note: "Open-Air Crusades & School of Fire Base" },
    { name: "Tamale & Northern Ghana Villages", region: "AFRICA_REACHED", lat: 9.40, lng: -0.84, note: "Rural Church Planting & Audio Bibles" },
    { name: "Kisumu & Western Kenya Outskirts", region: "AFRICA_REACHED", lat: -0.09, lng: 34.76, note: "Street & Village Harvest Missions" },
    // Unreached in Africa
    { name: "Central Sahel Nomadic Belt (Mali/Niger Border)", region: "AFRICA_UNREACHED", lat: 15.45, lng: 1.95, note: "UNREACHED TARGET: Urgent need for $10 Audio Bibles & Field Missionaries" },
    { name: "Lake Chad Island Settlements", region: "AFRICA_UNREACHED", lat: 13.20, lng: 14.10, note: "UNREACHED TARGET: Isolated fishing villages needing boat missionaries" },
    { name: "Kordofan & Darfur Remote Basin (Sudan)", region: "AFRICA_UNREACHED", lat: 12.80, lng: 29.20, note: "UNREACHED TARGET: Prayer & underground Gospel literature needed" },
    { name: "Somali Hinterland & Ogaden Villages", region: "AFRICA_UNREACHED", lat: 6.50, lng: 44.20, note: "UNREACHED TARGET: Zero church presence—high priority field" },
    // Reached in Asia
    { name: "Punjab & Northern India Rural Belt", region: "ASIA_REACHED", lat: 30.90, lng: 75.85, note: "House fellowships & translated native Bibles distributed" },
    { name: "Mindanao Highland Villages, Philippines", region: "ASIA_REACHED", lat: 7.80, lng: 125.00, note: "Youth crusades, welfare aid & Gospel tracts" },
    { name: "Chiang Rai Hill Tribes, Northern Thailand", region: "ASIA_REACHED", lat: 19.91, lng: 99.84, note: "Mountain missionary outposts & children's outreach" },
    { name: "Kathmandu Valley Outskirts, Nepal", region: "ASIA_REACHED", lat: 27.71, lng: 85.32, note: "Trekking evangelists reaching mountain communities" }
  ],
  gallery: [
    { img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80", caption: "Open air crusade night" },
    { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80", caption: "Village trek with the Word" },
    { img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=900&q=80", caption: "Bible distribution" },
    { img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80", caption: "Medical and welfare outreach" },
    { img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=900&q=80", caption: "Children in the village" },
    { img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80", caption: "Street evangelism" }
  ],
  site: {
  "theme": "THE ACT OF WITNESS",
  "whatsapp": "2349136279311",
  "groupLink": "https://chat.whatsapp.com/E5DCfC4i28g9SqhOBd7Ox1?s=cl&p=a&mlu=4&ilr=4",
  "verseText": "And he said unto them, When I sent you without purse, and scrip, and shoes, lacked ye any thing? And they said, Nothing.",
  "verseRef": "Luke 22:35",
  "heroTitle": "",
  "heroSub": "",
  "heardOptions": [
"Facebook",
"Instagram",
"WhatsApp",
"Church announcement",
"A friend or family member",
"STS Missionary",
"Flyer or poster",
"Other"
  ],
  "thankYou": {
"Bibles for Unreached Areas ($10/Bible)": {
  "subject": "Thank you for sponsoring Bibles for unreached villages",
  "body": "Dear {name},\n\nGrace and peace to you in the name of our Lord Jesus Christ. On behalf of Saved To Be Sent Mission Outreach, we sincerely thank you for your giving of {amount} towards Bibles for unreached areas.\n\nWe give glory to God for placing this burden on your heart. Every $10 puts a Bible in the hands of a family that has never owned one, and through the Word, souls are saved, believers are established and entire villages are transformed. Your seed will keep speaking long after the Bible is delivered.\n\nThe Scripture says: \"So shall my word be that goeth forth out of my mouth: it shall not return unto me void\" (Isaiah 55:11). May the Lord multiply your seed back to you and grant you a harvest in every area of your life.\n\nWe will keep you updated with reports from the field.\n\nIn His service,\nSaved To Be Sent Mission Outreach\nSaved to save"
},
"Evangelism Tracts & Literature": {
  "subject": "Thank you for supporting Gospel tracts and literature",
  "body": "Dear {name},\n\nGreetings from Saved To Be Sent Mission Outreach. We thank God for you and sincerely appreciate your giving of {amount} towards Gospel tracts and evangelism literature.\n\nYour seed will be printed into dialect tracts that our teams place in the hands of people on the streets, in markets and in remote villages. A single tract has often been the first step of a soul coming to Christ.\n\n\"How then shall they call on him in whom they have not believed? and how shall they hear without a preacher?\" (Romans 10:14). Because you gave, many will hear.\n\nMay the Lord richly reward you and make every area of your life fruitful.\n\nIn His service,\nSaved To Be Sent Mission Outreach"
},
"Missionary Support in the Field": {
  "subject": "Thank you for standing with our missionaries",
  "body": "Dear {name},\n\nWe thank God for you. On behalf of Saved To Be Sent Mission Outreach, we sincerely appreciate your giving of {amount} towards missionary support in the field.\n\nYour seed supports the men and women who leave comfort behind to carry the Gospel into hard places. It goes towards their transport, welfare and medical care, so they can keep going with strength. In the Kingdom, those who send share in the reward of those who go.\n\n\"And how shall they preach, except they be sent?\" (Romans 10:15). Thank you for being part of the sending.\n\nMay the Lord supply all your needs according to His riches in glory.\n\nIn His service,\nSaved To Be Sent Mission Outreach"
},
"Support Towards Outreach & Crusades": {
  "subject": "Thank you for your support towards our outreach and crusades",
  "body": "Dear {name},\n\nGrace and peace to you. We sincerely thank you for your giving of {amount} towards our outreach and crusades.\n\nYour support helps us provide sound equipment, lighting, welfare food bags and the logistics needed to reach rural communities with open-air crusades. Because of partners like you, the Gospel is preached, the sick are prayed for and souls respond to the altar call.\n\n\"Go ye into all the world, and preach the gospel to every creature\" (Mark 16:15). You have gone with us through your giving.\n\nMay the Lord honour your sacrifice and increase you on every side.\n\nIn His service,\nSaved To Be Sent Mission Outreach"
},
"Personal Seed for the Mission": {
  "subject": "Thank you for your seed into the mission",
  "body": "Dear {name},\n\nWe give thanks to God for you. On behalf of Saved To Be Sent Mission Outreach, we sincerely appreciate your personal seed of {amount} into the mission.\n\nYour seed strengthens every part of the work: Bibles, tracts, missionaries and outreaches. We receive it as a covenant seed towards the global mandate to take the Gospel to the unreached.\n\n\"Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over\" (Luke 6:38). May the Lord return your seed to you as a bountiful harvest.\n\nIn His service,\nSaved To Be Sent Mission Outreach"
}
  }
}
};
const CONTENT_KEYS = Object.keys(DEFAULT_CONTENT);
const VISITOR_DEFAULTS = { lastReg: null, regs: {}, localSeq: 0, localBed: 0, localApril: 0, localGive: 0, localPartner: 0, submissions: [] };
const VISITOR_KEY = "sts_visitor_v5";
const DRAFT_KEY = "sts_admin_draft_v5";
const LEGACY_KEY = "sts_ministry_state_v4";
const LEGACY_BACKUP_KEY = "sts_legacy_v4_backup";
const MAX_LOGGED_SUBMISSIONS = 200;

function storeGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
}
function storeSet(key, value) {
  try {
    if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) { return false; }
}
function pickKeys(obj, keys) {
  const out = {};
  keys.forEach(k => { if (obj && obj[k] !== undefined) out[k] = obj[k]; });
  return out;
}

// Version 4 kept everything (content + the visitor's own data) under one key, so a
// visitor who loaded the site once kept seeing that old content forever. Move the
// visitor's own data across; keep old content only if it was actually edited (that
// can only be the admin's browser) so the admin can restore it from the backend.
function migrateLegacyStorage() {
  const legacy = storeGet(LEGACY_KEY);
  if (!legacy) return null;
  const content = pickKeys(legacy, CONTENT_KEYS);
  delete content.confReg;
  // Same rules version 4 applied on load: stale bank details and stats were replaced.
  if (legacy.bankVer !== 2) { delete content.bankName; delete content.acctNum; }
  if (!legacy.statsV2) ["souls", "bibles", "villages", "missionaries"].forEach(k => delete content[k]);
  // The old built-in videos were placeholders, not real outreach videos.
  if (Array.isArray(content.videos) && content.videos.every(v => /dQw4w9WgXcQ/.test(v.embed || ""))) delete content.videos;
  const defaults = pickKeys(DEFAULT_CONTENT, Object.keys(content));
  if (JSON.stringify(content) !== JSON.stringify(defaults)) storeSet(LEGACY_BACKUP_KEY, content);
  const visitor = pickKeys(legacy, Object.keys(VISITOR_DEFAULTS));
  // Only remove the old copy once the visitor's data is safely stored under the new key.
  if (storeSet(VISITOR_KEY, visitor)) storeSet(LEGACY_KEY, null);
  return visitor;
}

let publishedContent = {};
let adminDraft = storeGet(DRAFT_KEY);
const visitorData = Object.assign({}, VISITOR_DEFAULTS, storeGet(VISITOR_KEY) || migrateLegacyStorage() || {});
// Live counts from the shared counter. Never saved, so they are always fresh.
const liveCounts = { conf: null, april: null };

function composeState() {
  const content = Object.assign({}, DEFAULT_CONTENT, publishedContent, adminDraft || {});
  content.site = Object.assign({}, DEFAULT_CONTENT.site, publishedContent.site || {}, (adminDraft && adminDraft.site) || {});
  content.site.thankYou = Object.assign({}, DEFAULT_CONTENT.site.thankYou, content.site.thankYou || {});
  return Object.assign(content, visitorData);
}
let appState = composeState();
function S() { return appState.site; }

// Loads content.json (the published content). A short timeout keeps the site usable
// when it is missing, opened from a file, or the network is slow.
async function loadPublishedContent() {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch("content.json", { cache: "no-cache", signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return;
    const data = await res.json();
    if (data && typeof data === "object") publishedContent = pickKeys(data, CONTENT_KEYS);
  } catch (e) { /* keep the built-in content */ }
  appState = composeState();
}

// Saves the visitor's own data (registration, counters, local log).
function saveState() {
  const local = pickKeys(appState, Object.keys(VISITOR_DEFAULTS));
  local.submissions = (local.submissions || []).slice(0, MAX_LOGGED_SUBMISSIONS);
  Object.assign(visitorData, local);
  if (!storeSet(VISITOR_KEY, local)) {
    // Screenshots are the bulky part of the local log; drop them before giving up.
    local.submissions.forEach(x => { if (x.details) delete x.details.screenshot; });
    storeSet(VISITOR_KEY, local);
  }
  renderAllUI();
}

// Saves an admin edit as a DRAFT in this browser only. Visitors see it once
// content.json is published (Admin backend > Publish).
function saveContent() {
  adminDraft = pickKeys(appState, CONTENT_KEYS);
  if (!storeSet(DRAFT_KEY, adminDraft)) {
    alert("This browser's storage is full. Remove some uploaded photos, or use picture links instead of uploads.");
  }
  saveState();
}

// ---------- Safe output helpers ----------
// Everything that comes from content.json, an admin draft or a form is escaped
// before it goes into HTML, so a stray "<" (or a tampered file) cannot run code.
function esc(v) {
  return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
// Only web links and uploaded pictures may be used as image sources.
function safeImg(u) {
  const s = String(u || "").trim();
  return /^https?:\/\//i.test(s) || /^data:image\/(png|jpe?g|gif|webp);base64,/i.test(s) || /^assets\//.test(s) ? s : "";
}
// Accepts any common YouTube link (watch, youtu.be, embed, shorts) and returns the video id.
function youtubeId(u) {
  const m = String(u || "").match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  const open = menu.classList.toggle("hidden") === false;
  const btn = document.getElementById("mobileMenuBtn");
  if (btn) btn.setAttribute("aria-expanded", String(open));
  document.getElementById("mobileMenuIcon").className = "fa-solid " + (open ? "fa-xmark" : "fa-bars") + " text-xl";
}

// Hook Modal Controls
const HOOK_SEEN_KEY = "sts_welcome_seen_at";
function openHookModal() {
  document.getElementById("hookPopupModal").classList.remove("hidden");
}
function closeHookModal() {
  document.getElementById("hookPopupModal").classList.add("hidden");
}
// The welcome popup interrupts reading, so show it at most once every few days,
// and never to someone who followed a link straight to a section.
function maybeShowWelcome() {
  if (location.hash) return;
  const days = Number(CONFIG.welcomePopupEveryDays) || 3;
  let last = 0;
  try { last = Number(localStorage.getItem(HOOK_SEEN_KEY)) || 0; } catch (e) {}
  if (Date.now() - last < days * 864e5) return;
  setTimeout(() => {
    if (document.querySelector(".sts-modal:not(.hidden)")) return; // another dialog is already open
    openHookModal();
    try { localStorage.setItem(HOOK_SEEN_KEY, String(Date.now())); } catch (e) {}
  }, 1500);
}

// Render Numbers, Catalog & Videos
function renderAllUI() {
  document.getElementById("statSoulsDisplay").textContent = appState.souls;
  document.getElementById("statBiblesDisplay").textContent = appState.bibles;
  document.getElementById("statVillagesDisplay").textContent = appState.villages;
  document.getElementById("statMissionariesDisplay").textContent = appState.missionaries;

  const msg = "Hello, I am ______ . I want to give to the mission in cryptocurrency, can I have the USDT wallet address?";
  document.getElementById("cryptoGiveBtn").href = "https://wa.me/" + String(S().whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(msg);
  if (S().heroSub) document.getElementById("heroSubDisplay").textContent = S().heroSub;
  if (S().heroTitle) document.getElementById("heroTitleDisplay").textContent = S().heroTitle;
  updateCountsUI();
  document.getElementById("bankNameDisplay").textContent = appState.bankName;
  document.getElementById("acctNumDisplay").textContent = appState.acctNum;
  document.getElementById("acctNameDisplay").textContent = appState.acctName;

  renderCatalog(currentCatalogFilter);
  renderGallery();
  renderAdminGallery();
  renderVideos();
  renderMapLists();
  renderAdminSubmissions();
  renderEvents();
  renderAdminContent();
  paintDraftBadge();
}

let currentCatalogFilter = "ALL";
function renderCatalog(filter) {
  currentCatalogFilter = filter || "ALL";
  document.querySelectorAll(".cat-btn").forEach(b => {
    const on = b.dataset.filter === currentCatalogFilter;
    b.setAttribute("aria-pressed", String(on));
    b.classList.toggle("bg-stsRed", on); b.classList.toggle("text-white", on);
    b.classList.toggle("bg-stsCard", !on); b.classList.toggle("text-gray-600", !on);
  });
  const grid = document.getElementById("catalogGrid");
  const items = currentCatalogFilter === 'ALL' ? appState.catalog : appState.catalog.filter(c => c.category === currentCatalogFilter);
  if (!items.length) {
    grid.innerHTML = '<p class="text-gray-500 text-sm col-span-full text-center">No outreach reports in this category yet.</p>';
    return;
  }
  grid.innerHTML = items.map(item => `
    <div class="bg-stsCard border border-black/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stsRed transition shadow-lg">
      <div>
        <div class="h-52 relative bg-stsObsidian">
          ${safeImg(item.img) ? `<img src="${esc(safeImg(item.img))}" alt="${esc(item.title)}" loading="lazy" decoding="async" class="w-full h-full object-cover" />` : ""}
          <span class="absolute top-3 left-3 bg-stsRed text-white text-[11px] font-bold px-3 py-1 rounded-full">${esc(item.category)}</span>
        </div>
        <div class="p-6">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${esc(item.title)}</h3>
          <p class="text-gray-500 text-sm leading-relaxed">${esc(item.desc)}</p>
        </div>
      </div>
      <div class="px-6 pb-6">
        <a href="#giving" class="inline-flex items-center text-xs font-bold text-stsRed hover:underline">
          Sponsor Similar Outreach &rarr;
        </a>
      </div>
    </div>
  `).join('');
}

// Videos show a thumbnail first and only load the YouTube player when tapped:
// three embedded players would cost visitors several MB of data before they press play.
function renderVideos() {
  const grid = document.getElementById("videoGrid");
  const vids = (appState.videos || []).map(v => ({ title: v.title, id: youtubeId(v.embed || v.url) })).filter(v => v.id);
  if (!vids.length) {
    grid.innerHTML = `<div class="col-span-full text-center bg-stsCard border border-black/10 rounded-2xl p-8">
      <i class="fa-solid fa-video text-stsRed text-2xl"></i>
      <p class="text-gray-600 text-sm mt-3">Outreach videos are on their way. Meanwhile, see the latest from the field on our Facebook page.</p>
      <a href="https://www.facebook.com/StsglobalOutreach" target="_blank" rel="noopener" class="inline-block mt-4 bg-stsRed hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-lg"><i class="fa-brands fa-facebook mr-1.5"></i>Watch on Facebook</a>
    </div>`;
    return;
  }
  grid.innerHTML = vids.map(v => `
    <div class="bg-stsObsidian border border-black/10 rounded-2xl overflow-hidden">
      <button type="button" class="yt-facade group relative block w-full aspect-video bg-black" data-yt="${esc(v.id)}" aria-label="Play video: ${esc(v.title)}">
        <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
        <span class="absolute inset-0 flex items-center justify-center"><span class="w-16 h-16 rounded-full bg-stsRed text-white flex items-center justify-center shadow-xl"><i class="fa-solid fa-play text-2xl ml-1"></i></span></span>
      </button>
      <div class="p-4">
        <h4 class="font-bold text-sm text-gray-900">${esc(v.title)}</h4>
      </div>
    </div>
  `).join('');
}
document.addEventListener("click", ev => {
  const f = ev.target.closest(".yt-facade");
  if (!f) return;
  const id = f.dataset.yt;
  if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
  const frame = document.createElement("iframe");
  frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
  frame.className = "w-full aspect-video block";
  frame.title = f.getAttribute("aria-label") || "Video";
  frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  frame.allowFullscreen = true;
  f.replaceWith(frame);
});

// Interactive Leaflet Map (Africa & Asia labeled in Red)
let mapInstance = null;
let mapMarkers = [];
let mapLoading = null;

// Leaflet (about 150 KB) is only downloaded when the Gospel Map tab is opened.
function loadLeaflet() {
  if (window.L) return Promise.resolve();
  if (mapLoading) return mapLoading;
  const base = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/";
  const css = document.createElement("link");
  css.rel = "stylesheet"; css.href = base + "leaflet.min.css";
  document.head.appendChild(css);
  mapLoading = new Promise((ok, no) => {
    const sc = document.createElement("script");
    sc.src = base + "leaflet.min.js";
    sc.onload = ok;
    sc.onerror = () => { mapLoading = null; no(new Error("Leaflet failed to load")); };
    document.head.appendChild(sc);
  });
  return mapLoading;
}
async function ensureMap() {
  if (mapInstance) { setTimeout(() => mapInstance.invalidateSize(), 60); return; }
  try {
    await loadLeaflet();
    if (!mapInstance) initMap();
  } catch (e) {
    const box = document.getElementById("stsWorldMap");
    if (box && !mapInstance) box.innerHTML = '<p class="text-gray-500 text-sm text-center p-10">The map could not load. Please check your connection. The full list of places is below.</p>';
  }
}

function initMap() {
  mapInstance = L.map('stsWorldMap', { scrollWheelZoom: false }).setView([12.0, 28.0], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);
  plotMapMarkers('ALL');
}

function plotMapMarkers(regionFilter) {
  if (!mapInstance) return;
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  const filtered = regionFilter === 'ALL'
    ? appState.mapLocations
    : appState.mapLocations.filter(loc => loc.region === regionFilter);

  filtered.forEach(loc => {
    const isUnreached = loc.region === 'AFRICA_UNREACHED';
    const icon = L.divIcon({
      className: '',
      html: `<div class="${isUnreached ? 'sts-map-pin-unreached' : 'sts-map-pin'}"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    const marker = L.marker([loc.lat, loc.lng], { icon })
      .addTo(mapInstance)
      .bindPopup(`
        <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
          <strong style="color:#E60000; display:block; font-size:13px;">${esc(loc.name)}</strong>
          <span style="font-size:11px; color:#444;">${esc(loc.note)}</span>
        </div>
      `);
    mapMarkers.push(marker);
  });
}

async function focusMapRegion(region) {
  document.querySelectorAll(".map-btn").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.region === region)));
  await ensureMap();
  if (!mapInstance) return;
  plotMapMarkers(region);
  if (region === 'AFRICA_REACHED' || region === 'AFRICA_UNREACHED') {
    mapInstance.setView([9.0, 18.0], 4);
  } else if (region === 'ASIA_REACHED') {
    mapInstance.setView([20.0, 92.0], 4);
  } else {
    mapInstance.setView([12.0, 28.0], 3);
  }
}

function renderMapLists() {
  const renderList = (regionKey) => appState.mapLocations
    .filter(l => l.region === regionKey)
    .map(l => `
      <li class="bg-stsCard p-3 rounded-lg border-l-4 border-stsRed">
        <strong class="text-gray-900 block text-sm">${esc(l.name)}</strong>
        <span class="text-xs text-gray-500">${esc(l.note)}</span>
      </li>
    `).join('');

  document.getElementById("listAfricaReached").innerHTML = renderList('AFRICA_REACHED');
  document.getElementById("listAfricaUnreached").innerHTML = renderList('AFRICA_UNREACHED');
  document.getElementById("listAsiaReached").innerHTML = renderList('ASIA_REACHED');
}

// Dual Live Countdowns. Dates come from config.js and carry the Nigerian time zone,
// so a visitor in London or Houston sees the true time left, not their local 9am.
const pad2 = n => String(n).padStart(2, "0");
// Returns the parts of the time left, or the event's state once it has started.
function countdownParts(startIso, endIso, now) {
  const start = Date.parse(startIso), end = Date.parse(endIso || startIso);
  if (!isFinite(start)) return null;
  if (now >= start) return { state: now <= end ? "live" : "ended" };
  const diff = start - now;
  return { state: "upcoming", days: Math.floor(diff / 864e5), hours: Math.floor(diff / 36e5) % 24, mins: Math.floor(diff / 6e4) % 60, secs: Math.floor(diff / 1e3) % 60 };
}
function updateCountdowns() {
  const now = Date.now();
  const paint = (event, prefix) => {
    const p = countdownParts(event && event.start, event && event.end, now);
    if (!p) return;
    const box = document.getElementById(prefix + "Days").closest(".grid");
    const note = document.getElementById(prefix + "State");
    if (p.state !== "upcoming") {
      ["Days", "Hours", "Mins", "Secs"].forEach(k => { document.getElementById(prefix + k).textContent = "00"; });
      if (note) { note.textContent = p.state === "live" ? "Happening now" : "This event has ended. Thank you to everyone who came."; note.classList.remove("hidden"); }
      if (box) box.classList.add("opacity-40");
      return;
    }
    document.getElementById(prefix + "Days").textContent = pad2(p.days);
    document.getElementById(prefix + "Hours").textContent = pad2(p.hours);
    document.getElementById(prefix + "Mins").textContent = pad2(p.mins);
    document.getElementById(prefix + "Secs").textContent = pad2(p.secs);
  };
  paint(CONFIG.conference, "conf");
  paint(CONFIG.aprilOutreach, "april");
}

// Purpose-Driven Giving Selector
function highlightGivingCards(purpose) {
  document.querySelectorAll(".give-cat-card").forEach(card => {
    const m = (card.getAttribute("onclick") || "").match(/setGivingCategory\('(.*)'\)/);
    const mine = m && m[1] === purpose;
    const badge = card.querySelector(":scope > span");
    card.className = "give-cat-card cursor-pointer bg-stsCard p-4 rounded-xl flex items-center justify-between transition " +
      (mine ? "border-2 border-stsRed" : "border border-black/10 hover:border-stsRed");
    card.setAttribute("aria-pressed", String(!!mine));
    if (badge) {
      badge.textContent = mine ? "Selected" : "Select";
      badge.className = mine ? "text-xs font-extrabold bg-stsRed text-white px-2.5 py-1 rounded" : "text-xs font-bold text-gray-500";
    }
  });
}

function setGivingCategory(purpose, showAccount = true) {
  document.getElementById("selectedPurposeText").textContent = purpose;
  document.getElementById("giveCategoryInput").value = purpose;
  highlightGivingCards(purpose);
  if (showAccount) openAccountModal(purpose);
}

function selectFundAndScroll(purpose) {
  setGivingCategory(purpose, true);
}

function openAccountModal(purpose) {
  document.getElementById("modalPurpose").textContent = purpose;
  renderPayMethods();
  document.getElementById("modalChips").innerHTML = QUICK_AMOUNTS.map(n => chipHtml(n, "pickAmount")).join("");
  document.getElementById("accountModal").classList.remove("hidden");
}
function closeAccountModal() {
  document.getElementById("accountModal").classList.add("hidden");
}
function goToGiveForm() {
  closeAccountModal();
  document.getElementById("giveForm").scrollIntoView({ behavior: "smooth", block: "center" });
}

function copyAcctNumber() {
  const num = appState.acctNum;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(num).then(() => alert("Account Number (" + num + ") copied!"), () => alert("Account Number: " + num));
  } else {
    alert("Account Number: " + num);
  }
}

// Gallery
let lightboxIndex = 0;
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!appState.gallery || !appState.gallery.length) {
    grid.innerHTML = '<p class="text-gray-500 text-sm col-span-full">Photos from past outreaches will appear here.</p>';
    return;
  }
  grid.innerHTML = appState.gallery.map((g, i) => `
    <button type="button" onclick="openLightbox(${i})" aria-label="Open photo: ${esc(g.caption || "Outreach photo")}" class="group relative aspect-square overflow-hidden rounded-xl border border-black/10 hover:border-stsRed transition">
      <img src="${esc(safeImg(g.img))}" alt="${esc(g.caption || 'Outreach photo')}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 text-left">
        <span class="text-[11px] sm:text-xs font-semibold text-white kw">${esc(g.caption || '')}</span>
      </div>
    </button>
  `).join('');
}
function openLightbox(i) {
  lightboxIndex = i;
  showLightbox();
  document.getElementById("galleryLightbox").classList.remove("hidden");
}
function showLightbox() {
  const g = appState.gallery[lightboxIndex];
  if (!g) return;
  const img = document.getElementById("lightboxImg");
  img.src = safeImg(g.img);
  img.alt = g.caption || "Outreach photo";
  document.getElementById("lightboxCaption").textContent = g.caption || "";
}
function stepLightbox(d) {
  const n = appState.gallery.length;
  lightboxIndex = (lightboxIndex + d + n) % n;
  showLightbox();
}
function closeLightbox() {
  document.getElementById("galleryLightbox").classList.add("hidden");
}

function renderAdminGallery() {
  const box = document.getElementById("adminGalleryList");
  if (!box) return;
  box.innerHTML = (appState.gallery || []).map((g, i) => `
    <div class="relative aspect-square rounded overflow-hidden border border-black/10">
      <img src="${esc(safeImg(g.img))}" alt="" loading="lazy" class="w-full h-full object-cover" />
      <button onclick="removeGalleryPhoto(${i})" aria-label="Remove photo" class="absolute top-1 right-1 bg-black/80 hover:bg-stsRed text-gray-900 hover:text-white w-6 h-6 rounded-full text-xs">&times;</button>
    </div>
  `).join('');
}
function removeGalleryPhoto(i) {
  if (!confirm("Remove this photo from the gallery?")) return;
  appState.gallery.splice(i, 1);
  saveContent();
}
function fileToResizedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const max = 1100;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * scale);
        c.height = Math.round(img.height * scale);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", 0.72));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
async function addGalleryPhotos() {
  const caption = document.getElementById("newGalCaption").value.trim();
  const url = document.getElementById("newGalUrl").value.trim();
  const files = document.getElementById("newGalFiles").files;
  if (!url && !files.length) return alert("Add an image link or pick photos first.");
  if (url) appState.gallery.unshift({ img: url, caption });
  for (const f of files) {
    try {
      const data = await fileToResizedDataUrl(f);
      appState.gallery.unshift({ img: data, caption });
    } catch (e) {}
  }
  document.getElementById("newGalCaption").value = "";
  document.getElementById("newGalUrl").value = "";
  document.getElementById("newGalFiles").value = "";
  saveContent();
  alert(DRAFT_SAVED_MSG);
}

// ---------- Settings (edit them in config.js) ----------
const TEST_MODE = CONFIG.testMode !== false;
const SHEET_URL = String(CONFIG.sheetUrl || "").trim();
const SHEET_VIEW_URL = String(CONFIG.sheetViewUrl || "").trim();
const COUNTER_BASE = SHEET_URL ? SHEET_URL + "?p=" : String(CONFIG.publicCounterUrl || "");
const CONF = CONFIG.conference || {};
const FIRST_GENERATED_SEAT = Number(CONF.firstGeneratedSeat) || 11;
const CONF_DAYS = CONF.days || [];
const DRAFT_SAVED_MSG = "Saved as a draft in this browser. Visitors will see it after you publish (section 0 at the top of the backend).";
let lastRegistration = null;

const PERSONAL_VERSES = [["Isaiah 6:8", "Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me.", "Lord, I say here am I, send me wherever You want me to go."], ["Matthew 28:19", "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost:", "Father, give me a heart for the nations and the boldness to go."], ["Acts 1:8", "But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.", "Holy Spirit, fill me with fresh power to be Your witness."], ["Mark 16:15", "And he said unto them, Go ye into all the world, and preach the gospel to every creature.", "Lord, let no fear or excuse keep me from preaching the Gospel."], ["Romans 10:15", "And how shall they preach, except they be sent? as it is written, How beautiful are the feet of them that preach the gospel of peace, and bring glad tidings of good things!", "Father, make my feet beautiful on the mission field."], ["Psalm 96:3", "Declare his glory among the heathen, his wonders among all people.", "Lord, open doors for me to declare Your glory among the people."], ["Jeremiah 1:7", "But the Lord said unto me, Say not, I am a child: for thou shalt go to all that I shall send thee, and whatsoever I command thee thou shalt speak.", "Lord, remove every excuse and put Your words in my mouth."], ["Joshua 1:9", "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.", "Father, make me strong and courageous wherever You send me."], ["2 Timothy 4:2", "Preach the word; be instant in season, out of season; reprove, rebuke, exhort with all longsuffering and doctrine.", "Lord, make me faithful to preach Your Word in every season."], ["Isaiah 52:7", "How beautiful upon the mountains are the feet of him that bringeth good tidings, that publisheth peace; that bringeth good tidings of good, that publisheth salvation; that saith unto Zion, Thy God reigneth!", "Lord, use my life to bring good news and salvation to others."], ["Matthew 9:37-38", "Then saith he unto his disciples, The harvest truly is plenteous, but the labourers are few; Pray ye therefore the Lord of the harvest, that he will send forth labourers into his harvest.", "Lord of the harvest, count me among the labourers You send out."], ["John 20:21", "Then said Jesus to them again, Peace be unto you: as my Father hath sent me, even so send I you.", "Jesus, thank You for sending me; let me carry Your peace and purpose."], ["Acts 20:24", "But none of these things move me, neither count I my life dear unto myself, so that I might finish my course with joy, and the ministry, which I have received of the Lord Jesus, to testify the gospel of the grace of God.", "Father, help me finish my course with joy and testify of Your grace."], ["Romans 1:16", "For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.", "Lord, deliver me from every shame and let me boldly share the Gospel."], ["Isaiah 41:10", "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.", "Father, uphold me with Your right hand as I step out for You."], ["Matthew 28:20", "Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.", "Lord, let Your presence go with me in every village and street."], ["2 Timothy 1:7", "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", "Spirit of God, break every fear in me and stir up power, love and a sound mind."], ["Psalm 2:8", "Ask of me, and I shall give thee the heathen for thine inheritance, and the uttermost parts of the earth for thy possession.", "Lord, I ask for nations and unreached peoples as my inheritance."], ["Luke 10:2", "Therefore said he unto them, The harvest truly is great, but the labourers are few: pray ye therefore the Lord of the harvest, that he would send forth labourers into his harvest.", "Father, send me and many more into Your great harvest field."], ["Proverbs 11:30", "The fruit of the righteous is a tree of life; and he that winneth souls is wise.", "Lord, give me wisdom and grace to win souls for You."], ["Daniel 12:3", "And they that be wise shall shine as the brightness of the firmament; and they that turn many to righteousness as the stars for ever and ever.", "Father, let my life shine and turn many to righteousness."], ["1 Corinthians 15:58", "Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord.", "Lord, keep me steadfast and unmovable in Your work."], ["Galatians 6:9", "And let us not be weary in well doing: for in due season we shall reap, if we faint not.", "Father, give me strength not to grow weary until the harvest comes."], ["Isaiah 55:11", "So shall my word be that goeth forth out of my mouth: it shall not return unto me void, but it shall accomplish that which I please, and it shall prosper in the thing whereto I sent it.", "Lord, let every word I carry accomplish its purpose in people's lives."], ["Ephesians 6:19", "And for me, that utterance may be given unto me, that I may open my mouth boldly, to make known the mystery of the gospel,", "Father, give me utterance and boldness to make the Gospel known."], ["Philippians 4:13", "I can do all things through Christ which strengtheneth me.", "Jesus, strengthen me for every task and assignment ahead."], ["Acts 5:42", "And daily in the temple, and in every house, they ceased not to teach and preach Jesus Christ.", "Lord, give me a daily passion to preach Jesus everywhere I go."], ["2 Corinthians 5:20", "Now then we are ambassadors for Christ, as though God did beseech you by us: we pray you in Christ's stead, be ye reconciled to God.", "Father, help me represent Christ well as His ambassador."], ["Habakkuk 2:14", "For the earth shall be filled with the knowledge of the glory of the Lord, as the waters cover the sea.", "Lord, use me to fill my community and beyond with the knowledge of Your glory."], ["Matthew 5:16", "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.", "Father, let my light shine so that many will glorify You."]];
const PERSONAL_CHARGES = ["Come to the conference expecting a divine encounter.", "Come hungry, and you will leave equipped and on fire.", "Prepare your heart: God is about to commission you afresh.", "Come with faith, because new doors are about to open for you.", "Come ready to be stirred, refilled and sent out.", "Pray daily till February, because your assignment is bigger than you think.", "Come expecting grace, fire and fresh direction for the field."];
function personalWord(seq, name) {
  const first = String(name || "").trim().split(/\s+/)[0] || "Beloved";
  const n = Math.max(0, (seq || 1) - 1);
  const v = PERSONAL_VERSES[n % PERSONAL_VERSES.length];
  const c = PERSONAL_CHARGES[Math.floor(n / PERSONAL_VERSES.length) % PERSONAL_CHARGES.length];
  return { ref: v[0], text: v[1], prayer: `${first}, pray this until February: ${v[2]}`, charge: `${first}, ${c.charAt(0).toLowerCase() + c.slice(1)}` };
}

// ---------- Shared counters (so every person gets a different seat and bed number) ----------
async function counterRequest(path) {
  if (!COUNTER_BASE) return null;
  try {
    const res = await fetch(COUNTER_BASE + path);
    if (!res.ok) return null;
    const data = await res.json();
    const n = Number(data.count !== undefined ? data.count : data.value);
    return Number.isFinite(n) ? n : null;
  } catch (e) { return null; }
}
// Atomic shared counter: every call returns a brand new number, never a repeat. Returns null if the service is unreachable.
async function nextSharedNumber(key) {
  for (let i = 0; i < (TEST_MODE ? 2 : 4); i++) {
    const n = await counterRequest("/" + key + "/up");
    if (n !== null && n > 0) return n;
    await new Promise(r => setTimeout(r, (i + 1) * 1000));
  }
  return null;
}
async function giftSeq(key, localKey) {
  const n = await counterRequest("/" + key + "/up");
  if (n !== null && n > 0) return n;
  appState[localKey] = (appState[localKey] || 0) + 1;
  return appState[localKey] + Math.floor(Math.random() * 1000);
}
async function nextSequence(key, localKey) {
  const n = await counterRequest("/" + key + "/up");
  if (n !== null && n > 0) return { n: n, shared: true };
  appState[localKey] = (appState[localKey] || 0) + 1;
  return { n: appState[localKey], shared: false };
}
// Seats taken: the live shared count when we have it, else the number the admin published.
function confTaken() { return liveCounts.conf !== null ? liveCounts.conf : (Number(appState.confReg) || 0); }
function confCapacity() { return Number(appState.confMax) || 200; }
function updateCountsUI() {
  const taken = Math.min(confTaken(), confCapacity());
  document.getElementById("confRegisteredCount").textContent = taken;
  document.getElementById("confQuotaMax").textContent = confCapacity();
  document.getElementById("confCapLimitDisplay").textContent = confCapacity();
  const pct = Math.min(100, Math.round((taken / confCapacity()) * 100));
  const bar = document.getElementById("confProgressBar");
  bar.style.width = pct + "%";
  bar.parentElement.setAttribute("aria-valuenow", String(taken));
  bar.parentElement.setAttribute("aria-valuemax", String(confCapacity()));
  document.getElementById("aprilRegCountDisplay").textContent = (liveCounts.april || 0) + " Joined";
  const v = document.getElementById("viewMyInvoiceBtn");
  if (v) v.classList.toggle("hidden", !appState.lastReg);
}
async function refreshSharedCounts() {
  const [c, a] = await Promise.all([counterRequest("/mc-seat"), counterRequest("/april-join")]);
  if (c !== null) liveCounts.conf = c;
  if (a !== null) liveCounts.april = a;
  updateCountsUI();
}

// POSTs to the Google Sheet backend (backend/Code.gs). A text body avoids the CORS
// pre-flight request that Apps Script cannot answer. Returns null when unreachable.
async function sheetPost(payload, timeoutMs) {
  if (!SHEET_URL) return null;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs || 20000);
  try {
    const res = await fetch(SHEET_URL, { method: "POST", body: JSON.stringify(payload), signal: ctrl.signal });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) { return null; } finally { clearTimeout(timer); }
}

async function resetSharedCounters() {
  if (!confirm("Reset the conference seat, bed and April counters to 0? Do this only after testing. The next seat number will be " + FIRST_GENERATED_SEAT + ".")) return;
  let ok = true;
  if (SHEET_URL) {
    // The Sheet checks its own reset key, so nobody can reset the counters from outside.
    const key = prompt("Enter the RESET_KEY you saved in the Apps Script project settings:");
    if (!key) return;
    const r = await sheetPost({ action: "reset", key: key });
    ok = !!(r && r.ok);
    if (r && r.error === "forbidden") return alert("That reset key is not correct. Nothing was reset.");
  } else {
    for (const k of ["mc-seat", "mc-bed", "april-join"]) {
      try { const r = await fetch(COUNTER_BASE + "/" + k + "/set?count=0"); if (!r.ok) ok = false; } catch (e) { ok = false; }
    }
  }
  liveCounts.conf = 0; liveCounts.april = 0;
  appState.localSeq = 0; appState.localBed = 0; appState.localApril = 0; appState.lastReg = null; appState.regs = {};
  saveState();
  alert(ok ? "Counters reset. The next seat number will be " + FIRST_GENERATED_SEAT + "." : "Could not reach the counter service. Local counters were reset only.");
}

// Gets a seat (and a bed, for hostel guests) for one person.
// Returns { seq, bed, existing?, days?, hostel? }, { full: true }, or null when the service is unreachable.
async function allocateConferenceSeat(person, days, hostel) {
  if (SHEET_URL) {
    // The Sheet hands out seat and bed together, under a lock, and remembers the email,
    // so the same person on another phone gets their original numbers back.
    const r = await sheetPost({ action: "register", person: person, days: days, hostel: hostel, testMode: TEST_MODE });
    if (r && r.ok) return { seq: r.seq, bed: r.bed, existing: !!r.existing, days: r.days, hostel: r.hostel, name: r.name };
    if (r && r.full) return { full: true };
    return null;
  }
  // Public counter fallback: the seat is taken first so a full conference never uses up a bed number.
  const seq = await nextSharedNumber("mc-seat");
  if (seq === null) return null;
  if (seq > confCapacity()) return { full: true };
  let bed = null;
  if (hostel) {
    bed = await nextSharedNumber("mc-bed");
    if (bed === null) return null;
  }
  return { seq: seq, bed: bed };
}

// ---------- Email ----------
async function postToFormSubmit(payload) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${RECEIVER_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    return res.ok && (data.success === true || data.success === "true");
  } catch (e) { return false; }
}

// Sends every submission straight to the ministry email, and keeps a copy in the Admin log
async function dispatchToMinistryEmail(subject, payloadObj, opts) {
  opts = opts || {};
  appState.submissions.unshift({ id: Date.now() + Math.random(), date: new Date().toLocaleString(), type: subject, details: payloadObj });
  saveState();
  logToSheet(subject, payloadObj);
  const sent = await postToFormSubmit(Object.assign({ _subject: `STS Website: ${subject}`, _template: "table", _captcha: "false" }, payloadObj));
  if (!sent && opts.fallback !== false) {
    const lines = Object.entries(payloadObj).map(([k, v]) => `${k}: ${v}`).join("\n");
    window.location.href = `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent("STS Website: " + subject)}&body=${encodeURIComponent(lines)}`;
  }
  return sent;
}

// Sends a copy of every submission to the shared Google Sheet (one row per person, on the right tab)
function logToSheet(subject, payload) {
  if (!SHEET_URL) return;
  const clean = {};
  Object.entries(payload || {}).forEach(([k, v]) => { if (v !== undefined && !(typeof v === "string" && v.length > 2000)) clean[k] = v; });
  sheetPost({ action: "log", type: subject, date: new Date().toISOString(), data: clean });
}

// ---------- Backend downloads: Excel and PDF ----------
function logRows() {
  return appState.submissions.map(s => {
    const row = { Date: s.date, Type: s.type };
    Object.entries(s.details || {}).forEach(([k, v]) => { if (k !== "screenshot") row[k] = typeof v === "object" ? JSON.stringify(v) : v; });
    return row;
  });
}
function logCategory(t) {
  return /conference/i.test(t) ? "Conference" : /giv|donat|gift/i.test(t) ? "Giving" : /partner/i.test(t) ? "Partners" : /train|join/i.test(t) ? "Training" : /prayer/i.test(t) ? "Prayer" : "Other";
}
async function downloadLogsExcel() {
  if (!adminUnlocked) return alert("Admin login required.");
  const rows = logRows();
  if (!rows.length) return alert("No entries are logged on this device yet. For everyone's data, use the Google Sheet button.");
  try {
    if (!window.XLSX) await new Promise((ok, no) => { const sc = document.createElement("script"); sc.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
    const wb = XLSX.utils.book_new(), groups = {};
    rows.forEach(r => { (groups[logCategory(r.Type)] = groups[logCategory(r.Type)] || []).push(r); });
    Object.keys(groups).forEach(g => XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(groups[g]), g));
    XLSX.writeFile(wb, "STS-registrations-" + new Date().toISOString().slice(0, 10) + ".xlsx");
  } catch (e) { alert("Could not prepare the Excel file. Please check your internet and try again."); }
}
function downloadLogsPdf() {
  if (!adminUnlocked) return alert("Admin login required.");
  const rows = logRows();
  if (!rows.length) return alert("No entries are logged on this device yet. For everyone's data, use the Google Sheet button.");
  const cols = [...new Set(rows.flatMap(r => Object.keys(r)))];
  const w = window.open("", "_blank");
  if (!w) return alert("Please allow pop-ups for this site, then press the button again.");
  w.document.write(`<html><head><title>STS Registrations</title><style>@page{size:landscape;margin:10mm}body{font:10px Arial,sans-serif}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:3px;vertical-align:top;word-break:break-word}th{background:#eee}</style></head><body><h2>STS Global Outreach: Registrations and Giving Log</h2><table><tr>${cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr>${rows.map(r => `<tr>${cols.map(c => `<td>${esc(r[c])}</td>`).join("")}</tr>`).join("")}</table><script>onload=function(){print()}<\/script></body></html>`);
  w.document.close();
}
function openSheet() {
  if (!adminUnlocked) return alert("Admin login required.");
  if (!SHEET_VIEW_URL) return alert("The Google Sheet is not connected yet.");
  window.open(SHEET_VIEW_URL, "_blank", "noopener");
}

function doneMessage(sent, okText) {
  alert(sent ? okText : "Almost done! Your email app is opening with your details addressed to " + RECEIVER_EMAIL + ". Please press Send.");
}

// ---------- Event registration ----------
function openEventModal(eventName) {
  const isConf = eventName.includes("Conference");
  document.getElementById("regEventName").value = eventName;
  document.getElementById("eventModalTitle").textContent = eventName;
  document.getElementById("confExtraFields").classList.toggle("hidden", !isConf);
  document.getElementById("regDays").required = isConf;
  document.getElementById("regHostel").required = isConf;
  document.getElementById("regHeard").innerHTML = '<option value="">Select an option</option>' + S().heardOptions.map(o => `<option>${esc(o)}</option>`).join("");
  document.getElementById("eventRegModal").classList.remove("hidden");
}
function closeEventModal() {
  document.getElementById("eventRegModal").classList.add("hidden");
}

function buildRegistration(p) {
  const seat = FIRST_GENERATED_SEAT + p.seq - 1;
  // Offline test numbers get their own prefix so they can never be mistaken for real ones.
  const regId = (p.shared === false ? "TEST-MC27-" : "STS-MC27-") + String(p.seq).padStart(3, "0");
  const meals = [];
  for (let d = 0; d < p.days; d++) {
    for (let m = 1; m <= 2; m++) {
      meals.push({ day: CONF_DAYS[d].label, date: CONF_DAYS[d].date, meal: "Meal " + m, code: `${regId}-D${d + 1}M${m}` });
    }
  }
  return {
    regId: regId, personal: personalWord(p.seq, p.name), seat: seat, bed: p.bed, hostel: p.hostel, days: p.days, meals: meals,
    name: p.name, email: p.email, phone: p.phone, location: p.location,
    issued: new Date().toLocaleString(), issuedDate: new Date().toLocaleDateString(), shared: p.shared
  };
}

// If the numbering service is down, the person is not turned away: the details go to the ministry email
// marked PENDING, and the team sends the seat number, bed number and meal tickets by hand.
async function pendingRegistration(person, days, hostel, form, failMsg) {
  const sent = await dispatchToMinistryEmail("PENDING Conference Registration (assign seat) - " + person.name, {
    name: person.name, email: person.email, phone: person.phone, location: person.location, heardAbout: person.heardAbout,
    daysAttending: days, hostel: hostel ? "YES, needs a bed number" : "No hostel",
    status: "PENDING. The numbering service was unreachable. Please assign a seat number (from " + FIRST_GENERATED_SEAT + ") and a bed number manually and send them to this person."
  }, { fallback: false });
  if (!sent) { alert(failMsg); return; }
  closeEventModal(); form.reset();
  alert("Thank you, " + person.name.split(" ")[0] + "! Your registration has been received. We could not issue your seat number automatically just now, so our team will send your seat number, bed number and meal tickets to your email and phone shortly.");
}

async function submitEventRegistration(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById("regSubmitBtn");
  const eventName = document.getElementById("regEventName").value;
  const person = {
    name: document.getElementById("regFullName").value.trim(),
    email: document.getElementById("regEmail").value.trim(),
    phone: document.getElementById("regPhone").value.trim(),
    location: document.getElementById("regLocation").value.trim(),
    heardAbout: document.getElementById("regHeard").value
  };
  const isConf = eventName.includes("Conference");
  if (isBot(form)) { closeEventModal(); form.reset(); return; }
  const oldLabel = btn.textContent;
  btn.disabled = true; btn.textContent = "Please wait...";
  try {
    if (isConf) {
      const emailKey = person.email.toLowerCase();
      const showExisting = (reg) => {
        appState.lastReg = reg;
        appState.regs = appState.regs || {};
        appState.regs[emailKey] = reg;
        saveState();
        closeEventModal();
        form.reset();
        showInvoice(reg);
        const dn = document.getElementById("invoiceNotice");
        dn.textContent = "This email is already registered, so here are your original seat and bed numbers. Each email gets one seat.";
        dn.classList.remove("hidden");
      };
      const existing = (appState.regs || {})[emailKey];
      if (existing) return showExisting(existing);
      const seen = await counterRequest("/mc-seat");
      if (seen !== null) { liveCounts.conf = seen; updateCountsUI(); }
      if (confTaken() >= confCapacity()) {
        alert("All " + confCapacity() + " seats for the " + (CONF.name || "conference") + " are currently filled!");
        return;
      }
      const days = Math.min(Math.max(parseInt(document.getElementById("regDays").value, 10) || 3, 1), CONF_DAYS.length || 3);
      const hostel = document.getElementById("regHostel").value === "yes";
      const numberFail = "We could not reach the numbering service just now, so no seat was issued. Please check your internet and press Complete Registration again.";
      const alloc = await allocateConferenceSeat(person, days, hostel);
      if (alloc && alloc.full) { alert("All " + confCapacity() + " seats for the " + (CONF.name || "conference") + " are now filled!"); return; }
      if (alloc && alloc.existing) {
        return showExisting(buildRegistration(Object.assign({}, person, { name: alloc.name || person.name, seq: alloc.seq, bed: alloc.bed, days: alloc.days || days, hostel: alloc.hostel != null ? !!alloc.hostel : hostel, shared: true })));
      }
      let seatSeq, bed, usedTest = false;
      if (alloc) {
        seatSeq = alloc.seq; bed = alloc.bed;
      } else {
        if (!TEST_MODE) return await pendingRegistration(person, days, hostel, form, numberFail);
        appState.localSeq = (appState.localSeq || 0) + 1; seatSeq = appState.localSeq; usedTest = true;
        if (hostel) { appState.localBed = (appState.localBed || 0) + 1; bed = appState.localBed; }
      }
      liveCounts.conf = Math.max(confTaken(), seatSeq);
      const reg = buildRegistration(Object.assign({}, person, { seq: seatSeq, bed: hostel ? bed : null, days: days, hostel: hostel, shared: !usedTest }));
      appState.lastReg = reg;
      appState.regs = appState.regs || {};
      appState.regs[emailKey] = reg;
      closeEventModal();
      form.reset();
      showInvoice(reg);
      if (usedTest) { const tn = document.getElementById("invoiceNotice"); tn.textContent = "TEST RUN: the numbering service could not be reached, so these are temporary test numbers. Real numbers are issued after launch."; tn.classList.remove("hidden"); }
      const sent = await dispatchToMinistryEmail((TEST_MODE ? "TEST " : "") + "Conference Registration - " + reg.regId, {
        name: reg.name, email: reg.email, phone: reg.phone, location: reg.location,
        heardAbout: person.heardAbout, theme: S().theme, registrationId: reg.regId, seatNumber: reg.seat,
        bedNumber: reg.hostel ? reg.bed : "Not staying in hostel",
        daysAttending: reg.days, mealTickets: reg.meals.length,
        numberSource: reg.shared ? "shared counter" : "OFFLINE counter, please check for duplicate numbers"
      }, { fallback: false });
      const note = document.getElementById("invoiceNotice");
      if (!sent) {
        note.textContent = "We could not reach the ministry email just now. Tap Send my details to my email below and your email app will send everything to us.";
        note.classList.remove("hidden");
      }
      sendInvoiceToEmail(true); // the invoice is also emailed to the person automatically
    } else {
      const seq = await nextSequence("april-join", "localApril");
      liveCounts.april = seq.shared ? seq.n : (liveCounts.april || 0) + 1;
      closeEventModal();
      form.reset();
      const sent = await dispatchToMinistryEmail("Event Registration - " + eventName, Object.assign({ eventName: eventName }, person));
      doneMessage(sent, `Registration confirmed for ${person.name}! Your details have been sent to the ministry.`);
    }
  } finally {
    btn.disabled = false; btn.textContent = oldLabel;
  }
}

// ---------- Invoice ----------
function stampSvg(dateText) {
  return `<svg viewBox="0 0 160 160" class="inv-stamp" aria-label="Approved stamp">
    <defs>
      <path id="stampTop" d="M 16,80 a 64,64 0 1,1 128,0"/>
      <path id="stampBot" d="M 14,80 a 66,66 0 0,0 132,0"/>
    </defs>
    <circle cx="80" cy="80" r="74" fill="none" stroke="#E60000" stroke-width="4"/>
    <circle cx="80" cy="80" r="52" fill="none" stroke="#E60000" stroke-width="2"/>
    <text font-size="7.8" font-weight="800" fill="#E60000" letter-spacing=".4"><textPath href="#stampTop" startOffset="50%" text-anchor="middle">SAVED TO BE SENT MISSION OUTREACH</textPath></text>
    <text font-size="10" font-weight="800" fill="#E60000" letter-spacing="2"><textPath href="#stampBot" startOffset="50%" text-anchor="middle">OFFICIAL APPROVAL</textPath></text>
    <text x="80" y="82" text-anchor="middle" font-size="19" font-weight="900" fill="#E60000">APPROVED</text>
    <text x="80" y="98" text-anchor="middle" font-size="9" font-weight="700" fill="#E60000">${esc(dateText)}</text>
  </svg>`;
}

function invoiceHtml(r) {
  const logo = document.querySelector("header img").src;
  const bedText = r.hostel ? esc(r.bed) : "N/A";
  const bedNote = r.hostel ? "hostel bed" : "not in hostel";
  const tickets = r.meals.map(t => `
    <div class="inv-ticket">
      <div class="inv-ticket-top">MEAL TICKET</div>
      <div class="inv-ticket-main">${esc(t.day)} - ${esc(t.meal)}</div>
      <div class="inv-ticket-sub">${esc(t.date)}</div>
      <div class="inv-ticket-id">${esc(t.code)}</div>
    </div>`).join("");
  return `
  <div class="inv-sheet" id="invoiceSheet">
    <div class="inv-top">
      <div class="inv-brand">
        <div class="inv-logo"><img src="${logo}" alt="STS logo"></div>
        <div>
          <div class="inv-org">SAVED TO BE SENT</div>
          <div class="inv-org2">Mission Outreach</div>
          <div class="inv-script">Saved to save&trade;</div>
        </div>
      </div>
      <div class="inv-meta">
        <div class="inv-title">REGISTRATION INVOICE</div>
        <div>Reg ID: <b>${esc(r.regId)}</b></div>
        <div>Issued: ${esc(r.issued)}</div>
      </div>
    </div>
    <div class="inv-banner">
      <div class="inv-congrats">Congratulations, ${esc(r.name)}!</div>
      <p>Your registration for the <b>Missionaries Conference 2027</b> is successful and approved.</p>
    </div>
    <div class="inv-theme">Conference Theme: <i>${esc(S().theme)}</i></div>
    <p class="inv-welcome"><b>Welcome note:</b> Welcome to the Missionaries Conference 2027, themed <i><b>${esc(S().theme)}</b></i>. We are glad to have you with us. From February 10 to 12, 2027 we will be equipped, set on fire and sent out as living witnesses of Christ. Keep this invoice safe and show it at the registration desk.</p>
    <div class="inv-grid">
      <div class="inv-seatbox"><span>SEAT NO.</span><b>${esc(r.seat)}</b><small>your seat</small></div>
      <div class="inv-seatbox"><span>BED NO.</span><b>${bedText}</b><small>${bedNote}</small></div>
      <div class="inv-seatbox"><span>DAYS</span><b>${esc(r.days)}</b><small>${r.days === 1 ? "day" : "days"} attending</small></div>
    </div>
    <table class="inv-table">
      <tr><td>Full name</td><td>${esc(r.name)}</td></tr>
      <tr><td>Email</td><td>${esc(r.email)}</td></tr>
      <tr><td>Phone</td><td>${esc(r.phone)}</td></tr>
      <tr><td>Location</td><td>${esc(r.location)}</td></tr>
      <tr><td>Event</td><td>Missionaries Conference 2027</td></tr>
      <tr><td>Dates</td><td>February 10 - 12, 2027</td></tr>
      <tr><td>Hostel</td><td>${r.hostel ? "Yes, staying in the hostel" : "No, not staying in the hostel"}</td></tr>
      <tr><td>Meal tickets</td><td>${r.meals.length} (2 meals a day for ${esc(r.days)} ${r.days === 1 ? "day" : "days"})</td></tr>
    </table>
    <div class="inv-sec-title">Meal tickets - 2 meals a day</div>
    <div class="inv-tickets">${tickets}</div>
    <div class="inv-verse">&ldquo;${esc(S().verseText)}&rdquo;<div>${esc(S().verseRef)}</div></div>
    ${r.personal ? `<div class="inv-personal"><div class="inv-personal-t">A WORD FOR YOU, ${esc(String(r.name).trim().split(/\s+/)[0].toUpperCase())}</div>&ldquo;${esc(r.personal.text)}&rdquo;<div class="inv-personal-r">${esc(r.personal.ref)}</div><div class="inv-personal-p"><b>Your prayer point:</b> ${esc(r.personal.prayer)}</div><div class="inv-personal-c">${esc(r.personal.charge)}</div></div>` : ""}
    <div class="inv-sign">
      <div class="inv-sign-text"><b>Approved by the ministry</b><br>Saved To Be Sent Mission Outreach<br>Registration ID: ${esc(r.regId)}<div class="inv-signature">Daniel</div><div class="inv-signline">Daniel, for the ministry</div></div>
      ${stampSvg(r.issuedDate)}
    </div>
    <div class="inv-cut"><span><i class="fa-solid fa-scissors"></i> cut here - registration ID segment</span></div>
    <div class="inv-stub">
      <div class="inv-stub-id">${esc(r.regId)}</div>
      <div><b>${esc(r.name)}</b></div>
      <div>Seat ${esc(r.seat)} | Bed ${bedText} | ${esc(r.days)} ${r.days === 1 ? "day" : "days"}</div>
    </div>
  </div>`;
}

function showInvoice(r) {
  lastRegistration = r;
  document.getElementById("invoiceSheetHolder").innerHTML = invoiceHtml(r);
  document.getElementById("invoiceNotice").classList.add("hidden");
  document.getElementById("invoiceSendStatus").textContent = "";
  document.getElementById("whatsappNext").classList.add("hidden");
  document.getElementById("whatsappLink").href = S().groupLink;
  const b = document.getElementById("sendInvoiceBtn");
  b.disabled = false; b.innerHTML = '<i class="fa-solid fa-envelope mr-2"></i>Send my details to my email';
  document.getElementById("invoiceModal").classList.remove("hidden");
  document.getElementById("invoiceModal").scrollTop = 0;
}
function reopenInvoice() {
  if (appState.lastReg) showInvoice(appState.lastReg);
}
function closeInvoiceModal() {
  const sentAlready = document.getElementById("whatsappNext") && !document.getElementById("whatsappNext").classList.contains("hidden");
  if (!sentAlready && !confirm("You have not sent this to your email yet. Close anyway? You can open it again from the conference card.")) return;
  document.getElementById("invoiceModal").classList.add("hidden");
}
function printInvoice() {
  document.body.classList.add("printing-invoice");
  window.print();
  setTimeout(() => document.body.classList.remove("printing-invoice"), 800);
}

async function downloadInvoicePdf() {
  const r = lastRegistration, el = document.getElementById("invoiceSheet");
  if (!r || !el) return;
  const btn = document.getElementById("dlInvoiceBtn"), old = btn.innerHTML;
  btn.disabled = true; btn.textContent = "Preparing your PDF...";
  const load = src => new Promise((ok, no) => { const sc = document.createElement("script"); sc.src = src; sc.onload = ok; sc.onerror = no; document.head.appendChild(sc); });
  try {
    if (!window.html2canvas) await load("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
    if (!(window.jspdf && window.jspdf.jsPDF)) await load("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
    const pdf = new window.jspdf.jsPDF({ unit: "mm", format: "a4" });
    const w = 210, h = canvas.height * w / canvas.width, pageH = 297, img = canvas.toDataURL("image/jpeg", 0.92);
    let y = 0, left = h - pageH;
    pdf.addImage(img, "JPEG", 0, y, w, h);
    while (left > 0) { y -= pageH; pdf.addPage(); pdf.addImage(img, "JPEG", 0, y, w, h); left -= pageH; }
    pdf.save("STS-Invoice-" + r.regId + ".pdf");
  } catch (e) {
    alert("The PDF tool could not load, so the print window will open instead. Choose Save as PDF there.");
    printInvoice();
  }
  btn.disabled = false; btn.innerHTML = old;
}

async function sendInvoiceToEmail(auto) {
  const r = lastRegistration;
  if (!r) return;
  const btn = document.getElementById("sendInvoiceBtn");
  const status = document.getElementById("invoiceSendStatus");
  btn.disabled = true; btn.textContent = "Sending...";
  const meals = r.meals.map(t => `${t.day} ${t.meal} (${t.code})`).join(" | ");
  const bedText = r.hostel ? r.bed : "Not staying in hostel";
  const welcome = `Welcome to the Missionaries Conference 2027, themed "${S().theme}". We are glad to have you with us. The conference holds from February 10 to 12, 2027. Keep this email safe and show it at the registration desk.`;
  const sent = await postToFormSubmit({
    _subject: `Your Registration Invoice - Missionaries Conference 2027 (${r.regId})`,
    _template: "table", _captcha: "false", _cc: r.email,
    name: r.name, email: r.email,
    "Congratulations": `Congratulations ${r.name}! Your registration is successful and approved.`,
    "Welcome Note": welcome,
    "Conference Theme": S().theme,
    "Registration ID": r.regId,
    "Seat Number": r.seat,
    "Bed Number": bedText,
    "Days Attending": r.days,
    "Meal Tickets (2 meals a day)": meals,
    "Phone": r.phone,
    "Location": r.location,
    "Bible Verse": `${S().verseText} (${S().verseRef})`,
    "Your Personal Word": r.personal ? `${r.personal.text} (${r.personal.ref})` : "",
    "Your Prayer Point": r.personal ? `${r.personal.prayer} ${r.personal.charge}` : "",
    "Approval": "Approved by Saved To Be Sent Mission Outreach. Signed: Daniel",
    "Join our WhatsApp group": S().groupLink
  });
  if (sent) {
    status.textContent = "Sent! Check your inbox (and your spam folder) at " + r.email + ".";
    btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Sent. Tap to send again';
  } else if (auto) {
    status.textContent = "We could not email it automatically. Please tap the red button above to send it to your email.";
    btn.innerHTML = '<i class="fa-solid fa-envelope mr-2"></i>Send my details to my email';
  } else {
    const lines = [
      "Congratulations " + r.name + "! Your registration is successful and approved.", "", welcome, "",
      "Registration ID: " + r.regId, "Seat Number: " + r.seat, "Bed Number: " + bedText, "Days Attending: " + r.days,
      "Meal Tickets (2 meals a day): " + meals, "", S().verseText + " (" + S().verseRef + ")", "", r.personal ? "Your personal word: " + r.personal.text + " (" + r.personal.ref + ")" : "", r.personal ? "Prayer point: " + r.personal.prayer + " " + r.personal.charge : "", "",
      "Approved by Saved To Be Sent Mission Outreach", "Join our WhatsApp group: " + S().groupLink
    ].join("\n");
    status.textContent = "Your email app is opening with your details. Please press Send.";
    btn.innerHTML = '<i class="fa-solid fa-envelope mr-2"></i>Send my details to my email';
    window.location.href = `mailto:${r.email}?cc=${RECEIVER_EMAIL}&subject=${encodeURIComponent("Your Registration Invoice - Missionaries Conference 2027 (" + r.regId + ")")}&body=${encodeURIComponent(lines)}`;
  }
  btn.disabled = false;
  document.getElementById("whatsappNext").classList.remove("hidden");
}

// ---------- Other forms ----------
function fillTemplate(t, v) { return String(t || "").replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m); }

// Spam guard: every form has a hidden "website" field that people never see or fill.
// Bots fill every field, so a filled one means the submission is quietly dropped.
function isBot(form) {
  const trap = form && form.querySelector("input[name='website']");
  return !!(trap && trap.value);
}
// Disables a submit button while a form is being sent, so a double tap sends once.
async function withBusy(btn, label, work) {
  if (!btn || btn.disabled) return;
  const old = btn.innerHTML;
  btn.disabled = true; btn.textContent = label || "Please wait...";
  try { return await work(); } finally { btn.disabled = false; btn.innerHTML = old; }
}

async function submitDonationForm(e) {
  e.preventDefault();
  if (!amountText("giveAmount")) return alert("Please enter the amount you gave.");
  const form = e.target;
  if (isBot(form)) { form.reset(); return; }
  const btn = document.getElementById("giveSubmitBtn");
  if (btn.disabled) return;
  const shotFile = document.getElementById("giveShot").files[0];
  if (shotFile && shotFile.size > 10 * 1024 * 1024) return alert("That screenshot is larger than 10 MB. Please choose a smaller picture.");
  const purpose = document.getElementById("giveCategoryInput").value;
  const v = {
    name: document.getElementById("giveName").value.trim(),
    phone: document.getElementById("givePhone").value.trim(),
    email: document.getElementById("giveEmail").value.trim(),
    amount: amountText("giveAmount")
  };
  const note = document.getElementById("giveNote").value;
  const file = shotFile;
  const oldLabel = btn.innerHTML;
  btn.disabled = true; btn.textContent = "Sending...";
  try {
    const gseq = await giftSeq("give-seq", "localGive");
    const mail = buildGiverEmail(v, purpose, gseq);
    const fields = {
      _subject: "STS Website: Giving - " + purpose, _template: "table", _captcha: "false",
      _autoresponse: mail.subject + "\n\n" + mail.body,
      purpose: purpose, name: v.name, email: v.email, phone: v.phone, amount: v.amount, note: note, thankYouVerse: mail.ref, status: "Giver confirmed: I have given"
    };
    let sent = false;
    try {
      const fd = new FormData();
      Object.entries(fields).forEach(([k, val]) => fd.append(k, val));
      if (file) fd.append("attachment", file, file.name);
      const res = await fetch(`https://formsubmit.co/ajax/${RECEIVER_EMAIL}`, { method: "POST", headers: { Accept: "application/json" }, body: fd });
      const data = await res.json();
      sent = res.ok && (data.success === true || data.success === "true");
    } catch (err) {}
    if (!sent) sent = await postToFormSubmit(fields);
    // The screenshot goes to the ministry inbox as an attachment. It is not kept in
    // this browser: it is the giver's private banking information.
    appState.submissions.unshift({ id: Date.now() + Math.random(), date: new Date().toLocaleString(), type: `Giving (${purpose})`, details: { purpose, name: v.name, email: v.email, phone: v.phone, amount: v.amount, note } });
    saveState();
    logToSheet(`Giving (${purpose})`, { purpose, name: v.name, email: v.email, phone: v.phone, amount: v.amount, note, emailed: sent ? "yes" : "NO, ask for the screenshot" });
    if (sent) {
      form.reset();
      document.getElementById("giveCategoryInput").value = purpose;
      alert(`Thank you, ${v.name}! Your giving has been logged and a thank-you email is on its way to ${v.email}.`);
    } else {
      // Keep what they typed so they can simply try again.
      alert("We could not reach the email service just now, so your giving was NOT sent to the ministry yet. Please check your internet and press the button again, or send your screenshot to " + RECEIVER_EMAIL + " or on WhatsApp.");
    }
  } finally {
    btn.disabled = false; btn.innerHTML = oldLabel;
  }
}

async function submitTrainingForm(e) {
  e.preventDefault();
  const form = e.target;
  if (isBot(form)) { form.reset(); return; }
  const name = document.getElementById("trainName").value.trim();
  const email = document.getElementById("trainEmail").value.trim();
  const phone = document.getElementById("trainPhone").value.trim();
  const city = document.getElementById("trainCity").value.trim();
  const track = document.getElementById("trainTrack").value;
  const reason = document.getElementById("trainReason").value.trim();

  await withBusy(form.querySelector("button[type=submit]"), "Sending...", async () => {
    const sent = await dispatchToMinistryEmail("Missionary Training Application", { name, email, phone, city, track, reason });
    form.reset();
    doneMessage(sent, `Welcome to the STS Training Force, ${name}! Your application has been sent to the ministry.`);
  });
}

async function submitPrayerForm(e) {
  e.preventDefault();
  const form = e.target;
  if (isBot(form)) { form.reset(); return; }
  const name = document.getElementById("prayName").value.trim();
  const contact = document.getElementById("prayContact").value.trim();
  const category = document.getElementById("prayType").value;
  const message = document.getElementById("prayMessage").value.trim();

  await withBusy(form.querySelector("button[type=submit]"), "Sending...", async () => {
    const sent = await dispatchToMinistryEmail(`Prayer Request (${category})`, { name, contact, category, message });
    form.reset();
    doneMessage(sent, "Your prayer request has been received and sent to our intercessors.");
  });
}


// ---------- Payment options (bank, Paystack, Stripe, crypto) ----------
const QUICK_AMOUNTS = [3, 4, 5, 6, 10, 100];
const NGN_RATE = Number(CONFIG.ngnPerUsd) || 1400;
let CUR = "USD";
function isHttp(u) { return /^https?:\/\//i.test(String(u || "").trim()); }
function waLink(msg) { return "https://wa.me/" + String(S().whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(msg); }
function copyText(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => alert(label + " copied!"), () => alert(label + ": " + text));
  } else { alert(label + ": " + text); }
}
function chipHtml(n, fn) {
  return `<button type="button" data-amt="${n}" onclick="${fn}(${n})" class="amt-chip text-sm font-extrabold bg-black/5 hover:bg-stsRed border border-black/15 px-3.5 py-1.5 rounded-full transition">${moneyLabel(n)}${n === 100 ? "+" : ""}</button>`;
}
function paintChips(active) {
  document.querySelectorAll(".amt-chip").forEach(c => {
    const on = Number(c.dataset.amt) === active;
    c.classList.toggle("bg-stsRed", on); c.classList.toggle("text-white", on); c.classList.toggle("border-stsRed", on);
  });
}
function pickAmount(n) {
  document.getElementById("giveAmount").value = fieldNum(n);
  paintChips(n); refreshCurrencyUI();
}
function hookPick(n) {
  closeHookModal();
  pickAmount(n);
  openAccountModal(document.getElementById("giveCategoryInput").value);
  paintChips(n);
}
function renderPayMethods() {
  const a = appState;
  const btnCls = "block w-full text-center bg-stsRed hover:bg-red-700 text-white font-bold py-2.5 rounded-lg text-sm";
  const linkPanel = (name, link) => isHttp(link)
    ? `<a href="${esc(link.trim())}" target="_blank" rel="noopener" class="${btnCls}">Pay with ${name}</a><p class="text-[11px] text-gray-500">Opens ${name}'s secure payment page. Come back and tap "I have paid, log my payment".</p>`
    : `<p class="text-xs text-gray-500">Our ${name} details are shared on request.</p><a href="${esc(waLink("Hello, I want to give through " + name + ". Please send me the details."))}" target="_blank" rel="noopener" class="${btnCls}">Get ${name} details on WhatsApp</a>`;
  const cryptoBody = a.cryptoWallet
    ? `<div><span class="text-gray-500">Network:</span> <strong class="text-gray-900">${esc(a.cryptoNetwork || "USDT")}</strong></div>
       <div class="text-gray-500">Wallet address:</div>
       <div class="flex items-center justify-between gap-2"><strong class="text-stsRed text-sm break-all">${esc(a.cryptoWallet)}</strong>
       <button type="button" onclick="copyText(appState.cryptoWallet, 'Wallet address')" class="bg-black/5 hover:bg-black/10 text-xs px-3 py-1.5 rounded font-bold shrink-0"><i class="fa-regular fa-copy mr-1"></i>Copy</button></div>
       <p class="text-[11px] text-gray-500">Send only on the network shown above.</p>`
    : `<p class="text-xs text-gray-500">The wallet address is shared on request so you can confirm the network with us first.</p><a href="${esc(waLink("Hello, I want to give to the mission in cryptocurrency, can I have the USDT wallet address?"))}" target="_blank" rel="noopener" class="${btnCls}">Get wallet address on WhatsApp</a>`;
  const methods = [
    { id: "bank", icon: "fa-solid fa-building-columns", title: "Bank Transfer", sub: "Account number shows when you tap",
      body: `<div><span class="text-gray-500">Bank:</span> <strong class="text-gray-900">${esc(a.bankName)}</strong></div>
             <div><span class="text-gray-500">Account Name:</span> <strong class="text-gray-900">${esc(a.acctName)}</strong></div>
             <div class="flex items-center justify-between pt-1"><div><span class="text-gray-500">Account No:</span> <strong class="text-stsRed text-xl tracking-wider">${esc(a.acctNum)}</strong></div>
             <button type="button" onclick="copyAcctNumber()" class="bg-black/5 hover:bg-black/10 text-xs px-3 py-1.5 rounded font-bold"><i class="fa-regular fa-copy mr-1"></i>Copy</button></div>` },
    { id: "paystack", icon: "fa-solid fa-credit-card", title: "Paystack", sub: "Card or bank payment in Naira", body: linkPanel("Paystack", a.paystackLink) },
    { id: "stripe", icon: "fa-brands fa-stripe", title: "Stripe", sub: "Card payment in Dollars", body: linkPanel("Stripe", a.stripeLink) },
    { id: "crypto", icon: "fa-brands fa-bitcoin", title: "Crypto (USDT)", sub: "Wallet address shows when you tap", body: cryptoBody }
  ];
  document.getElementById("payMethods").innerHTML = methods.map(m => `
    <div class="border border-black/10 rounded-xl overflow-hidden bg-stsObsidian">
      <button type="button" onclick="togglePay('${m.id}')" class="w-full flex items-center justify-between gap-3 p-3.5 text-left">
        <span class="flex items-center gap-3">
          <span class="w-10 h-10 rounded-lg bg-stsRed/20 text-stsRed flex items-center justify-center shrink-0"><i class="${m.icon}"></i></span>
          <span><span class="block font-bold text-sm text-gray-900">${m.title}</span><span class="block text-[11px] text-gray-500">${m.sub}</span></span>
        </span>
        <i id="payChev-${m.id}" class="fa-solid fa-chevron-down text-gray-500 text-xs transition"></i>
      </button>
      <div id="payPanel-${m.id}" class="hidden px-4 pb-4 pt-1 text-sm space-y-2">${m.body}</div>
    </div>`).join("");
}
function togglePay(id) {
  document.querySelectorAll("[id^='payPanel-']").forEach(p => {
    const open = p.id === "payPanel-" + id && p.classList.contains("hidden");
    p.classList.toggle("hidden", !open);
    const ch = document.getElementById("payChev-" + p.id.slice(9));
    if (ch) ch.style.transform = open ? "rotate(180deg)" : "";
  });
}

// ---------- Monthly partner ----------
function openPartnerModal() {
  document.getElementById("pBirthday").max = new Date().toISOString().slice(0, 10);
  document.getElementById("partnerModal").classList.remove("hidden");
}
function closePartnerModal() {
  document.getElementById("partnerModal").classList.add("hidden");
}

// ---------- Unique thank-you emails (a different verse, greeting and wording for every person) ----------
const GIVE_VERSES = [
  ["Luke 6:38", "Give, and it shall be given unto you; good measure, pressed down, and shaken together, and running over, shall men give into your bosom. For with the same measure that ye mete withal it shall be measured to you again."],
  ["2 Corinthians 9:7", "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."],
  ["2 Corinthians 9:6", "But this I say, He which soweth sparingly shall reap also sparingly; and he which soweth bountifully shall reap also bountifully."],
  ["Proverbs 11:25", "The liberal soul shall be made fat: and he that watereth shall be watered also himself."],
  ["Proverbs 19:17", "He that hath pity upon the poor lendeth unto the Lord; and that which he hath given will he pay him again."],
  ["Philippians 4:19", "But my God shall supply all your need according to his riches in glory by Christ Jesus."],
  ["Acts 20:35", "I have shewed you all things, how that so labouring ye ought to support the weak, and to remember the words of the Lord Jesus, how he said, It is more blessed to give than to receive."],
  ["Hebrews 6:10", "For God is not unrighteous to forget your work and labour of love, which ye have shewed toward his name, in that ye have ministered to the saints, and do minister."],
  ["Galatians 6:9", "And let us not be weary in well doing: for in due season we shall reap, if we faint not."],
  ["Proverbs 3:9-10", "Honour the Lord with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine."],
  ["2 Corinthians 9:8", "And God is able to make all grace abound toward you; that ye, always having all sufficiency in all things, may abound to every good work:"],
  ["Ecclesiastes 11:1", "Cast thy bread upon the waters: for thou shalt find it after many days."],
  ["Matthew 10:42", "And whosoever shall give to drink unto one of these little ones a cup of cold water only in the name of a disciple, verily I say unto you, he shall in no wise lose his reward."],
  ["Romans 10:14", "How then shall they call on him in whom they have not believed? and how shall they believe in him of whom they have not heard? and how shall they hear without a preacher?"],
  ["Romans 10:17", "So then faith cometh by hearing, and hearing by the word of God."],
  ["Psalm 119:105", "Thy word is a lamp unto my feet, and a light unto my path."],
  ["Isaiah 40:8", "The grass withereth, the flower fadeth: but the word of our God shall stand for ever."],
  ["Matthew 6:20", "But lay up for yourselves treasures in heaven, where neither moth nor rust doth corrupt, and where thieves do not break through nor steal:"],
  ["Psalm 126:5-6", "They that sow in tears shall reap in joy. He that goeth forth and weepeth, bearing precious seed, shall doubtless come again with rejoicing, bringing his sheaves with him."],
  ["Deuteronomy 15:10", "Thou shalt surely give him, and thine heart shall not be grieved when thou givest unto him: because that for this thing the Lord thy God shall bless thee in all thy works, and in all that thou puttest thine hand unto."],
  ["Proverbs 22:9", "He that hath a bountiful eye shall be blessed; for he giveth of his bread to the poor."],
  ["Luke 12:34", "For where your treasure is, there will your heart be also."],
  ["Mark 4:8", "And other fell on good ground, and did yield fruit that sprang up and increased; and brought forth, some thirty, and some sixty, and some an hundred."],
  ["John 4:36", "And he that reapeth receiveth wages, and gathereth fruit unto life eternal: that both he that soweth and he that reapeth may rejoice together."],
  ["John 12:24", "Verily, verily, I say unto you, Except a corn of wheat fall into the ground and die, it abideth alone: but if it die, it bringeth forth much fruit."],
  ["Isaiah 32:20", "Blessed are ye that sow beside all waters, that send forth thither the feet of the ox and the ass."],
  ["Psalm 112:9", "He hath dispersed, he hath given to the poor; his righteousness endureth for ever; his horn shall be exalted with honour."],
  ["2 Corinthians 9:10", "Now he that ministereth seed to the sower both minister bread for your food, and multiply your seed sown, and increase the fruits of your righteousness;"],
  ["Matthew 25:40", "And the King shall answer and say unto them, Verily I say unto you, Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me."],
  ["Hebrews 13:16", "But to do good and to communicate forget not: for with such sacrifices God is well pleased."],
  ["1 Chronicles 29:14", "But who am I, and what is my people, that we should be able to offer so willingly after this sort? for all things come of thee, and of thine own have we given thee."],
  ["Proverbs 28:27", "He that giveth unto the poor shall not lack: but he that hideth his eyes shall have many a curse."],
  ["1 Peter 4:10", "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God."],
  ["1 Corinthians 15:58", "Therefore, my beloved brethren, be ye stedfast, unmoveable, always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain in the Lord."]
];
const GIVE_SUBJECTS = [
  "Thank you, {name}, your seed has been received", "God bless you, {name}!", "{name}, we are grateful for your giving",
  "A word of thanks from the mission field, {name}", "Your seed is already working, {name}", "Heaven notices your giving, {name}",
  "Thank you for standing with the unreached, {name}", "{name}, thank you and God bless you", "Grace and peace to you, {name}", "We thank God for you, {name}"
];
const GIVE_GREETINGS = [
  "Grace and peace to you, {name}!", "Hallelujah, {name}!", "Beloved {name},", "Shalom, {name}!", "Dear {name}, God bless you richly!",
  "Greetings in the matchless name of Jesus, {name},", "Warm greetings from the mission field, {name}!", "{name}, the Lord bless you and keep you!",
  "Blessed {name},", "Praise God for you, {name}!", "Dear friend and partner {name},", "Peace be unto you, {name},", "Glory to God for your life, {name}!", "God bless you, dear {name}!"
];
const GIVE_THANKS = [
  "On behalf of Saved To Be Sent Mission Outreach, we sincerely thank you for your giving of {amount} towards {purpose}.",
  "We received the news of your {amount} seed for {purpose} with joyful hearts, and we say a big thank you.",
  "Thank you for placing {amount} into {purpose}. Gifts like yours are why the Gospel keeps reaching new places.",
  "Your generous seed of {amount} for {purpose} has touched our hearts, and we are deeply grateful.",
  "We thank God for your kindness. Your {amount} given towards {purpose} is truly appreciated.",
  "Thank you for hearing the call and giving {amount} to {purpose}. You are a real blessing to this work.",
  "It is a joy to partner with you. We appreciate your {amount} towards {purpose} more than words can say.",
  "Thank you, {name}, for your {amount} towards {purpose}. Heaven sees every seed given in love.",
  "Your giving of {amount} for {purpose} has been logged with gratitude, and we honour you for it.",
  "We are thankful for the love behind your {amount} towards {purpose}. May the Lord multiply it back to you.",
  "Thank you for sowing {amount} into {purpose}. Because of you, someone in an unreached place will hear of Jesus.",
  "With thankful hearts we acknowledge your {amount} given to {purpose}. God bless you for your obedience."
];
const GIVE_PRAYERS = [
  "{name}, we will keep praying for you. May the Lord meet every need in your life and return your seed to you in good measure.",
  "We will keep praying for you, {name}. May doors of favour open for you and your household.",
  "Know that we will keep praying for you, {name}, for peace in your home, strength in your work and joy in your walk with God.",
  "{name}, we will keep lifting you up in prayer. May the Lord who sees in secret reward you openly.",
  "We will keep praying for you, {name}. May every seed you have sown come back to you as a harvest of blessing.",
  "{name}, our intercessors will keep praying for you. May God supply all you need and give you more to give.",
  "We will keep praying for you, {name}, that the Lord guards your health, prospers your hands and fills your heart with His joy.",
  "{name}, we will remember you before the Lord. May His grace abound towards you in everything.",
  "We will keep praying for you, {name}. May the Lord enlarge your coast and let your life bear lasting fruit.",
  "{name}, we will keep praying for you and your loved ones. May the Lord surround you with His favour like a shield.",
  "We will keep covering you in prayer, {name}. May your giving open heaven over your life.",
  "{name}, we will keep praying for you. May the Lord answer you in the day of trouble and lift you up in due season."
];
const GIVE_CONTINUE = [
  "As the Lord lays it on your heart, you are always welcome to keep giving. There is no pressure, only the joy of sowing.",
  "Whenever the Lord moves your heart again, you can continue to give. Every seed, big or small, is received with gratitude.",
  "As the Lord leads you, please feel free to keep sowing into this mission. We will keep telling you what He does with your seed.",
  "If the Lord lays more on your heart in the days ahead, you can continue to give as He leads. We are walking with you.",
  "Give as the Lord lays it in your heart, whenever He does. We trust Him to lead each of us in this work.",
  "You can continue to give as the Lord moves you, and we will keep standing together for the unreached.",
  "Whenever the Spirit prompts you, you can keep giving. Your joy in giving is itself a blessing to us.",
  "As God lays it upon your heart, continue to sow. The harvest belongs to Him, and He is faithful."
];
const GIVE_SIGNOFFS = [
  "With love in Christ,", "Yours in the harvest field,", "Grace and peace,", "Saved to save,", "In His service,", "Blessings,", "Gratefully in Christ,", "Until every village hears,"
];
const PARTNER_WELCOMES = [
  "Thank you for stepping forward to become a monthly partner with a pledge of {pledge} every month. We receive it with great joy.",
  "We are thrilled that you want to walk with us every month with {pledge}. Steady seed sowing is how the harvest comes.",
  "Your decision to partner monthly with {pledge} is a gift to the unreached. Thank you for your faithfulness in advance.",
  "God bless you for committing {pledge} each month. Partners like you keep missionaries moving and Bibles flowing.",
  "Welcome to the family of monthly partners! Your pledge of {pledge} a month will help keep the Gospel going into hard places.",
  "Thank you for choosing to sow {pledge} every month. Your consistency will carry the Word further than you can see.",
  "We rejoice over your pledge of {pledge} a month. Together we will keep reaching the unreached, one month at a time.",
  "Thank you, {name}, for pledging {pledge} monthly. You have joined the people who make long-term mission work possible."
];

function firstName(n) { return String(n || "").trim().split(/\s+/)[0] || "Beloved"; }
function gcd(a, b) { return b ? gcd(b, a % b) : a; }
// Walks each pool with a step that never divides its length, so neighbouring numbers never get the same line.
function pickUnique(pool, n, salt) {
  const len = pool.length;
  let stride = 3;
  while (gcd(stride, len) !== 1) stride += 2;
  return pool[(((n - 1) * stride + salt) % len + len) % len];
}
function amountToUsd(str) {
  const t = String(str || "").split("(")[0];
  const num = parseFloat(t.replace(/,/g, "").replace(/[^0-9.]/g, ""));
  if (!isFinite(num) || num <= 0) return null;
  if (/₦|ngn|naira|\bn\s*\d/i.test(t)) return num / NGN_RATE;
  if (/£|€|gbp|eur|ghs|cedi|kes|ksh|inr|rand|zar|cad|aud/i.test(t)) return null;
  return num;
}
function impactLine(purpose, amount) {
  const usd = amountToUsd(amount);
  if (/Bibles/i.test(purpose)) {
    if (usd === null) return "Your seed will go towards placing Bibles in the hands of families in unreached villages.";
    if (usd >= 100) return "A seed of this size can place Bibles in the hands of many families in unreached villages and help provide relief packages for people in need.";
    if (usd >= 10) { const b = Math.floor(usd / 10); return "At $10 a Bible, your seed can place about " + b + " Bible" + (b > 1 ? "s" : "") + " in unreached villages" + (usd >= 50 ? ", and help towards relief packages for families in need" : "") + "."; }
    return "Seeds like yours, joined with others, become Bibles and relief packages for unreached villages. Nothing given in faith is small.";
  }
  if (/Tracts/i.test(purpose)) return "Your seed will be printed into Gospel tracts that our teams place in the hands of people in streets, markets and remote villages.";
  if (/Missionary/i.test(purpose)) return "Your seed will help with transport, welfare and care for the missionaries who carry the Gospel into hard places.";
  if (/Outreach|Crusade/i.test(purpose)) return "Your seed will help with sound equipment, lighting, welfare food bags and the logistics of reaching rural communities.";
  return "Your seed will strengthen every part of the work: Bibles, tracts, missionaries and outreaches.";
}
function buildGiverEmail(v, purpose, n) {
  const f = { name: firstName(v.name), amount: v.amount, purpose: purpose.replace(/\s*\(\$10\/Bible\)/, "").toLowerCase().replace("bibles", "Bibles") };
  const verse = pickUnique(GIVE_VERSES, n, 0);
  const body = [
    fillTemplate(pickUnique(GIVE_GREETINGS, n, 1), f),
    fillTemplate(pickUnique(GIVE_THANKS, n, 2), f),
    impactLine(purpose, v.amount),
    "\"" + verse[1] + "\" (" + verse[0] + ")",
    fillTemplate(pickUnique(GIVE_PRAYERS, n, 3), f),
    pickUnique(GIVE_CONTINUE, n, 4),
    pickUnique(GIVE_SIGNOFFS, n, 5) + "\nSaved To Be Sent Mission Outreach"
  ].join("\n\n");
  return { subject: fillTemplate(pickUnique(GIVE_SUBJECTS, n, 6), f), body: body, ref: verse[0] };
}
function buildPartnerEmail(v, n) {
  const f = { name: firstName(v.name), pledge: v.pledge };
  const verse = pickUnique(GIVE_VERSES, n, 7);
  let bday = "";
  try { bday = new Date(v.birthday + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long" }); } catch (e) {}
  const body = [
    fillTemplate(pickUnique(GIVE_GREETINGS, n, 8), f),
    fillTemplate(pickUnique(PARTNER_WELCOMES, n, 9), f),
    "Each month your seed will help put Bibles, relief packages and missionaries where the Gospel has not yet been heard. Our team will be in touch with you about how to send your monthly seed.",
    "\"" + verse[1] + "\" (" + verse[0] + ")",
    fillTemplate(pickUnique(GIVE_PRAYERS, n, 10), f) + (bday ? " We will also remember your birthday, " + bday + ", in prayer." : ""),
    pickUnique(GIVE_CONTINUE, n, 11),
    pickUnique(GIVE_SIGNOFFS, n, 12) + "\nSaved To Be Sent Mission Outreach"
  ].join("\n\n");
  return { subject: fillTemplate(pickUnique(GIVE_SUBJECTS, n, 13), f), body: body, ref: verse[0] };
}

async function submitPartnerForm(e) {
  e.preventDefault();
  const form = e.target;
  if (isBot(form)) { form.reset(); closePartnerModal(); return; }
  const btn = document.getElementById("partnerSubmitBtn");
  if (btn.disabled) return;
  const v = {
    name: document.getElementById("pName").value.trim(),
    birthday: document.getElementById("pBirthday").value,
    address: document.getElementById("pAddress").value.trim(),
    phone: document.getElementById("pPhone").value.trim(),
    email: document.getElementById("pEmail").value.trim(),
    pledge: amountText("pPledge")
  };
  if (!v.pledge) return alert("Please enter the amount you want to pledge each month.");
  btn.disabled = true;
  const old = btn.innerHTML; btn.textContent = "Please wait...";
  try {
    const n = await giftSeq("partner-seq", "localPartner");
    const mail = buildPartnerEmail(v, n);
    const fields = {
      _subject: "STS Website: New Monthly Partner - " + v.name, _template: "table", _captcha: "false",
      _autoresponse: mail.subject + "\n\n" + mail.body,
      name: v.name, birthday: v.birthday, address: v.address || "Not given", phone: v.phone, email: v.email, monthlyPledge: v.pledge, welcomeVerse: mail.ref
    };
    const sent = await postToFormSubmit(fields);
    const details = { name: v.name, birthday: v.birthday, address: v.address, phone: v.phone, email: v.email, monthlyPledge: v.pledge };
    appState.submissions.unshift({ id: Date.now() + Math.random(), date: new Date().toLocaleString(), type: "Monthly Partner", details: details });
    saveState();
    logToSheet("Monthly Partner", details);
    form.reset();
    closePartnerModal();
    if (sent) {
      alert("Thank you, " + firstName(v.name) + "! Your monthly pledge has been received and a welcome email is on its way to " + v.email + ".");
    } else {
      const lines = Object.entries({ name: v.name, birthday: v.birthday, address: v.address, phone: v.phone, email: v.email, monthlyPledge: v.pledge }).map(([k, x]) => k + ": " + x).join("\n");
      alert("Almost done! Your email app is opening with your details addressed to " + RECEIVER_EMAIL + ". Please press Send.");
      window.location.href = "mailto:" + RECEIVER_EMAIL + "?subject=" + encodeURIComponent("STS Website: New Monthly Partner") + "&body=" + encodeURIComponent(lines);
    }
  } finally {
    btn.disabled = false; btn.innerHTML = old;
  }
}

// Admin Backend Logic
function openAdminModal() {
  document.getElementById("adminModal").classList.remove("hidden");
  document.getElementById("editSouls").value = appState.souls;
  document.getElementById("editBibles").value = appState.bibles;
  document.getElementById("editVillages").value = appState.villages;
  document.getElementById("editMissionaries").value = appState.missionaries;
  document.getElementById("editConfReg").value = appState.confReg;
  document.getElementById("editConfMax").value = appState.confMax;
  document.getElementById("editBankName").value = appState.bankName;
  document.getElementById("editAcctNum").value = appState.acctNum;
  document.getElementById("editAcctName").value = appState.acctName;
  document.getElementById("editPaystack").value = appState.paystackLink || "";
  document.getElementById("editStripe").value = appState.stripeLink || "";
  document.getElementById("editWallet").value = appState.cryptoWallet || "";
  document.getElementById("editNetwork").value = appState.cryptoNetwork || "";
  const s = S();
  [["setTheme","theme"],["setWa","whatsapp"],["setGroup","groupLink"],["setVerse","verseText"],["setVerseRef","verseRef"],["setHeroTitle","heroTitle"],["setHeroSub","heroSub"]].forEach(([id,k]) => document.getElementById(id).value = s[k] || "");
  document.getElementById("setHeard").value = s.heardOptions.join("\n");
  renderAdminManage();
  renderPublishStatus();
}

// ---------- Publishing: admin draft -> content.json -> every visitor ----------
function contentSnapshot() {
  const c = pickKeys(appState, CONTENT_KEYS);
  return Object.assign({ _about: "Published content for the STS website. Generated by the Admin backend; upload it next to index.html.", publishedAt: new Date().toISOString() }, c);
}
function renderPublishStatus() {
  const box = document.getElementById("publishStatus");
  if (!box) return;
  const hasDraft = !!adminDraft;
  const hasLegacy = !!storeGet(LEGACY_BACKUP_KEY);
  const size = new Blob([JSON.stringify(contentSnapshot())]).size;
  const uploads = JSON.stringify(pickKeys(appState, ["catalog", "events", "gallery"])).split("data:image/").length - 1;
  box.innerHTML =
    (hasDraft
      ? `<p class="font-bold text-stsRed">You have unpublished changes. Only this browser shows them right now.</p>`
      : `<p class="font-bold text-gray-900">No unpublished changes. Visitors see the same content as you.</p>`) +
    `<p class="text-gray-500 mt-1">content.json size: ${(size / 1024).toFixed(0)} KB${uploads ? ` (includes ${uploads} uploaded picture${uploads > 1 ? "s" : ""}; picture links keep the site faster)` : ""}.</p>` +
    (hasLegacy ? `<p class="mt-2 text-gray-600">Edits made with the previous version of the site were found in this browser. <button type="button" onclick="restoreLegacyBackup()" class="text-stsRed font-bold underline">Load them as a draft</button></p>` : "");
  const discard = document.getElementById("discardDraftBtn");
  if (discard) discard.disabled = !hasDraft;
}
function downloadContentJson() {
  if (!adminUnlocked) return alert("Admin login required.");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(contentSnapshot(), null, 2)], { type: "application/json" }));
  a.download = "content.json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  alert("content.json downloaded. Upload it next to index.html (replace the old one). When the new file is live, press \"Discard draft\" here: you will then see exactly what visitors see.");
}
function discardDraft() {
  if (!adminUnlocked) return alert("Admin login required.");
  if (!confirm("Throw away the unpublished changes in this browser and show the published content again?")) return;
  adminDraft = null;
  storeSet(DRAFT_KEY, null);
  appState = composeState();
  renderAllUI(); openAdminModal();
}
function restoreLegacyBackup() {
  if (!adminUnlocked) return alert("Admin login required.");
  const old = storeGet(LEGACY_BACKUP_KEY);
  if (!old) return;
  if (!confirm("Load the edits saved by the previous version of the site as a draft? Check the bank details and numbers before you publish.")) return;
  Object.assign(appState, pickKeys(old, CONTENT_KEYS));
  saveContent();
  storeSet(LEGACY_BACKUP_KEY, null);
  openAdminModal();
}

function saveSiteSettings() {
  const s = S(), g = id => document.getElementById(id).value.trim();
  s.theme = g("setTheme") || s.theme; s.whatsapp = g("setWa") || s.whatsapp; s.groupLink = g("setGroup") || s.groupLink;
  s.verseText = g("setVerse") || s.verseText; s.verseRef = g("setVerseRef") || s.verseRef;
  s.heroTitle = g("setHeroTitle"); s.heroSub = g("setHeroSub");
  s.heardOptions = document.getElementById("setHeard").value.split("\n").map(x => x.trim()).filter(Boolean);
  saveContent(); renderPublishStatus(); alert(DRAFT_SAVED_MSG);
}

function renderAdminManage() {
  const row = (label, kind, i) => `<div class="flex items-center justify-between gap-2 bg-stsCard border border-black/10 rounded p-2"><span class="truncate">${esc(label)}</span><span class="shrink-0"><button onclick="editItem('${kind}',${i})" class="text-stsRed font-bold mr-3">Edit</button><button onclick="deleteItem('${kind}',${i})" class="text-gray-700 font-bold">Delete</button></span></div>`;
  const sec = (t, arr, kind, f) => `<div><div class="font-bold text-gray-700 mb-1">${t}</div><div class="space-y-1">${arr.map((x, i) => row(f(x), kind, i)).join("") || "<p class='text-gray-500'>Nothing yet.</p>"}</div></div>`;
  document.getElementById("adminManage").innerHTML =
    sec("Videos", appState.videos, "videos", x => x.title) +
    sec("Map locations", appState.mapLocations, "mapLocations", x => x.name);
}
function editItem(kind, i) {
  const it = appState[kind][i];
  const fields = kind === "catalog" ? ["title", "desc", "img"] : kind === "videos" ? ["title", "embed"] : ["name", "note", "lat", "lng"];
  fields.forEach(f => {
    const v = prompt("Edit " + f + ":", it[f]);
    if (v === null) return;
    if (f === "lat" || f === "lng") { const n = parseFloat(v); if (isFinite(n)) it[f] = n; }
    else if (f === "embed") { const id = youtubeId(v); if (id) it[f] = "https://www.youtube.com/embed/" + id; else alert("That is not a YouTube link, so the video link was not changed."); }
    else it[f] = v;
  });
  saveContent(); renderAdminManage(); renderPublishStatus(); plotMapMarkers("ALL");
}
function deleteItem(kind, i) {
  if (!confirm("Remove this item from the website?")) return;
  appState[kind].splice(i, 1); saveContent(); renderAdminManage(); renderPublishStatus(); plotMapMarkers("ALL");
}
function addMapLocation() {
  const n = document.getElementById("newMapName").value.trim(), lat = parseFloat(document.getElementById("newMapLat").value), lng = parseFloat(document.getElementById("newMapLng").value);
  if (!n || isNaN(lat) || isNaN(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return alert("Enter a name, a latitude (-90 to 90) and a longitude (-180 to 180).");
  appState.mapLocations.push({ name: n, region: document.getElementById("newMapRegion").value, lat, lng, note: document.getElementById("newMapNote").value });
  ["newMapName", "newMapNote", "newMapLat", "newMapLng"].forEach(id => { document.getElementById(id).value = ""; });
  saveContent(); renderAdminManage(); renderPublishStatus(); plotMapMarkers("ALL");
}
function deleteSubmission(id) {
  if (!confirm("Delete this log entry?")) return;
  appState.submissions = appState.submissions.filter(s => String(s.id) !== String(id)); saveState();
}
// Imports a content.json (for example a backup, or one edited on another computer) as a draft.
function importSiteData(file) {
  if (!file) return;
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = pickKeys(JSON.parse(r.result), CONTENT_KEYS);
      if (!Object.keys(data).length) return alert("That file does not contain any site content.");
      Object.assign(appState, data);
      saveContent(); openAdminModal();
      alert("Content imported as a draft. Check it, then publish.");
    } catch (e) { alert("That file could not be read."); }
  };
  r.readAsText(file);
}

function closeAdminModal() {
  document.getElementById("adminModal").classList.add("hidden");
  adminUnlocked = false;
  document.getElementById("adminDashboardView").classList.add("hidden");
  document.getElementById("adminLoginView").classList.remove("hidden");
}

const ADMIN_SALT = (CONFIG.admin || {}).salt || "";
const ADMIN_HASH = (CONFIG.admin || {}).hash || "";
let adminFails = 0;
let adminUnlocked = false;
async function verifyAdminLogin() {
  const email = document.getElementById("adminEmailInput").value.trim().toLowerCase();
  const pass = document.getElementById("adminPassInput").value;
  if (!window.crypto || !crypto.subtle) return alert("Please open the website using its https link to log in.");
  if (adminFails > 0) await new Promise(r => setTimeout(r, Math.min(adminFails, 6) * 1500));
  let ok = false;
  try {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(pass), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: new TextEncoder().encode(ADMIN_SALT), iterations: 600000, hash: "SHA-256" }, key, 256);
    const hex = Array.from(new Uint8Array(bits)).map(x => x.toString(16).padStart(2, "0")).join("");
    ok = email === RECEIVER_EMAIL && hex === ADMIN_HASH;
  } catch (e) {}
  if (ok) {
    adminFails = 0;
    adminUnlocked = true;
    document.getElementById("adminPassInput").value = "";
    document.getElementById("adminLoginView").classList.add("hidden");
    document.getElementById("adminDashboardView").classList.remove("hidden");
  } else {
    adminFails++;
    alert("Access denied. Check the email and password.");
  }
}

function saveAdminNumbers() {
  appState.souls = document.getElementById("editSouls").value;
  appState.bibles = document.getElementById("editBibles").value;
  appState.villages = document.getElementById("editVillages").value;
  appState.missionaries = document.getElementById("editMissionaries").value;
  appState.confReg = parseInt(document.getElementById("editConfReg").value) || 0;
  appState.confMax = parseInt(document.getElementById("editConfMax").value) || 200;
  appState.bankName = document.getElementById("editBankName").value;
  appState.acctNum = document.getElementById("editAcctNum").value.trim();
  appState.acctName = document.getElementById("editAcctName").value.trim() || appState.acctName;
  appState.paystackLink = document.getElementById("editPaystack").value.trim();
  appState.stripeLink = document.getElementById("editStripe").value.trim();
  appState.cryptoWallet = document.getElementById("editWallet").value.trim();
  appState.cryptoNetwork = document.getElementById("editNetwork").value.trim();
  const badLink = [appState.paystackLink, appState.stripeLink].find(u => u && !isHttp(u));
  saveContent(); renderPublishStatus();
  alert(DRAFT_SAVED_MSG + (badLink ? "\n\nNote: a payment link must start with https:// or it will not show." : ""));
}

function addNewVideo() {
  const title = document.getElementById("newVidTitle").value.trim();
  const url = document.getElementById("newVidUrl").value.trim();
  if (!title || !url) return alert("Please enter title and YouTube URL.");
  const id = youtubeId(url);
  if (!id) return alert("That does not look like a YouTube link. Copy the link from the YouTube Share button.");
  appState.videos = appState.videos || [];
  appState.videos.unshift({ title, embed: `https://www.youtube.com/embed/${id}` });
  document.getElementById("newVidTitle").value = ""; document.getElementById("newVidUrl").value = "";
  saveContent(); renderAdminManage(); renderPublishStatus();
  alert(DRAFT_SAVED_MSG);
}

function renderAdminSubmissions() {
  const box = document.getElementById("adminSubmissionsTable");
  if (!appState.submissions.length) {
    box.innerHTML = `<p class="text-gray-500">No form registrations logged in this browser session yet.</p>`;
    return;
  }
  box.innerHTML = appState.submissions.map(s => `
    <div class="bg-stsCard p-3 rounded border border-black/10 flex flex-col sm:flex-row justify-between gap-2">
      <div>
        <strong class="text-stsRed">${esc(s.type)}</strong> <span class="text-gray-500">(${esc(s.date)})</span>
        <div class="text-gray-700 mt-1 break-words">${esc(JSON.stringify(Object.assign({}, s.details, { screenshot: undefined })))}</div>
        ${s.details && safeImg(s.details.screenshot) ? `<img src="${esc(safeImg(s.details.screenshot))}" class="mt-2 max-h-40 rounded border border-black/10" alt="Giving screenshot">` : ""}
      </div>
      <button onclick="deleteSubmission('${esc(String(s.id))}')" class="text-xs font-bold text-stsRed self-start">Delete</button>
    </div>
  `).join('');
}

function exportAllLogsToEmail() {
  const body = encodeURIComponent(JSON.stringify(appState.submissions, null, 2));
  window.location.href = `mailto:${RECEIVER_EMAIL}?subject=STS%20Ministry%20Registrations%20Export&body=${body}`;
}

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") { closeLightbox(); closeAccountModal(); closeHookModal(); closeEventModal(); closePartnerModal(); }
  const lightboxOpen = !document.getElementById("galleryLightbox").classList.contains("hidden");
  if (lightboxOpen && ev.key === "ArrowLeft") stepLightbox(-1);
  if (lightboxOpen && ev.key === "ArrowRight") stepLightbox(1);
});

// ---------- Content manager: catalog + events (add, edit, delete, pictures) ----------
let editCat = -1, editEv = -1;
const LINK_OK = u => /^(https?:|mailto:)/i.test(u) ? u : "";
async function pickImage(urlId, fileId, old) {
  const f = document.getElementById(fileId).files[0];
  if (f) { try { return await fileToResizedDataUrl(f); } catch (e) { alert("That picture could not be read."); } }
  return document.getElementById(urlId).value.trim() || old || "";
}
function resetCatForm() { editCat = -1; ["cTitle", "cDesc", "cImgUrl", "cImgFile"].forEach(id => document.getElementById(id).value = ""); document.getElementById("catFormTitle").textContent = "2. Catalog: Add, Edit or Delete a Card"; }
function resetEvForm() { editEv = -1; ["eTitle", "eDate", "ePlace", "eDesc", "eLink", "eImgUrl", "eImgFile"].forEach(id => document.getElementById(id).value = ""); document.getElementById("evFormTitle").textContent = "3. Events: Create, Edit or Delete"; }
async function saveCatalogItem() {
  if (!adminUnlocked) return alert("Admin login required.");
  const title = document.getElementById("cTitle").value.trim(), desc = document.getElementById("cDesc").value.trim();
  if (!title || !desc) return alert("Please enter a title and a description.");
  const old = editCat >= 0 ? appState.catalog[editCat] : null;
  const img = await pickImage("cImgUrl", "cImgFile", old && old.img) || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80";
  const item = { title, category: document.getElementById("cType").value, img, desc };
  if (old) appState.catalog[editCat] = item; else appState.catalog.unshift(item);
  resetCatForm(); saveContent(); renderPublishStatus(); alert(DRAFT_SAVED_MSG);
}
function editCatalogItem(i) {
  if (!adminUnlocked) return;
  const c = appState.catalog[i]; editCat = i;
  document.getElementById("cTitle").value = c.title; document.getElementById("cDesc").value = c.desc;
  document.getElementById("cType").value = c.category; document.getElementById("cImgUrl").value = /^data:/.test(c.img) ? "" : c.img;
  document.getElementById("catFormTitle").textContent = "Editing: " + c.title + " (leave picture empty to keep it)";
  document.getElementById("cTitle").scrollIntoView({ behavior: "smooth", block: "center" });
}
function deleteCatalogItem(i) {
  if (!adminUnlocked || !confirm("Delete this catalog card?")) return;
  appState.catalog.splice(i, 1); resetCatForm(); saveContent(); renderPublishStatus();
}
async function saveEventItem() {
  if (!adminUnlocked) return alert("Admin login required.");
  const title = document.getElementById("eTitle").value.trim(), date = document.getElementById("eDate").value.trim();
  if (!title || !date) return alert("Please enter the event name and date.");
  appState.events = appState.events || [];
  const old = editEv >= 0 ? appState.events[editEv] : null;
  const ev = { title, date, place: document.getElementById("ePlace").value.trim(), desc: document.getElementById("eDesc").value.trim(), link: document.getElementById("eLink").value.trim(), img: await pickImage("eImgUrl", "eImgFile", old && old.img) };
  if (ev.link && !LINK_OK(ev.link)) return alert("The registration link must start with https://");
  if (old) appState.events[editEv] = ev; else appState.events.push(ev);
  resetEvForm(); saveContent(); renderPublishStatus(); alert(DRAFT_SAVED_MSG);
}
function editEventItem(i) {
  if (!adminUnlocked) return;
  const e = appState.events[i]; editEv = i;
  document.getElementById("eTitle").value = e.title; document.getElementById("eDate").value = e.date; document.getElementById("ePlace").value = e.place || "";
  document.getElementById("eDesc").value = e.desc || ""; document.getElementById("eLink").value = e.link || ""; document.getElementById("eImgUrl").value = /^data:/.test(e.img || "") ? "" : (e.img || "");
  document.getElementById("evFormTitle").textContent = "Editing: " + e.title + " (leave picture empty to keep it)";
  document.getElementById("eTitle").scrollIntoView({ behavior: "smooth", block: "center" });
}
function deleteEventItem(i) {
  if (!adminUnlocked || !confirm("Delete this event?")) return;
  appState.events.splice(i, 1); resetEvForm(); saveContent(); renderPublishStatus();
}
function renderAdminContent() {
  const row = (img, label, edit, del, i) => `<div class="flex items-center gap-3 bg-stsCard border border-black/10 rounded-lg p-2">${safeImg(img) ? `<img src="${esc(safeImg(img))}" alt="" loading="lazy" class="w-12 h-12 rounded object-cover shrink-0">` : ""}<span class="flex-1 text-sm truncate">${esc(label)}</span><button type="button" onclick="${edit}(${i})" class="text-stsRed font-bold text-xs px-2">Edit</button><button type="button" onclick="${del}(${i})" class="text-gray-700 font-bold text-xs px-2">Delete</button></div>`;
  const c = document.getElementById("adminCatList"), e = document.getElementById("adminEvList");
  if (c) c.innerHTML = appState.catalog.map((x, i) => row(x.img, x.title, "editCatalogItem", "deleteCatalogItem", i)).join("") || "<p class='text-xs text-gray-500'>No catalog cards yet.</p>";
  if (e) e.innerHTML = (appState.events || []).map((x, i) => row(x.img, x.title + " · " + x.date, "editEventItem", "deleteEventItem", i)).join("") || "<p class='text-xs text-gray-500'>No events created yet.</p>";
}
function renderEvents() {
  const box = document.getElementById("customEvents"); if (!box) return;
  const list = appState.events || [];
  box.innerHTML = list.length ? `<div class="pt-4"><h3 class="font-display text-xl sm:text-2xl font-bold text-center mb-6">More Upcoming Events</h3><div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">` + list.map(e => `
    <article class="bg-stsCard border border-black/10 hover:border-stsRed transition rounded-2xl overflow-hidden flex flex-col">
      ${safeImg(e.img) ? `<img src="${esc(safeImg(e.img))}" alt="${esc(e.title)}" loading="lazy" decoding="async" class="w-full h-48 object-cover">` : ""}
      <div class="p-5 flex-1 flex flex-col gap-2">
        <span class="text-stsRed font-bold text-xs uppercase tracking-widest"><i class="fa-regular fa-calendar mr-1.5"></i>${esc(e.date)}</span>
        <h4 class="font-bold text-lg text-gray-900">${esc(e.title)}</h4>
        ${e.place ? `<p class="text-sm text-gray-500"><i class="fa-solid fa-location-dot mr-1.5"></i>${esc(e.place)}</p>` : ""}
        ${e.desc ? `<p class="text-sm text-gray-500">${esc(e.desc)}</p>` : ""}
        ${LINK_OK(e.link) ? `<a href="${esc(LINK_OK(e.link))}" target="_blank" rel="noopener" class="mt-auto inline-block text-center bg-stsRed hover:bg-red-700 text-white font-bold text-sm px-4 py-2.5 rounded-lg">Register / Learn More</a>` : ""}
      </div>
    </article>`).join("") + `</div></div>` : "";
}

// ---------- Admin guard: every admin action refuses to run until the login succeeded ----------
["saveSiteSettings","editItem","deleteItem","addMapLocation","deleteSubmission","importSiteData","saveAdminNumbers","addNewVideo","exportAllLogsToEmail","removeGalleryPhoto","addGalleryPhotos","resetSharedCounters","downloadContentJson","discardDraft","restoreLegacyBackup"].forEach(n => {
  const f = window[n];
  if (typeof f === "function") window[n] = function () { if (!adminUnlocked) return alert("Admin login required."); return f.apply(this, arguments); };
});

// ---------- Naira / Dollar amounts (rate: $1 = ₦1,400) ----------
const PLEDGES = [5, 10, 20, 50, 100, 250, 500, 1000];
const CUR_FIELDS = ["giveAmount", "pPledge", "pledgeCustom"];
const nf = n => Math.round(n).toLocaleString("en-US");
const df = n => Number(n.toFixed(2)).toLocaleString("en-US");
function moneyLabel(usd) { return CUR === "USD" ? "$" + df(usd) : "₦" + nf(usd * NGN_RATE); }
function fieldNum(usd) { return CUR === "USD" ? df(usd) : nf(usd * NGN_RATE); }
function parseField(id) {
  const t = document.getElementById(id).value, n = parseFloat(t.replace(/,/g, "").replace(/[^0-9.]/g, ""));
  if (!isFinite(n) || n <= 0) return null;
  return { n, c: /₦|ngn|naira/i.test(t) ? "NGN" : /\$|usd/i.test(t) ? "USD" : CUR };
}
function amountPair(id) {
  const p = parseField(id); if (!p) return null;
  return { c: p.c, usd: p.c === "USD" ? p.n : p.n / NGN_RATE, ngn: p.c === "NGN" ? p.n : p.n * NGN_RATE };
}
function amountText(id) {
  const a = amountPair(id); if (!a) return "";
  return a.c === "USD" ? `$${df(a.usd)} (≈ ₦${nf(a.ngn)})` : `₦${nf(a.ngn)} (≈ $${df(a.usd)})`;
}
function barHtml() { return `<span class="text-xs text-gray-500">Pay in:</span><button type="button" data-c="NGN" class="cur-btn">₦ Naira</button><button type="button" data-c="USD" class="cur-btn">$ Dollars</button>`; }
function addBar(before) {
  if (!before) return;
  const bar = document.createElement("div"); bar.className = "flex flex-wrap items-center gap-2 mb-2"; bar.innerHTML = barHtml();
  before.parentNode.insertBefore(bar, before);
  bar.querySelectorAll(".cur-btn").forEach(b => b.addEventListener("click", () => setCurrency(b.dataset.c)));
}
function attachCurrency(id, noBar) {
  const inp = document.getElementById(id); if (!inp) return;
  inp.type = "text"; inp.inputMode = "decimal"; inp.placeholder = "Enter amount";
  const host = id === "pledgeCustom" ? inp.parentNode : inp;
  if (!noBar) addBar(host);
  const eq = document.createElement("div"); eq.className = "amt-eq text-xs mt-1.5 font-bold text-stsGold"; eq.dataset.for = id;
  host.insertAdjacentElement("afterend", eq);
  inp.addEventListener("input", refreshCurrencyUI);
}
function refreshCurrencyUI() {
  document.querySelectorAll(".cur-btn").forEach(b => b.classList.toggle("on", b.dataset.c === CUR));
  document.querySelectorAll(".amt-eq").forEach(el => {
    const a = amountPair(el.dataset.for);
    el.textContent = a ? `₦${nf(a.ngn)}  =  $${df(a.usd)}   (rate: $1 = ₦${nf(NGN_RATE)})` : `Rate used: $1 = ₦${nf(NGN_RATE)}`;
  });
}
function renderAmountChips() {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set("hookChips", QUICK_AMOUNTS.map(n => chipHtml(n, "hookPick")).join(""));
  set("modalChips", QUICK_AMOUNTS.map(n => chipHtml(n, "pickAmount")).join(""));
  set("pledgeChips", pledgeChipHtml("pickPledge")); set("modalPledgeChips", pledgeChipHtml("setPledge"));
}
function setCurrency(c) {
  if (c === CUR) return;
  CUR_FIELDS.forEach(id => {
    const a = amountPair(id), el = document.getElementById(id);
    if (a && el) el.value = c === "USD" ? df(a.usd) : nf(a.ngn);
  });
  CUR = c; renderAmountChips(); refreshCurrencyUI();
}
function pledgeChipHtml(fn) {
  const cls = "text-xs font-bold bg-black/5 hover:bg-stsRed border px-3.5 py-2 rounded-full ";
  return PLEDGES.map(p => `<button type="button" onclick="${fn}(${p})" class="${cls}${p === 1000 ? "border-stsGold" : "border-black/15"}">${moneyLabel(p)}</button>`).join("") +
    `<button type="button" onclick="${fn}(0)" class="${cls}border-black/15">Other</button>`;
}
function setPledge(usd) { const i = document.getElementById("pPledge"); i.value = usd ? fieldNum(usd) : ""; i.focus(); refreshCurrencyUI(); }
function pickPledge(usd) { openPartnerModal(); setPledge(usd); }
function pledgeFromCustom() {
  if (!parseField("pledgeCustom")) return alert("Please type the amount you want to give each month.");
  openPartnerModal(); document.getElementById("pPledge").value = document.getElementById("pledgeCustom").value; refreshCurrencyUI();
}
document.addEventListener("reset", () => setTimeout(refreshCurrencyUI, 0));

// ---------- Section hubs: related sections live under one heading with tabs ----------
const HUBS = [
  { id: "hub-work", title: "Our Work & Impact", sub: "Everything we have done on the field, in one place.", tabs: [["catalog", "Outreach Catalog", "fa-images"], ["gallery", "Photo Gallery", "fa-camera"], ["videos", "Videos", "fa-circle-play"], ["gospel-map", "Gospel Map", "fa-earth-africa"]] },
  { id: "hub-give", title: "Give & Partner", sub: "Give once, or walk with us every month.", tabs: [["giving", "Give Once", "fa-heart"], ["partner", "Monthly Partner", "fa-seedling"]] }
];
function showTab(hub, id) {
  hub.querySelectorAll(".hub-panel").forEach(p => p.classList.toggle("is-off", p.id !== id));
  hub.querySelectorAll(".sts-tab").forEach(b => {
    b.classList.toggle("on", b.dataset.t === id);
    b.setAttribute("aria-selected", String(b.dataset.t === id));
  });
  if (id === "gospel-map") ensureMap();
}
function buildHubs() {
  HUBS.forEach(h => {
    const secs = h.tabs.map(t => document.getElementById(t[0])).filter(Boolean);
    if (!secs.length) return;
    const first = secs.slice().sort((a, b) => (a.compareDocumentPosition(b) & 4) ? -1 : 1)[0];
    const hub = document.createElement("div");
    hub.id = h.id; hub.className = "sts-hub bg-stsObsidian border-b border-black/10";
    hub.innerHTML = `<div class="sts-hub-head"><span class="text-stsRed font-bold text-xs uppercase tracking-widest">Explore</span><h2 class="font-display text-2xl sm:text-4xl font-bold mt-1">${h.title}</h2><p class="text-gray-500 text-sm mt-2">${h.sub}</p></div>` +
      `<div class="sts-tabs"><div class="sts-tabs-in" role="tablist" aria-label="${h.title}">${h.tabs.map(t => `<button type="button" role="tab" aria-controls="${t[0]}" class="sts-tab" data-t="${t[0]}"><i class="fa-solid ${t[2]} mr-1.5" aria-hidden="true"></i>${t[1]}</button>`).join("")}</div></div>`;
    first.parentNode.insertBefore(hub, first);
    secs.forEach(s => { s.classList.add("hub-panel"); hub.appendChild(s); });
    hub.querySelectorAll(".sts-tab").forEach(b => b.addEventListener("click", () => { showTab(hub, b.dataset.t); window.scrollTo({ top: hub.offsetTop - 90, behavior: "smooth" }); }));
    showTab(hub, h.tabs[0][0]);
  });
}
function goTo(hash) {
  const el = document.getElementById(hash.slice(1));
  if (!el) return false;
  const p = el.closest(".hub-panel");
  if (p) showTab(p.closest(".sts-hub"), p.id);
  setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 40);
  return true;
}
document.addEventListener("click", ev => {
  const a = ev.target.closest('a[href^="#"]');
  if (!a) return;
  const h = a.getAttribute("href");
  if (h.length < 2 || h === ADMIN_ROUTE) return;
  if (goTo(h)) { ev.preventDefault(); history.replaceState(null, "", h); }
});

// ---------- Dialog behaviour: focus, keyboard and scroll lock for every popup ----------
// Watches each .sts-modal: when one opens, focus moves into it and the page behind stops
// scrolling; when it closes, focus returns to the button that opened it.
const openModals = [];
function focusables(el) {
  return [...el.querySelectorAll('a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
    .filter(x => x.offsetParent !== null || x === document.activeElement);
}
function setupModals() {
  document.querySelectorAll(".sts-modal").forEach(m => {
    let opener = null;
    new MutationObserver(() => {
      const isOpen = !m.classList.contains("hidden");
      const i = openModals.indexOf(m);
      if (isOpen && i === -1) {
        opener = document.activeElement;
        openModals.push(m);
        setTimeout(() => { const f = focusables(m)[0]; if (f) f.focus({ preventScroll: true }); }, 30);
      } else if (!isOpen && i !== -1) {
        openModals.splice(i, 1);
        if (opener && document.contains(opener) && typeof opener.focus === "function") opener.focus({ preventScroll: true });
      }
      document.documentElement.classList.toggle("modal-open", openModals.length > 0);
    }).observe(m, { attributes: true, attributeFilter: ["class"] });
  });
  // Keep Tab inside the top dialog.
  document.addEventListener("keydown", ev => {
    if (ev.key !== "Tab" || !openModals.length) return;
    const list = focusables(openModals[openModals.length - 1]);
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  });
  // Clicking the dark backdrop closes the simple popups (not forms someone is typing in).
  [["hookPopupModal", closeHookModal], ["accountModal", closeAccountModal]].forEach(([id, close]) => {
    const m = document.getElementById(id);
    if (m) m.addEventListener("click", ev => { if (ev.target === m) close(); });
  });
  // Cards that act as buttons (giving purposes, partner pictures) also work with Enter and Space.
  document.addEventListener("keydown", ev => {
    const el = ev.target;
    if ((ev.key === "Enter" || ev.key === " ") && el.matches && el.matches('[role="button"]:not(button):not(a)')) {
      ev.preventDefault(); el.click();
    }
  });
}

// Fills every <span data-ngn="10"> with the Naira value of that many dollars, so the
// copy always matches the exchange rate in config.js.
function paintNairaPrices() {
  document.querySelectorAll("[data-ngn]").forEach(el => { el.textContent = "₦" + nf(Number(el.dataset.ngn) * NGN_RATE); });
}

// Shows the admin, and only the admin, that the page includes unpublished edits.
function paintDraftBadge() {
  let b = document.getElementById("draftBadge");
  if (!adminDraft) { if (b) b.remove(); return; }
  if (!b) {
    b = document.createElement("a");
    b.id = "draftBadge"; b.href = ADMIN_ROUTE;
    b.className = "fixed right-3 bottom-3 z-[56] bg-stsGold text-black text-xs font-extrabold px-3 py-2 rounded-full shadow-lg";
    b.textContent = "DRAFT PREVIEW: unpublished changes (only you see this)";
    document.body.appendChild(b);
  }
}

async function initSite() {
  const fy = document.getElementById("footerYear");
  if (fy) fy.textContent = new Date().getFullYear();
  setupModals();
  buildHubs();
  ["hookChips", "modalChips", "pledgeChips"].forEach(id => addBar(document.getElementById(id)));
  CUR_FIELDS.forEach(id => attachCurrency(id, id === "pledgeCustom"));
  renderAmountChips(); refreshCurrencyUI(); paintNairaPrices();
  updateCountdowns();
  setInterval(updateCountdowns, 1000);
  await loadPublishedContent();
  renderAllUI();
  paintDraftBadge();
  highlightGivingCards(document.getElementById("giveCategoryInput").value);
  refreshSharedCounts();
  if (location.hash && location.hash !== ADMIN_ROUTE) setTimeout(() => goTo(location.hash), 300);
  if (TEST_MODE) {
    const tb = document.createElement("div");
    tb.textContent = "TEST RUN: nothing here is final";
    tb.style.cssText = "position:fixed;left:10px;bottom:10px;z-index:55;background:#E8B923;color:#111;font:700 11px system-ui,sans-serif;padding:6px 10px;border-radius:999px;pointer-events:none;box-shadow:0 2px 8px rgba(0,0,0,.4)";
    document.body.appendChild(tb);
  }
  // Backend quick-jump menu
  const dash = document.getElementById("adminDashboardView");
  if (dash) {
    const nav = document.createElement("div");
    nav.className = "sticky top-0 z-20 bg-stsCard/95 backdrop-blur border-b border-black/10 -mx-1 px-1 py-2 flex gap-2 overflow-x-auto";
    dash.querySelectorAll("h3").forEach(h => {
      h.style.scrollMarginTop = "64px";
      const label = h.textContent.replace(/^\s*\d+b?\.\s*/, "").split(":")[0].replace(/&amp;/g, "&");
      const b = document.createElement("button"); b.type = "button";
      b.className = "shrink-0 text-xs font-bold bg-black/5 hover:bg-stsRed hover:text-white border border-black/15 px-3 py-1.5 rounded-full";
      b.textContent = label.length > 28 ? label.slice(0, 26) + "…" : label;
      b.onclick = () => h.scrollIntoView({ behavior: "smooth", block: "start" });
      nav.appendChild(b);
    });
    dash.insertBefore(nav, dash.firstChild);
  }
  // Backend must open even if something else on the page fails to load
  const openIfAdmin = () => { if (location.hash === ADMIN_ROUTE) { try { openAdminModal(); } catch (e) { console.warn(e); } } };
  window.addEventListener("hashchange", openIfAdmin);
  if (location.hash === ADMIN_ROUTE) openIfAdmin(); else maybeShowWelcome();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initSite); else initSite();
