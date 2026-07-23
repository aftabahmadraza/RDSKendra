# RDS Kendra V2 — Astro Website

## 📁 प्रोजेक्ट स्ट्रक्चर

```
rdskendra-v2/
├── .github/workflows/deploy.yml   # 🔐 GitHub Actions Auto Deploy
├── public/
│   ├── CNAME                      # Custom domain (rdskendra.co.in)
│   ├── robots.txt                 # AI bots + Sitemap
│   └── icons/                     # PWA icons (192x192, 512x512 डालें)
├── src/
│   ├── content/
│   │   ├── config.ts              # Blog schema (Zod)
│   │   └── blog/*.md              # 📄 यहाँ नए Articles Markdown में लिखें
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── RelatedArticles.astro  # 🔗 Auto Internal Linking
│   ├── layouts/
│   │   └── BaseLayout.astro       # SEO + JSON-LD + Dark mode + PWA
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── blog/index.astro       # Blog listing
│   │   ├── blog/[...slug].astro   # हर Article का page (FAQ Schema सहित)
│   │   ├── rss.xml.js             # 📰 RSS Feed
│   │   ├── tools/passport-photo.astro
│   │   └── 404.astro
│   └── styles/global.css
├── astro.config.mjs                # Sitemap, MDX, PWA, Pagefind, Tailwind
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## 🧪 अभी Testing Phase में है

- `astro.config.mjs` में `SITE_URL` अभी `https://rdskendra.pages.dev` पर सेट है (Cloudflare Pages)।
- `public/CNAME` फाइल को `CNAME.backup-for-later` नाम दे दिया है ताकि अभी custom domain
  force न हो। जब असली डोमेन (`rdskendra.co.in`) लाइव करने का समय आए:
  1. `CNAME.backup-for-later` को वापस `CNAME` नाम दें
  2. `astro.config.mjs` में `SITE_URL` को `https://rdskendra.co.in` कर दें
  3. `public/robots.txt` में Sitemap लाइन भी अपडेट करें

## 🚀 शुरू कैसे करें

```bash
npm install
npm run dev        # http://localhost:4321 पर खुलेगा
```

## 📄 नया Article कैसे जोड़ें

`src/content/blog/` में एक नई `.md` फाइल बनाएं, ऊपर मौजूद
`passport-photo-size-guide.md` जैसा frontmatter इस्तेमाल करें। Save करते ही
dev server में यह अपने आप दिखने लगेगा।

## 🔐 GitHub Actions Auto Deploy सेट करना

1. यह पूरा फोल्डर एक नए GitHub repo में push करें।
2. Repo → **Settings → Pages → Source** में "**GitHub Actions**" चुनें।
3. Repo → **Settings → Pages → Custom domain** में `rdskendra.co.in` डालें।
4. Cloudflare DNS में:
   - एक `CNAME` record: `www` → `<username>.github.io`
   - या 4 `A` records (root domain के लिए) GitHub Pages की official IPs पर:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. जैसे ही आप `main` branch में push करेंगे, `.github/workflows/deploy.yml`
   अपने आप build करके साइट को live कर देगा — किसी manual step की ज़रूरत नहीं।

## ⚙️ Domain Switch वाले दिन (Downtime-free plan)

1. V2 को अलग सबडोमेन (जैसे `v2.rdskendra.co.in`) पर पहले टेस्ट करें।
2. सब कुछ सही चलने पर, Cloudflare में मुख्य domain का DNS GitHub Pages की तरफ पॉइंट करें।
3. पुराने WordPress के हर URL से नए URL पर **301 Redirect mapping** ज़रूर बनाएं
   (यह अगला जरूरी काम है — चाहें तो अगला कदम इसी पर करते हैं)।
4. Switch के तुरंत बाद नया sitemap Google Search Console में सबमिट करें।

## 🧠 अभी के लिए placeholder / TODO

- [ ] `public/icons/icon-192.png` और `icon-512.png` असली logo से बदलें
- [ ] `public/favicon.svg` जोड़ें
- [ ] Passport Photo / PDF / Aadhaar / PAN / Bank / CSC — हर Tool को
      client-side JS (Canvas/WASM) में दोबारा बनाना होगा (WordPress plugin
      logic को यहाँ पोर्ट करना पड़ेगा)
- [ ] Google Analytics/GTM ID `Header.astro` या एक नए `Analytics.astro` में डालें
      (Partytown पहले से कॉन्फ़िगर है ताकि यह main thread को धीमा न करे)
