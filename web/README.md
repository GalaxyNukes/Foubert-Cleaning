# Foubert Cleaning — Next.js Frontend

Production-klare Next.js 15 (App Router) site die content uit Sanity haalt.
Rendert alle blokken die in het CMS geconfigureerd zijn.

## Setup (5 min)

```bash
npm install
cp .env.example .env.local
# Vul NEXT_PUBLIC_SANITY_PROJECT_ID in (zelfde als in Sanity Studio)
npm run dev
```

Site draait op `http://localhost:3000`. Elk blok dat je in Sanity toevoegt,
versleept of verwijdert verschijnt hier binnen 60 seconden (ISR revalidate).

## Stack

- **Next.js 15** App Router + ISR (`revalidate = 60`)
- **Sanity** via `@sanity/client` en `next-sanity`
- **Google Fonts**: Bricolage Grotesque + Geist (zelfde als prototype)
- **Server Components** voor SEO — client components alleen voor interactiviteit
  (FAQ accordion, before/after slider, contact-formulier)

## Bestandsstructuur

```
src/
├── app/
│   ├── globals.css          # Alle design tokens + block styles
│   ├── layout.tsx           # Root layout + fonts + interactieve scripts
│   ├── page.tsx             # Homepage: haalt Sanity data, rendert secties, JSON-LD
│   └── sitemap.ts           # SEO sitemap
├── sanity/
│   ├── client.ts            # Sanity client + GROQ queries
│   └── types.ts             # TypeScript types voor alle blokken
├── lib/
│   └── cta.ts               # CTA href/target resolution
├── components/
│   ├── SectionRenderer.tsx  # Router: switch op _type
│   ├── shared/
│   │   ├── Chrome.tsx       # Nav + Footer (uit siteSettings)
│   │   └── Interactive.tsx  # CtaLink + reveal observer + scroll nav
│   └── blocks/
│       ├── HeroAboutForWho.tsx
│       ├── Portfolio.tsx           # Met werkende before/after slider
│       ├── ProcessAreaFaqReviews.tsx
│       └── ContactRemaining.tsx    # Contact + Text + Image + CtaBand
└── public/
    └── logo/                # Fallback logo's (voor als Sanity leeg is)
```

## SEO

- **Metadata** uit `homepage.seo` met fallback naar `siteSettings.defaultSeo`
- **JSON-LD** `LocalBusiness` schema uit `siteSettings.localBusiness` — geeft
  Google alle info voor rich snippets en Maps (naam, adres, servicegebied,
  openingsuren, coördinaten, socials).
- **Open Graph** tags voor WhatsApp/Facebook/LinkedIn shares
- **Sitemap** op `/sitemap.xml`
- **robots.txt** op `/robots.txt`
- **Canonical URL** via `metadataBase`

## Contactformulier

Het formulier werkt visueel maar stuurt nog niets. Drie opties voor backend:

1. **Resend + API route** (aanbevolen — gratis tot 100/dag):
   ```bash
   npm install resend
   ```
   Maak `src/app/api/contact/route.ts` aan.

2. **Formspree** (geen code — gewoon `action="https://formspree.io/f/..."`)

3. **Sanity webhook** (opslaan in Sanity dataset, notificeren via email)

Laat me weten welke je wil — dan bouw ik die stap.

## Deployen

```bash
# Vercel (aanbevolen — gratis tier volstaat ruim):
npm install -g vercel
vercel

# Of via Vercel dashboard: connect GitHub repo, zet env vars, done.
```

Zet deze environment variables in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET=production`
- `NEXT_PUBLIC_SITE_URL=https://foubertcleaning.be`

## Integratie met het CMS

De Next.js site en de Sanity Studio zijn twee aparte projecten die
dezelfde dataset delen. Workflow:

1. Marlon bewerkt content in Sanity Studio (online op `foubert-cleaning.sanity.studio`)
2. Hij klikt "Publish"
3. Binnen 60 seconden haalt de live Next.js site de nieuwe data op (ISR)
4. Geen rebuild nodig — content-updates zijn realtime zonder deploy
