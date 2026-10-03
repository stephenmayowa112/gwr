# Favour Ugegbe's 48-Hour French Language Marathon

Official web application and event portal for **Favour Chisimdi Ugegbe's 48-Hour French Language Marathon** — an accredited Guinness World Records™ attempt for the longest language lesson, hosted at **Landmark Centre, Victoria Island, Lagos, Nigeria** (30 October – 1 November 2026).

---

## Event Source of Truth & Facts

- **Challenger:** Favour Chisimdi Ugegbe (Nigerian polyglot speaking 11 languages: 9 foreign, 2 Nigerian).
- **Target Record:** 48 Hours of continuous French teaching (Guinness World Records).
- **Current Standing Record:** 26 Hours.
- **Venue:** Landmark Centre, Plot 2 & 3 Water Corporation Drive, Victoria Island, Lagos, Nigeria.
- **Admission:** 100% Free Public Admission.
- **Timezone:** `Africa/Lagos` (WAT, UTC+1).
  - **Fri 30 Oct 2026, 10:00–15:00 WAT:** The Send-Off (music, comedy, spoken word, French).
  - **Fri 30 Oct 2026, 18:00 WAT:** The Clock Starts (official commencement).
  - **Sat 31 Oct 2026, ~20:00 WAT:** Hour 26 reached (current record falls).
  - **Sun 1 Nov 2026, 18:00 WAT:** Hour 48 final bell (new world record achieved).
- **Social Handles:** `@UGEGBEGWR` (Instagram, X, TikTok, YouTube).
- **Email:** `info@ugegbegwr.com`.
- **Official Hashtags:** `#UgegbeGWR` `#FavourUgegbe` `#FrenchLanguageMarathon`.

---

## Features & Pages

1. **Home (`/`):** Exact verbatim editorial narrative from official brief, live countdown synced to Africa/Lagos (WAT), record-comparison visual (26h vs 48h bar, "+22 hours beyond the mark"), schedule timeline preview, and "Be part of the story" portal cards.
2. **Register (`/register`):** Full registration form with Zod validation, honeypot bot defense, UTM attribution tracking, duplicate email prevention, and immediate QR pass generator with print and calendar download.
3. **Schedule (`/schedule`):** Four key moments with direct `.ics` download and Google Calendar links, plus the "come for 10 minutes or 10 hours" visitor notice.
4. **Live Broadcast Portal (`/live`):**
   - **Upcoming State:** Real-time countdown to WAT start time.
   - **Live State:** Running hour counter, dual progress bars (toward Hour 26 and Hour 48), YouTube livestream embed, and live updates feed with 30-second polling without full page reload.
   - **Post-Event State:** Automatic switch to results and verification gallery.
5. **About Favour (`/favour`):** Biography, 11 languages breakdown (9 foreign, 2 Nigerian), quotes, and photo slots.
6. **Verification (`/verification`):** Guinness World Records rules (timekeepers, independent witnesses, continuous recording, logbooks, and 5-min/hour accumulated rest breaks).
7. **Visit & FAQ (`/visit`):** Landmark Lagos venue directions, map links, transport/parking, accessibility, visitor policies (children & cameras welcome), and accordion FAQ with FAQPage structured data.
8. **Share (`/share`):** Daily French phrase with Web Speech audio pronunciation, high-resolution canvas social share cards (1080x1080 square and 1080x1920 story format), and one-click WhatsApp/X sharing.
9. **Partner (`/partner`):** Why partner, audience projections, three sponsorship tiers, downloadable brief, and partner inquiry form.
10. **Press & Media (`/press`):** Boilerplate, fact sheet, downloadable media kit, and press accreditation application.
11. **Legal (`/privacy` & `/terms`):** NDPR (Nigeria Data Protection Regulation) aware policy.
12. **Admin Operations Portal (`/admin`):**
    - Searchable & filterable registrations table with CSV export.
    - Mobile-friendly QR check-in terminal with double check-in prevention.
    - Live broadcast control panel (phase switcher, YouTube URL, running hour override).
    - Content editor (daily phrase, FAQs).
    - Inboxes for partner and press inquiries.
    - Real-time analytics (UTM sources, in-person vs online ratio).

---

## Local Setup & Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## Admin Credentials (Test Access)

- Navigate to `/admin`
- Password: `marathon2026` (or `ugegbe2026`)

---

## How to Run a Mock Event Test

1. **Test Registration Flow:**
   - Go to `/register`.
   - Submit a test registration (e.g. `Adaobi Eze`, `adaobi@example.com`, 2 guests).
   - Verify that your ticket pass displays a generated QR code and ticket code (e.g. `UGB-2026-ADxxxx`).
   - Click **Add to Calendar (.ics)** to verify calendar download.
   - Re-submit the same email with 4 guests to verify duplicate prevention updates the existing record.

2. **Test QR Check-in Terminal:**
   - Copy the ticket code from your pass.
   - Go to `/admin`, select the **QR Check-in Station** tab.
   - Paste the ticket code and click **Verify Ticket**.
   - Verify that the terminal marks the ticket as checked in.
   - Enter the same ticket code a second time to verify **Double check-in prevented!** message with original timestamp.

3. **Test Live Phase State Changes:**
   - Go to `/admin` → **Live Broadcast & Feed** tab.
   - Change **Event Phase Status** to `Live`.
   - Set **Running Hour Display Override** to `26.5`.
   - Click **Save Live Configuration**.
   - Navigate to `/live` and observe that Milestone 1 displays **RECORD BROKEN! ✓** with active hour counters and progress bars.
   - Return to `/admin` and change status to `Completed` to observe the post-event victory screen.

---

## Deployment Steps (Vercel & PostgreSQL)

1. **Database Setup:**
   - Create a PostgreSQL database on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
   - Set `DATABASE_URL` in your environment variables.
   - Run `npx prisma db push` and `npx tsx prisma/seed.ts`.

2. **Vercel Deployment:**
   - Push your repository to GitHub.
   - Import the project into [Vercel](https://vercel.com).
   - Add environment variables from `.env.example` in Vercel project settings.
   - Deploy.
