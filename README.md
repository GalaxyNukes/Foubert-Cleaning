# Foubert Cleaning — Website & CMS

Complete technische stack voor [foubertcleaning.be](https://foubertcleaning.be) —
een glazenwasserij in Duffel. Bestaat uit drie onderdelen:

| Folder | Doel | Tech |
|---|---|---|
| `prototype/` | Statisch HTML-prototype (design-referentie) | HTML + CSS + JS |
| `cms/` | Sanity Studio met drag-and-drop page builder | Sanity v3, TypeScript |
| `web/` | Productie-website die Sanity-data consumeert | Next.js 15, TypeScript |

## Architectuur

```
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│  Marlon bewerkt  │       │  Sanity dataset  │       │  Next.js site    │
│  via Studio  ────┼──────►│  (cloud)      ◄──┼───────┤  ISR 60s rebuild │
│  (cms/)          │       │                  │       │  (web/)          │
└──────────────────┘       └──────────────────┘       └──────────────────┘
                                                             │
                                                             ▼
                                                   foubertcleaning.be
```

## Snelstart

### 1. Sanity Studio opzetten

```bash
cd cms
npm install
cp .env.example .env
# Maak een nieuw project op sanity.io/manage, vul projectId in in .env
npx sanity login
npm run seed           # importeert alle placeholder-content
npm run dev            # studio draait op localhost:3333
```

Lees verder: [cms/README.md](./cms/README.md)

### 2. Next.js site opzetten

```bash
cd web
npm install
cp .env.example .env.local
# Zet NEXT_PUBLIC_SANITY_PROJECT_ID (zelfde als in Sanity Studio)
npm run dev            # site draait op localhost:3000
```

Lees verder: [web/README.md](./web/README.md)

### 3. Prototype bekijken

```bash
cd prototype
# Open index.html rechtstreeks in de browser
```

## Ontwikkelworkflow

**Content-wijzigingen** (tekst, foto's, blokvolgorde):
1. Marlon opent de Studio (online op `foubert-cleaning.sanity.studio`)
2. Wijzigt content, drukt Publish
3. Binnen 60s zichtbaar op de live site — geen code-deploy nodig

**Code-wijzigingen** (design, nieuwe blokken, functionaliteit):
1. Aanpassen in `web/` en/of `cms/`
2. Voor nieuwe blokken: schema in `cms/schemas/blocks/`, component in `web/src/components/blocks/`, toevoegen aan `SectionRenderer.tsx`
3. Push naar GitHub → Vercel deploy (auto) + `npm run deploy` voor CMS

## Deployment

- **Sanity Studio**: `cd cms && npm run deploy` → komt online op `*.sanity.studio`
- **Next.js site**: Connect GitHub-repo aan Vercel, auto-deploy bij elke push
- **DNS**: foubertcleaning.be → Vercel

## Technologische keuzes (rationale)

- **Sanity** ipv WordPress/Webflow: echte structured content, versie-controle,
  TypeScript-types, drag-and-drop page builder, gratis tier ruim voldoende
- **Next.js 15** ipv Astro: mixte SSR/ISR aanpak is ideaal voor content-driven
  sites met dynamische backend (contactformulier, toekomstige features)
- **Server Components** als default, Client Components alleen voor interactiviteit:
  maximaal SEO-vriendelijk, minimaal JavaScript naar de browser

## Volgende stappen

- [ ] Form-handler kiezen (Resend / Formspree / Sanity-opslag)
- [ ] Echte foto's shooten en uploaden (shotlist in Studio-placeholders)
- [ ] Mobile nav-menu (hamburger) afwerken
- [ ] Google Analytics of Plausible toevoegen
- [ ] Domein koppelen en live zetten

## Vercel deployment (belangrijke configuratie)

Deze repo is een **monorepo** met 3 projecten. Vercel moet weten dat
alleen `web/` de Next.js-app is.

**Optie A — Code-based (automatisch via `vercel.json`):**
De `vercel.json` in de repo-root regelt dit al. Vercel zal automatisch
in `web/` bouwen.

**Optie B — Dashboard-based (als backup):**
In Vercel → Project Settings → General → "Root Directory" → zet op `web`.

Vergeet niet deze environment variables te zetten:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SITE_URL` = `https://foubertcleaning.be`
