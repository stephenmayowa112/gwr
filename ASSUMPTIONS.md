# ASSUMPTIONS.md

## Project: Favour Ugegbe's 48-Hour French Language Marathon
### Guinness World Records Attempt — Longest Language Lesson

1. **Content Scope (Strict Document Alignment)**:
   - Per explicit instruction: **Only the content on the attached 7-page document is included on the website.**
   - All narrative prose, headlines, and callout sections come verbatim from Pages 1–7 of the attached document:
     - Page 1: "LANGUAGE CONNECTS US." / "THE MORE LANGUAGES WE SPEAK, THE MORE OF THE WORLD WE CAN MEET." / "LOOK AROUND NIGERIA."
     - Page 2: "Benin.Niger.Chad.Cameroon." / "SO WE ARE MAKING HISTORY IN FRENCH." / "FAVOUR UGEGBE'S 48-HOUR FRENCH LANGUAGE MARATHON"
     - Page 3: "26 HOURS." / "48 HOURS." / "BUT THIS STORY IS BIGGER THAN A RECORD."
     - Page 4: "MEET THE WOMAN WHO DECIDED TO GO FOR 48." / "FAVOUR CHISIMDI UGEGBE" / "THREE DAYS. ONE CITY. A LOT OF FRENCH."
     - Page 5: "SATURDAY · 31 OCTOBER · AROUND 8PM (HOUR 26)" / "SUNDAY · 1 NOVEMBER · 6PM (HOUR 48)" / "YOU DON’T HAVE TO SPEAK FRENCH."
     - Page 6: "BE PART OF THE STORY." (ATTEND, SHARE, PARTNER, MEDIA) / "ONE LANGUAGE. 48 HOURS. ONE EXTRAORDINARY ATTEMPT."
     - Page 7: "STAY CONNECTED" (Social handles, email, hashtags, copyright).
   - Extraneous pages, unverified tiers, and unprovided curriculum blocks were removed to ensure 100% fidelity to the document.

2. **Functional Actions (CTA Handlers)**:
   - The interactive triggers explicitly stated in brackets in the document are fully wired to lightweight, functional dialogs:
     - `[ REGISTER TO ATTEND ]` / `[ REGISTER FREE ]` / `[ BE THERE ]`: Opens the free registration pass modal, generating a scannable QR ticket (`qrcode`), unique ticket code, calendar integration (.ics & Google Calendar), and Google Maps venue link.
     - `[ WATCH THE COUNTDOWN ]`: Scrolls directly to the live countdown component computed against Africa/Lagos (WAT, UTC+1).
     - `[ DISCOVER FAVOUR’S STORY ]`: Scrolls directly to Favour's story section.
     - `[ PARTNER WITH US ]`: Opens the partnership inquiry dialog routing to `info@ugegbegwr.com`.
     - `[ PRESS & MEDIA ]`: Opens the media accreditation dialog routing to `info@ugegbegwr.com`.

3. **Timezone & Event Dates**:
   - Location: Landmark, Lagos, Nigeria. Entry is FREE.
   - Timezone: Africa/Lagos (WAT, UTC+1).
   - Countdown target: Friday, 30 October 2026 at 18:00 WAT.
