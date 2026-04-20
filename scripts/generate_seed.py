#!/usr/bin/env python3
"""Genereer seed.ndjson voor Sanity dataset import — Foubert Cleaning.

Elk document = één regel JSON. Array items moeten een _key (uniek) hebben.
"""

import json
import secrets
from pathlib import Path


def k():
    """Genereer korte random _key voor array items."""
    return secrets.token_hex(6)


# ---------- PROJECTS ----------
projects = [
    {
        "_id": "project-01-mechelen",
        "_type": "project",
        "title": "Herenwoning — Mechelen",
        "category": "particulier",
        "serviceType": "Gevelramen, kozijnen & rolluiken",
        "location": "Mechelen",
        "year": "2025",
        "mediaType": "beforeAfter",
        "order": 1,
    },
    {
        "_id": "project-02-duffel",
        "_type": "project",
        "title": "Nieuwbouw — Duffel",
        "category": "particulier",
        "serviceType": "Eerste reiniging na oplevering",
        "location": "Duffel",
        "year": "2025",
        "mediaType": "single",
        "order": 2,
    },
    {
        "_id": "project-03-antwerpen",
        "_type": "project",
        "title": "Winkelpui — Antwerpen",
        "category": "zakelijk",
        "serviceType": "Periodiek onderhoud winkelpui",
        "location": "Antwerpen",
        "year": "2025",
        "mediaType": "single",
        "order": 3,
    },
    {
        "_id": "project-04-kontich",
        "_type": "project",
        "title": "Rijwoning — Kontich",
        "category": "particulier",
        "serviceType": "Ramen & rolluiken",
        "location": "Kontich",
        "year": "2025",
        "mediaType": "single",
        "order": 4,
    },
    {
        "_id": "project-05-mechelen-kantoor",
        "_type": "project",
        "title": "Kantoor — Mechelen",
        "category": "zakelijk",
        "serviceType": "Kantoorgebouw, maandelijks contract",
        "location": "Mechelen",
        "year": "2025",
        "mediaType": "single",
        "order": 5,
    },
    {
        "_id": "project-06-lier",
        "_type": "project",
        "title": "Villa — Lier",
        "category": "particulier",
        "serviceType": "Ramen, veranda & dakramen",
        "location": "Lier",
        "year": "2025",
        "mediaType": "single",
        "order": 6,
    },
    {
        "_id": "project-07-aartselaar",
        "_type": "project",
        "title": "Showroom — Aartselaar",
        "category": "zakelijk",
        "serviceType": "Showroom glaspartijen",
        "location": "Aartselaar",
        "year": "2025",
        "mediaType": "single",
        "order": 7,
    },
    {
        "_id": "project-08-boom",
        "_type": "project",
        "title": "Appartement — Boom",
        "category": "particulier",
        "serviceType": "Ramen & terrasdeuren",
        "location": "Boom",
        "year": "2025",
        "mediaType": "single",
        "order": 8,
    },
]


# ---------- FAQ ITEMS ----------
def rich_text(text):
    """Zet een string om naar een Portable Text block."""
    return [
        {
            "_type": "block",
            "_key": k(),
            "style": "normal",
            "markDefs": [],
            "children": [
                {"_type": "span", "_key": k(), "text": text, "marks": []}
            ],
        }
    ]


faq_items = [
    {
        "_id": "faq-01-hoogte",
        "_type": "faqItem",
        "question": "Werk je ook op hoogte?",
        "answer": rich_text(
            "Ja, tot ongeveer drie verdiepingen werk ik met een telescopische wisser en ontzout water — snel, veilig en zonder sporen achter te laten. Voor hogere gebouwen maken we op aanvraag afspraken met het juiste materieel."
        ),
        "order": 1,
    },
    {
        "_id": "faq-02-regen",
        "_type": "faqItem",
        "question": "Wat als het regent op de afgesproken dag?",
        "answer": rich_text(
            "Lichte regen is geen probleem — ontzout water spoelt schoon op. Bij aanhoudend slecht weer verplaats ik de afspraak; je krijgt dan de avond ervoor bericht en we zoeken samen een nieuwe datum."
        ),
        "order": 2,
    },
    {
        "_id": "faq-03-snelheid",
        "_type": "faqItem",
        "question": "Hoe snel kan je komen?",
        "answer": rich_text(
            "Voor de meeste opdrachten plan ik binnen één tot twee weken. Heb je een dringende vraag — bezoek, verkoop, evenement? Bel gerust, dan schuif ik waar het kan."
        ),
        "order": 3,
    },
    {
        "_id": "faq-04-ontzout-water",
        "_type": "faqItem",
        "question": "Werk je met ontzout water?",
        "answer": rich_text(
            "Ja. Ontzout water voorkomt kalkstrepen en droogt streeploos op. Geen afdroogmiddelen, geen chemie — gewoon zuiver water en vakmanschap."
        ),
        "order": 4,
    },
    {
        "_id": "faq-05-prijs",
        "_type": "faqItem",
        "question": "Wat kost een reiniging?",
        "answer": rich_text(
            "De prijs hangt af van grootte, bereikbaarheid en staat van de ramen. Stuur één of twee foto's via WhatsApp of mail — ik stuur je een vaste prijs binnen 24 uur terug. Offerte aanvragen is altijd gratis en vrijblijvend."
        ),
        "order": 5,
    },
    {
        "_id": "faq-06-contract",
        "_type": "faqItem",
        "question": "Kan ik een vast onderhoudscontract afsluiten?",
        "answer": rich_text(
            "Zeker. Voor particulieren plan ik graag een vast ritme — twee, drie of vier keer per jaar, afhankelijk van wat je wil. Voor bedrijven werk ik met op maat gemaakte onderhoudscontracten per maand of kwartaal."
        ),
        "order": 6,
    },
]


