# TESTING.md — Quality Assurance Checklist

This checklist verifies the core operational workflows for **Favour Ugegbe's 48-Hour French Language Marathon**.

---

### 1. Registration Flow & Ticket Generation
- [ ] **Form Validation:** Visit `/register` and submit empty form; verify friendly Zod validation errors appear on Name, Email, and Phone.
- [ ] **Honeypot Bot Defense:** Verify the hidden `websiteTrap` field silently aborts automated bot submissions without affecting legitimate users.
- [ ] **Attendee Ticket Pass:** Submit valid details (`Chisimdi Test`, `test@ugegbegwr.com`, 2 guests, In Person). Verify immediate transition to official pass screen displaying:
  - High-contrast scannable QR Code generated via `qrcode` library.
  - Unique Ticket Code formatted as `UGB-2026-XXXX`.
  - Attendee name, headcount, and venue details.
- [ ] **Calendar & Directions:**
  - Click `Add to Calendar (.ics)`; verify valid RFC-5545 `.ics` file downloads.
  - Click `Google Calendar`; verify correctly pre-populated event details in UTC+1.
  - Click `Map`; verify Google Maps opens Landmark Centre, Victoria Island, Lagos.
- [ ] **Duplicate Prevention:** Re-submit registration using the same email (`test@ugegbegwr.com`) with updated headcount; verify record is updated rather than creating a duplicate entry.
- [ ] **Waitlist State:** In `/admin`, toggle `Waitlist Active`; submit in-person registration and verify waitlist notification banner.

---

### 2. QR Check-In Terminal & Double Check-In Prevention
- [ ] **Valid Ticket Verification:** In `/admin` → **QR Check-in Station**, paste a valid ticket code (e.g. `UGB-2026-CH01` or newly generated code). Click **Verify Ticket**.
  - Verify green success confirmation: `ADMISSION GRANTED`.
  - Verify attendance table reflects `Checked In: YES` with current WAT timestamp.
- [ ] **Double Check-In Guard:** Enter the exact same ticket code a second time.
  - Verify alert: `DOUBLE CHECK-IN PREVENTED!` with the exact historical check-in timestamp.
- [ ] **Invalid Code Handling:** Enter a non-existent code (e.g. `INVALID-1234`).
  - Verify error alert: `No registration found for ticket...`.

---

### 3. Countdown Timezone Correctness (Africa/Lagos WAT UTC+1)
- [ ] **Timezone Invariance:** Test countdown on devices set to different local timezones (e.g., US EST, GMT/UTC, Tokyo JST).
  - Verify countdown calculates target `2026-10-30T18:00:00+01:00` against UTC epoch time, producing identical days/hours/minutes/seconds regardless of client device timezone.
- [ ] **Tabular Numerals:** Verify timer digits use `font-mono tabular-nums` to prevent horizontal jitter as seconds tick.

---

### 4. Live Page State Transitions
- [ ] **Upcoming State:**
  - Verify countdown clock is ticking.
  - Verify live dispatches feed displays pre-event announcements and auto-refreshes every 30 seconds.
- [ ] **Live State:**
  - Set status to `Live` in `/admin`.
  - Verify running hour counter starts at `Hour 1 of 48`.
  - Verify dual progress bars toward Hour 26 and Hour 48 animate.
  - Set hour override to `26.5` in `/admin`; verify Milestone 1 changes to **RECORD BROKEN! ✓** with gold highlight.
  - Click **Send Cheer to Favour**; verify counter increments and state updates.
- [ ] **Completed / Results State:**
  - Set status to `Completed` in `/admin`.
  - Verify page transitions to **SHE DID IT** victory screen with final statistics and adjudication certificate placeholders.

---

### 5. Mobile & Responsive Layout Pass
- [ ] **Mobile Viewport (375px & 414px):**
  - Verify Top Bar hamburger menu opens and closes smoothly.
  - Verify no horizontal scrollbars on any section.
  - Verify touch targets for all buttons and tabs are $\ge 44\text{px}$.
- [ ] **Print Pass Styling:**
  - On `/register` pass screen, trigger `Print Pass`; verify navigation bar and extra buttons are hidden in print media styles.
- [ ] **Share Card Generator:**
  - On `/share`, click **Download Square Card (PNG)**; verify 1080x1080 canvas downloads.
  - Click **Download Story Card (PNG)**; verify 1080x1920 canvas downloads.
  - Click French audio pronunciation icon; verify speech synthesis speaks the French phrase clearly.
