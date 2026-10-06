# Security Specification: Ugegbe 48-Hour Marathon Backend

## 1. Data Invariants

1. **Default Deny**: All unspecified paths and collections are completely closed to read and write.
2. **Public Read-Only Collections**: `eventConfig`, `liveUpdates`, `dailyPhrases`, and `faqs` can be read by any public visitor, but can only be modified, created, or deleted by authenticated administrators (`isAdmin()`).
3. **Public Submission Integrity**:
   - `registrations`: Any public user can create a registration document, but MUST provide valid schema attributes (`fullName`, `email`, `phone`, `attendeesCount`, `attendanceType`, `ticketCode`). Unchecked arbitrary fields are rejected. Newly submitted registrations MUST have `checkedIn == false`.
   - `partnerInquiries`: Any public partner can submit an inquiry. Must strictly validate fields. Newly submitted inquiries MUST have `status == 'new'`.
   - `pressRequests`: Any public press member can submit an accreditation request. Newly submitted requests MUST have `status == 'new'`.
4. **PII and Confidentiality Protection**:
   - `partnerInquiries` and `pressRequests` contain contact information and proposals; reading or querying these collections is strictly restricted to `isAdmin()`.
5. **Check-In & Admin Privilege Gates**:
   - Only administrators (`isAdmin()`) can mark a ticket as checked in or update ticket status, preventing attendees from self-validating their entry passes.
   - Only administrators can post live updates, modify event countdown timers, alter FAQ lists, or review attendee rosters.
6. **Administrator Identity Invariant**:
   - Admin rights require authentication and either presence in `/admins/$(request.auth.uid)` or verified match with the owner email `stephenmayowa112@gmail.com`.

---

## 2. The "Dirty Dozen" Threat Payloads

1. **Payload 1 (Shadow Field in Registration)**: An attacker injects `vipPass: true` or `role: 'admin'` into `registrations`.
   - *Expected Result*: PERMISSION_DENIED (Strict key validation rejects non-whitelisted keys).
2. **Payload 2 (Pre-Checked-In Ticket)**: An attacker sets `checkedIn: true` during registration creation to bypass the Landmark Centre gate scanner.
   - *Expected Result*: PERMISSION_DENIED (`checkedIn` must be `false` on creation).
3. **Payload 3 (Oversized Payload / Denial of Wallet)**: An attacker submits a `fullName` or `notes` containing a 2MB string.
   - *Expected Result*: PERMISSION_DENIED (Enforced `.size() <= maxLength` bounds on all strings).
4. **Payload 4 (Unauthenticated Live Update Post)**: An unauthenticated client attempts to insert or modify `liveUpdates`.
   - *Expected Result*: PERMISSION_DENIED (Must satisfy `isAdmin()`).
5. **Payload 5 (Unauthenticated Event Config Tampering)**: An attacker attempts to set `eventConfig/global.status = 'completed'` or alter `officialStartTime`.
   - *Expected Result*: PERMISSION_DENIED (Requires `isAdmin()`).
6. **Payload 6 (Unauthorized Partner Inquiry Peeking)**: A regular user or unauthenticated client attempts to list or read documents in `partnerInquiries`.
   - *Expected Result*: PERMISSION_DENIED (Confidential inquiry data read restricted to `isAdmin()`).
7. **Payload 7 (Unauthorized Press Accreditation Peeking)**: An unauthenticated visitor attempts to read `/pressRequests`.
   - *Expected Result*: PERMISSION_DENIED (Media contacts restricted to `isAdmin()`).
8. **Payload 8 (Self-Elevating Admin Role)**: An authenticated non-admin attempts to create a document in `/admins/{uid}` pointing to themselves.
   - *Expected Result*: PERMISSION_DENIED (Write to `/admins` is forbidden to client SDKs).
9. **Payload 9 (Ticket Code Tampering on Update)**: An attendee attempts to change their `ticketCode` or `id` post-registration.
   - *Expected Result*: PERMISSION_DENIED (Immutable field enforcement `incoming().ticketCode == existing().ticketCode`).
10. **Payload 10 (Path Poisoning / Giant ID Attack)**: An attacker uses a 1KB junk-character document ID in registration path.
    - *Expected Result*: PERMISSION_DENIED (`isValidId(id)` constraint).
11. **Payload 11 (Invalid Attendance Type Enum)**: An attacker sets `attendanceType: 'free_vip_all_access'`.
    - *Expected Result*: PERMISSION_DENIED (`attendanceType in ['in_person', 'online']`).
12. **Payload 12 (Negative or Excessive Attendees Count)**: An attacker submits `attendeesCount: 99999` or `-5`.
    - *Expected Result*: PERMISSION_DENIED (`attendeesCount >= 1 && attendeesCount <= 5`).
