# Foubert Cleaning — Sanity CMS

Een kant-en-klare Sanity Studio voor **foubertcleaning.be** met drag-and-drop
page builder, 12 inhoudsblokken en volledige SEO-ondersteuning.

---

## 🚀 Snel starten (10 minuten)

### 1. Maak een Sanity-project aan

Ga naar [sanity.io/manage](https://www.sanity.io/manage) en maak een nieuw
project aan. Je krijgt een **Project ID** (iets zoals `ab12cd34`). Noteer deze.

### 2. Installeer en configureer

```bash
# In deze map:
npm install

# Kopieer .env.example naar .env en vul je Project ID in
cp .env.example .env
# Open .env en zet SANITY_STUDIO_PROJECT_ID=jouwprojectid
```

### 3. Log in bij Sanity

```bash
npx sanity login
```

### 4. Importeer de placeholder-content

Dit laadt alle teksten van de huidige HTML in het CMS, inclusief 8 projecten
en 6 FAQ-items:

```bash
npm run seed
```

> ⚠️ De `--replace` flag in het seed-script overschrijft bestaande documenten
> met dezelfde ID. Gebruik dit alleen bij eerste setup of als je bewust alles
> wil resetten.

### 5. Start het CMS

```bash
npm run dev
```

Ga naar `http://localhost:3333` — je ziet de studio met alle content al ingevuld.

### 6. Deploy het CMS (optioneel — zodat Marlon er online aan kan)

```bash
npm run deploy
```

Je studio komt online op `https://foubert-cleaning.sanity.studio` (of een
andere studioHost die je kiest in `sanity.cli.ts`).

---

## 📦 Wat zit erin?

### Singletons (1 per site)

- **Homepage** — één document met een `sections`-array. Hier sleep je blokken
  in de volgorde die je wil.
- **Site-instellingen** — globale info: logo, contact, socials, standaard SEO,
  en structured data (Schema.org) voor lokale SEO.

### Herbruikbare documenten

- **Projecten** — portfolio-items. Ondersteunt enkele foto of voor/na
  vergelijking. Wordt gekoppeld aan het Portfolio-blok.
- **Veelgestelde vragen** — losse vraag/antwoord-paren. Wordt gekoppeld
  aan het FAQ-blok.

### Blokken voor de homepage (12 stuks)

Elk blok kan je toevoegen, verslepen, of verwijderen. Meerdere instanties van
hetzelfde blok zijn toegestaan (bv. twee tekstblokken achter elkaar).

| Blok | Omschrijving |
|---|---|
| **Hero** | Grote openingssectie met titel, subtitel en call-to-actions |
| **Over-blok** | Verhaal over Marlon met statement, paragrafen en portret |
| **Voor-wie-blok** | Twee (of drie) kaarten voor particulier/zakelijk met diensten-lijst |
| **Portfolio-blok** | Selectie van projecten, met één featured (voor/na-slider) |
| **Werkwijze-blok** | 3 stappen (uitbreidbaar tot 5) met nummering |
| **Servicegebied-blok** | Lijst gemeenten met prominentie-niveau per gemeente |
| **FAQ-blok** | Selectie vragen uit de FAQ-bibliotheek |
| **Contact-blok** | Contactformulier + methodes uit Site-instellingen |
| **Reviews-blok** | Voor wanneer reviews binnenkomen (leeg standby) |
| **Tekst-blok** | Vrije rich text sectie voor ad-hoc content |
| **Afbeelding-blok** | Grote featured image met caption |
| **CTA-band** | Smalle opvallende band met één sterke actie-oproep |

---

## 🎨 Hoe de homepage aanpassen?

1. Open **Homepage** in de studio
2. Onder "Inhoudsblokken" zie je alle blokken op volgorde
3. **Slepen** om volgorde aan te passen (3-lijntjes icoon links)
4. **Klik op een blok** om te bewerken
5. **Plus-knop onderaan** om een nieuw blok toe te voegen
6. **Prullenbak-icoon** om een blok te verwijderen
7. **"Publish"** rechtsonder om wijzigingen live te zetten

---

## 🔍 SEO-setup

De site is gebouwd op Google's best practices voor lokale SEO:

1. **Per-pagina SEO** — onder Homepage → tab "SEO"
   - Meta title (max 65 tekens)
   - Meta description (max 170 tekens)
   - Focus-zoekwoorden
   - Deel-afbeelding (Open Graph voor WhatsApp/Facebook/LinkedIn)

2. **Site-brede SEO** — onder Site-instellingen → tab "Standaard SEO"
   - Fallback waardes wanneer pagina-specifieke velden leeg zijn
   - Site URL voor canonical tags

3. **Structured data (Schema.org)** — onder Site-instellingen → "Structured data"
   - LocalBusiness-markup voor Google Maps en rich snippets
   - Servicegebied (gemeenten)
   - Openingsuren
   - Coördinaten

---

## 🔗 Integratie met Next.js

De frontend wordt een aparte Next.js-app die content uit deze Sanity
database haalt. De essentie:

```bash
# In je Next.js project:
npm install @sanity/client @sanity/image-url next-sanity
```

```typescript
// lib/sanity.ts
import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
})
```

```typescript
// GROQ query voor de homepage met alle blokken
const HOMEPAGE_QUERY = `*[_type == "homepage"][0]{
  seo,
  sections[]{
    _type,
    _key,
    ...,
    // Dereference projecten in portfolioBlock
    _type == "portfolioBlock" => {
      ...,
      featuredProject->,
      projects[]->
    },
    // Dereference FAQ items
    _type == "faqBlock" => {
      ...,
      items[]->
    }
  }
}`
```

Dan in de page:

```tsx
const data = await client.fetch(HOMEPAGE_QUERY)
return (
  <main>
    {data.sections.map(section => {
      switch (section._type) {
        case 'heroBlock': return <Hero key={section._key} {...section} />
        case 'aboutBlock': return <About key={section._key} {...section} />
        // ... etc
      }
    })}
  </main>
)
```

---

## 📁 Bestandsstructuur

```
foubert-cms/
├── sanity.config.ts          # Hoofdconfig
├── sanity.cli.ts              # CLI config (deploy target)
├── tsconfig.json
├── package.json
├── seed.ndjson                # Placeholder-content (gegenereerd)
├── scripts/
│   └── generate_seed.py       # Genereert seed.ndjson
├── structure/
│   └── deskStructure.ts       # Linker menu van de studio
└── schemas/
    ├── index.ts               # Exports alle types
    ├── objects/               # Herbruikbare velden
    │   ├── seo.ts
    │   ├── cta.ts
    │   └── localBusiness.ts
    ├── documents/             # Herbruikbare content
    │   ├── project.ts
    │   └── faqItem.ts
    ├── singletons/            # Eenmalige documenten
    │   ├── homepage.ts
    │   └── siteSettings.ts
    └── blocks/                # Homepage-blokken
        ├── heroBlock.ts
        ├── aboutBlock.ts
        ├── forWhoBlock.ts
        ├── portfolioBlock.ts
        ├── processBlock.ts
        ├── areaBlock.ts
        ├── faqBlock.ts
        ├── contactBlock.ts
        ├── reviewsBlock.ts
        ├── textBlock.ts
        ├── imageBlock.ts
        └── ctaBandBlock.ts
```

---

## 🛠️ Veelvoorkomende taken

### Nieuw project toevoegen
Inhoud → Projecten → `+` rechtsboven. Vul titel, categorie en foto's in.
Voeg het project dan toe aan het Portfolio-blok op de homepage.

### Nieuwe FAQ toevoegen
Inhoud → Veelgestelde vragen → `+`. Voeg daarna toe aan het FAQ-blok.

### Een nieuw blok bouwen
1. Maak een bestand `schemas/blocks/jouwBlok.ts` volgens hetzelfde patroon
2. Importeer in `schemas/index.ts`
3. Voeg toe aan de `of: [...]` array in `schemas/singletons/homepage.ts`
4. Bouw de bijbehorende React-component in Next.js

### Seed opnieuw draaien (bv. na schema-wijzigingen)
```bash
python3 scripts/generate_seed.py  # hergenereer als je placeholders aanpaste
npm run seed                       # importeer naar Sanity
```

---

## 📞 Content-gegevens (nu al in het CMS)

- **Telefoon**: 0475 22 33 10
- **E-mail**: info@foubertcleaning.be
- **Adres**: Meertsveldstraat 68, 2570 Duffel
- **Domein**: foubertcleaning.be
- **8 projecten** met placeholder-info
- **6 FAQ-items** uit de huidige HTML
- **21 gemeenten** in het servicegebied
- **Volledige homepage** met 8 ingevulde blokken (Hero → Contact)

Foto's moeten nog toegevoegd worden — de slots staan klaar.
