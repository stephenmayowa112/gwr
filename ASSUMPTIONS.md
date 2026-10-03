# ASSUMPTIONS.md

## Project: Favour Ugegbe's 48-Hour French Language Marathon
### Guinness World Records Attempt — Longest Language Lesson

1. **Target Timezone & Time Calculation**:
   - Timezone: `Africa/Lagos` (WAT, UTC+1).
   - Official marathon start: Friday, 30 October 2026 at 18:00 WAT.
   - Milestone 26h (current record): Saturday, 31 October 2026 at 20:00 WAT.
   - Final bell 48h (new record): Sunday, 1 November 2026 at 18:00 WAT.
   - The countdown and live hour counter are strictly computed against UTC+1 / Lagos time regardless of the user's browser local timezone.

2. **Environment & Architecture**:
   - The runtime environment in Google AI Studio is a Vite + React 19 + TypeScript SPA with Tailwind CSS.
   - To provide the complete full-stack experience in both this preview container and standard Vercel/Next.js/Node deployments:
     - An isomorphic database service (`src/services/store.ts`) runs persistently in-browser using `localStorage` preloaded with the official Prisma seed data.
     - The Prisma schema (`prisma/schema.prisma`) and seed script (`prisma/seed.ts`) are provided for production PostgreSQL (Supabase/Neon) and Next.js / Node deployments.
     - Express backend route structure is documented and compatible for full-stack deployments.

3. **Admin Authentication**:
   - Default credentials for local testing and demonstration:
     - Email: `admin@ugegbegwr.com`
     - Password: `marathon2026`
   - Secure token session is stored in session storage/cookies with logout functionality and unauthorized route guards.

4. **Guinness World Records Verification Rules**:
   - Based on official GWR standard rules for endurance teaching/lecturing marathons:
     - 5 minutes of accumulated rest break permitted for every completed continuous hour of teaching.
     - Two independent timekeepers and two independent specialist witnesses on duty at all times, rotating on 4-hour shifts.
     - Continuous, uninterrupted multi-angle audio/video recording with visible running timecode.
     - Official lesson logbook logging lesson syllabus, attendance, and student interaction.
     - Clearly marked placeholders are provided for any supplementary sponsor or GWR adjudicator specifics.

5. **Design Tokens & Palettes**:
   - Default palette: **Palette 1: Lagos Emerald & Warm Gold** (Forest/Emerald green #064E3B / #022C22, Warm trophy gold #D97706 / #F59E0B, Off-white canvas #FAF8F5).
   - Alternate palette: **Palette 2: National Heritage & Champagne** (Pine #0B3B24, Crisp White #FFFFFF, Champagne Gold #E5A93C, Slate #0F172A).
   - User can switch between both palettes via the palette selector in the footer or theme toggle.
