/**
 * EmailJS Email Service
 * ---------------------
 * Sends emails directly from the browser via EmailJS.
 * No backend server, no DNS records, no Resend needed.
 *
 * SETUP (one-time, ~5 minutes):
 * 1. Go to https://www.emailjs.com and sign up (free).
 * 2. Under "Email Services", click "Add New Service" → choose Gmail/Outlook.
 *    Connect your personal email (e.g. hello@ugegbegwr.com or a Gmail).
 *    Note the SERVICE_ID (e.g. "service_xxxxxxx").
 * 3. Under "Email Templates", create a template with these variables:
 *      Subject:   {{subject}}
 *      To Email:  {{to_email}}
 *      To Name:   {{to_name}}
 *      Message:   {{message}}
 *      Reply-To:  {{reply_to}}
 *    Note the TEMPLATE_ID (e.g. "template_xxxxxxx").
 * 4. Copy your PUBLIC KEY from "Account" → "API Keys".
 * 5. Paste the three values below (or into your .env).
 *
 * Free tier: 200 emails/month, 2 email templates.
 */

import emailjs from '@emailjs/browser';

// ─── Configuration ──────────────────────────────────────────
// Replace these with your actual EmailJS credentials from https://dashboard.emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// Initialise the SDK once
let initialized = false;
function ensureInit() {
  if (!initialized) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    initialized = true;
  }
}

// ─── Types ──────────────────────────────────────────────────
export interface EmailPayload {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  reply_to?: string; // so the recipient can reply back
}

export interface EmailResult {
  success: boolean;
  error?: string;
}

// ─── Check if EmailJS is configured ────────────────────────
export function isEmailConfigured(): boolean {
  return (
    EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  );
}

// ─── Send Email ─────────────────────────────────────────────
export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  if (!isEmailConfigured()) {
    return {
      success: false,
      error:
        'EmailJS is not configured yet. Add your VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY to your .env file. See src/services/emailService.ts for setup instructions.',
    };
  }

  ensureInit();

  try {
    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: payload.to_email,
      to_name: payload.to_name,
      subject: payload.subject,
      message: payload.message,
      reply_to: payload.reply_to || 'hello@ugegbegwr.com',
    });

    if (response.status === 200) {
      return { success: true };
    }

    return { success: false, error: `Unexpected status: ${response.status}` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('EmailJS send error:', message);
    return { success: false, error: message };
  }
}

// ─── Convenience: Quick reply from admin to a registrant ───
export async function sendRegistrationReply(
  recipientEmail: string,
  recipientName: string,
  messageBody: string,
  subject?: string,
): Promise<EmailResult> {
  return sendEmail({
    to_email: recipientEmail,
    to_name: recipientName,
    subject: subject || `Ugegbe 48-Hour French Language Marathon — Message for ${recipientName}`,
    message: messageBody,
    reply_to: 'hello@ugegbegwr.com',
  });
}