# ---------- SITE SETTINGS ----------
site_settings = {
    "_id": "siteSettings",
    "_type": "siteSettings",
    "siteName": "Foubert Cleaning",
    "tagline": "Glashelder vakmanschap in Duffel en omstreken",
    "phone": "0475 22 33 10",
    "phoneInternational": "+32475223310",
    "whatsappNumber": "32475223310",
    "email": "info@foubertcleaning.be",
    "address": {
        "street": "Meertsveldstraat 68",
        "postalCode": "2570",
        "city": "Duffel",
        "country": "België",
    },
    "socials": [
        {"_key": k(), "_type": "social", "platform": "facebook", "url": "https://facebook.com/foubertcleaning"},
        {"_key": k(), "_type": "social", "platform": "instagram", "url": "https://instagram.com/foubertcleaning"},
    ],
    "siteUrl": "https://foubertcleaning.be",
    "defaultSeo": {
        "_type": "seo",
        "metaTitle": "Foubert Cleaning — Glazenwasserij Duffel & Mechelen",
        "metaDescription": "Vakkundig reinigen van ramen, rolluiken, kozijnen en garagepoorten. Eén vakman, vaste prijs, offerte binnen 24u. Actief in Duffel, Mechelen, Antwerpen en omstreken.",
        "keywords": [
            "glazenwasser Duffel",
            "glazenwasser Mechelen",
            "ramen wassen",
            "rolluiken reinigen",
            "kozijnen reinigen",
        ],
        "noIndex": False,
    },
    "localBusiness": {
        "_type": "localBusiness",
        "businessName": "Foubert Cleaning",
        "description": "Glazenwasserij in Duffel. Professioneel reinigen van ramen, rolluiken, kozijnen en garagepoorten voor particulieren en bedrijven.",
        "priceRange": "€€",
        "serviceArea": [
            "Duffel", "Mechelen", "Antwerpen", "Lier", "Kontich", "Boom",
            "Rumst", "Kapellen", "Schelle", "Aartselaar", "Hemiksem",
            "Mortsel", "Edegem", "Wilrijk", "Willebroek", "Puurs",
            "Sint-Katelijne-Waver", "Bonheiden", "Heist-op-den-Berg",
            "Nijlen", "Berchem",
        ],
        "openingHours": [
            {"_key": k(), "days": "Mo-Fr", "opens": "08:00", "closes": "17:30"},
            {"_key": k(), "days": "Sa", "opens": "09:00", "closes": "13:00"},
        ],
    },
}


# ---------- HOMEPAGE ----------
homepage = {
    "_id": "homepage",
    "_type": "homepage",
    "seo": {
        "_type": "seo",
        "metaTitle": "Foubert Cleaning — Glashelder vakmanschap in Duffel en omstreken",
        "metaDescription": "Vakkundig reinigen van ramen, rolluiken, kozijnen en garagepoorten. Eén vakman, vaste prijs, offerte binnen 24u. Actief in Duffel, Mechelen, Antwerpen en omstreken.",
        "keywords": ["glazenwasser Duffel", "ramen wassen Mechelen", "glazenwasserij Antwerpen"],
        "noIndex": False,
    },
    "sections": [
        # HERO
        {
            "_key": k(),
            "_type": "heroBlock",
            "eyebrow": "Glazenwasserij — Duffel & omstreken",
            "titleLine1": "Glashelder",
            "titleLine2": "vakmanschap.",
            "subtitle": "Ramen, rolluiken, kozijnen en garagepoorten — vakkundig gereinigd door één man met oog voor detail. Vraag je gratis offerte aan in minder dan 60 seconden.",
            "ctas": [
                {
                    "_key": k(),
                    "_type": "cta",
                    "label": "Stuur foto via WhatsApp",
                    "style": "primary",
                    "linkType": "whatsapp",
                    "phone": "+32475223310",
                },
                {
                    "_key": k(),
                    "_type": "cta",
                    "label": "Bel direct",
                    "style": "outline",
                    "linkType": "tel",
                    "phone": "+32475223310",
                },
            ],
            "footLeftLabel": "Gevestigd",
            "footLeftValue": "Duffel — BE",
            "footRightLabel": "Actief sinds",
            "footRightValue": "Foubert Cleaning",
        },
        # ABOUT
        {
            "_key": k(),
            "_type": "aboutBlock",
            "eyebrow": "Over Marlon",
            "statement": [
                {"_key": k(), "_type": "line", "text": "Eén vakman.", "accent": False},
                {"_key": k(), "_type": "line", "text": "Eén aanspreekpunt.", "accent": False},
                {"_key": k(), "_type": "line", "text": "Eén eindresultaat.", "accent": True},
            ],
            "paragraphs": [
                "Ik ben Marlon Foubert. Geen team, geen onderaannemers — ik doe het zelf, elke ruit. Van particuliere woningen tot zakelijke puien: ik reinig zoals ik het zelf zou willen zien thuis.",
                "Werken met ontzout water voor een streeploos resultaat, materialen die ik zelf zou kopen, en de tijd nemen om het juist te doen — ook in de hoekjes waar niemand kijkt.",
            ],
            "signatureName": "Marlon Foubert",
            "signatureRole": "Oprichter · Foubert Cleaning, Duffel",
            "portraitLabel": "Portret · Marlon aan het werk",
        },
        # FOR WHO
        {
            "_key": k(),
            "_type": "forWhoBlock",
            "eyebrow": "Diensten",
            "title": "Voor wie werkt Foubert Cleaning?",
            "intro": "Van gezinswoning tot winkelpand — elk project verdient dezelfde aandacht. Hieronder een overzicht van wat ik doe.",
            "cards": [
                {
                    "_key": k(),
                    "_type": "forWhoCard",
                    "number": "01 · Particulier",
                    "title": "Voor uw woning",
                    "description": "Eenmalig, periodiek of seizoensgebonden — ik reinig met de zorg die u verwacht van iemand die bij u thuis komt.",
                    "services": [
                        "Ramen binnen & buiten",
                        "Rolluiken & kozijnen",
                        "Garagepoorten",
                        "Spiegels & glaspartijen",
                        "Dakramen & veranda's",
                    ],
                    "cta": {
                        "_type": "cta",
                        "label": "Offerte voor woning",
                        "style": "outline",
                        "linkType": "anchor",
                        "anchor": "contact",
                    },
                },
                {
                    "_key": k(),
                    "_type": "forWhoCard",
                    "number": "02 · Zakelijk",
                    "title": "Voor uw pand",
                    "description": "Winkelpuien, kantoren, showrooms — professioneel onderhoud op afspraak of in een vast periodiek schema dat past bij uw werking.",
                    "services": [
                        "Winkelpuien & etalages",
                        "Kantoorgebouwen",
                        "Showrooms & garages",
                        "Periodiek onderhoud",
                        "Na-renovatie reinigingen",
                    ],
                    "cta": {
                        "_type": "cta",
                        "label": "Offerte voor bedrijf",
                        "style": "outline",
                        "linkType": "anchor",
                        "anchor": "contact",
                    },
                },
            ],
        },
        # PORTFOLIO
        {
            "_key": k(),
            "_type": "portfolioBlock",
            "eyebrow": "Werk in beeld",
            "title": "Show, don't tell.",
            "intro": "Een selectie recente projecten. Sleep de oranje balk op het eerste project om het verschil te zien.",
            "featuredProject": {"_type": "reference", "_ref": "project-01-mechelen"},
            "projects": [
                {"_key": k(), "_type": "reference", "_ref": "project-02-duffel"},
                {"_key": k(), "_type": "reference", "_ref": "project-03-antwerpen"},
                {"_key": k(), "_type": "reference", "_ref": "project-04-kontich"},
                {"_key": k(), "_type": "reference", "_ref": "project-05-mechelen-kantoor"},
                {"_key": k(), "_type": "reference", "_ref": "project-06-lier"},
                {"_key": k(), "_type": "reference", "_ref": "project-07-aartselaar"},
                {"_key": k(), "_type": "reference", "_ref": "project-08-boom"},
            ],
        },
        # PROCESS
        {
            "_key": k(),
            "_type": "processBlock",
            "eyebrow": "Werkwijze",
            "title": "Zo simpel werkt het.",
            "intro": "Geen offertes die weken blijven hangen. Geen verborgen kosten. Van eerste contact tot schone ramen in drie stappen.",
            "steps": [
                {
                    "_key": k(),
                    "_type": "processStep",
                    "number": "01",
                    "title": "Stuur een foto.",
                    "description": "Via WhatsApp, mail of het formulier hieronder. Eén foto van de gevel of het pand is vaak genoeg.",
                    "tag": "WhatsApp · mail · formulier",
                },
                {
                    "_key": k(),
                    "_type": "processStep",
                    "number": "02",
                    "title": "Offerte binnen 24u.",
                    "description": "Ik stuur je een vaste prijs per mail. Geen verrassingen achteraf, geen kleine lettertjes.",
                    "tag": "Vaste prijs · transparant",
                },
                {
                    "_key": k(),
                    "_type": "processStep",
                    "number": "03",
                    "title": "Plannen & uitvoeren.",
                    "description": "We kiezen een datum die past. Ik doe het werk, jij betaalt pas na afloop. Zo hoort het.",
                    "tag": "Betalen na afloop",
                },
            ],
        },
        # AREA
        {
            "_key": k(),
            "_type": "areaBlock",
            "eyebrow": "Werkgebied",
            "title": "Waar ik werk.",
            "intro": "Vanuit Duffel rijd ik tot 45 minuten in alle richtingen. Twijfel je of ik bij jou kom? Stuur een bericht.",
            "cities": [
                {"_key": k(), "_type": "city", "name": "Duffel", "emphasis": "primary"},
                {"_key": k(), "_type": "city", "name": "Mechelen", "emphasis": "strong"},
                {"_key": k(), "_type": "city", "name": "Antwerpen", "emphasis": "strong"},
                {"_key": k(), "_type": "city", "name": "Lier", "emphasis": "strong"},
                {"_key": k(), "_type": "city", "name": "Kontich", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Boom", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Rumst", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Kapellen", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Schelle", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Aartselaar", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Hemiksem", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Mortsel", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Edegem", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Wilrijk", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Willebroek", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Puurs", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Sint-Katelijne-Waver", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Bonheiden", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Heist-op-den-Berg", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Nijlen", "emphasis": "normal"},
                {"_key": k(), "_type": "city", "name": "Berchem", "emphasis": "normal"},
            ],
            "note": "Woonplaats niet in de lijst? Bel of stuur een bericht — vaak rijd ik toch.",
        },
        # FAQ
        {
            "_key": k(),
            "_type": "faqBlock",
            "eyebrow": "Vragen",
            "title": "Veelgestelde vragen.",
            "intro": "Antwoord niet gevonden? Stuur me gerust een bericht — ik reageer meestal binnen een paar uur.",
            "items": [
                {"_key": k(), "_type": "reference", "_ref": "faq-01-hoogte"},
                {"_key": k(), "_type": "reference", "_ref": "faq-02-regen"},
                {"_key": k(), "_type": "reference", "_ref": "faq-03-snelheid"},
                {"_key": k(), "_type": "reference", "_ref": "faq-04-ontzout-water"},
                {"_key": k(), "_type": "reference", "_ref": "faq-05-prijs"},
                {"_key": k(), "_type": "reference", "_ref": "faq-06-contract"},
            ],
        },
        # CONTACT
        {
            "_key": k(),
            "_type": "contactBlock",
            "eyebrow": "Contact",
            "title": "Klaar voor\nschone ramen?",
            "intro": "Stuur een foto via WhatsApp, bel me rechtstreeks, of gebruik het formulier hiernaast. Je krijgt binnen 24 uur een vaste prijs — vrijblijvend en zonder kleine lettertjes.",
            "showForm": True,
            "formFinePrint": "Gratis & vrijblijvend · antwoord binnen 24u",
            "formSubmitLabel": "Offerte aanvragen",
            "useSiteSettingsMethods": True,
        },
    ],
}


# ---------- WRITE NDJSON ----------
def main():
    out_path = Path(__file__).parent.parent / "seed.ndjson"
    all_docs = [site_settings, *projects, *faq_items, homepage]
    with out_path.open("w", encoding="utf-8") as f:
        for doc in all_docs:
            f.write(json.dumps(doc, ensure_ascii=False) + "\n")
    print(f"Geschreven: {out_path} ({len(all_docs)} documenten)")


if __name__ == "__main__":
    main()
