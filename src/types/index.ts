import { z } from 'zod';

export type AttendanceType = 'in_person' | 'online';
export type EventStatus = 'upcoming' | 'live' | 'completed' | 'attempt-ended';
export type InquiryStatus = 'new' | 'replied';

// Registration Schema with Zod
export const RegistrationSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name (minimum 2 characters)'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(7, 'Please provide a valid phone or WhatsApp number with country code'),
  attendeesCount: z.coerce.number().int().min(1, 'Minimum 1 attendee').max(10, 'Maximum 10 attendees per registration pass'),
  attendanceType: z.enum(['in_person', 'online'] as const, {
    message: 'Please choose whether attending in person or online'
  }),
  hearAbout: z.string().trim().optional(),
  consent: z.boolean().refine(val => val === true, 'You must agree to the event communications and attendance guidelines'),
  // Honeypot field for bot/spam prevention
  websiteTrap: z.string().max(0, 'Bot submission rejected').optional(),
});

export type RegistrationFormData = z.infer<typeof RegistrationSchema>;

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  attendeesCount: number;
  attendanceType: AttendanceType;
  hearAbout?: string;
  consent: boolean;
  ticketCode: string;
  qrCodeDataUrl: string;
  checkedIn: boolean;
  checkedInAt?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
  updatedAt: string;
}

// Partner Inquiry Schema with Zod
export const PartnerInquirySchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  organization: z.string().trim().min(2, 'Organisation name is required'),
  email: z.string().trim().email('Valid email is required'),
  tierInterest: z.enum([
    'Headline / Title Partner',
    'Cultural & Education Partner',
    'Community & Youth Supporter',
    'Custom In-Kind / Venue Support',
  ]),
  message: z.string().trim().min(10, 'Please share a brief note on your organisation or interest'),
  websiteTrap: z.string().max(0, 'Spam blocked').optional(),
});

export type PartnerInquiryFormData = z.infer<typeof PartnerInquirySchema>;

export interface PartnerInquiry {
  id: string;
  name: string;
  organization: string;
  email: string;
  tierInterest: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

// Press Request Schema with Zod
export const PressRequestSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  outlet: z.string().trim().min(2, 'Media outlet or platform name is required'),
  role: z.string().trim().min(2, 'Your role (journalist, photographer, broadcast producer, etc.) is required'),
  email: z.string().trim().email('Valid email is required'),
  coverageType: z.enum([
    'Broadcast & Television',
    'Print & Newspaper',
    'Digital / Online Media',
    'Radio / Podcast',
    'Photojournalism & Documentary',
  ]),
  notes: z.string().trim().optional(),
  websiteTrap: z.string().max(0, 'Spam blocked').optional(),
});

export type PressRequestFormData = z.infer<typeof PressRequestSchema>;

export interface PressRequest {
  id: string;
  name: string;
  outlet: string;
  role: string;
  email: string;
  coverageType: string;
  notes?: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

// Live Update Schema & Type
export const LiveUpdateSchema = z.object({
  title: z.string().trim().min(2, 'Title is required'),
  message: z.string().trim().min(5, 'Update text is required'),
  milestoneHour: z.coerce.number().optional().nullable(),
  isPinned: z.boolean().default(false),
});

export interface LiveUpdate {
  id: string;
  title: string;
  message: string;
  milestoneHour?: number | null;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// Daily French Phrase
export interface DailyPhrase {
  id: string;
  french: string;
  english: string;
  phonetic: string;
  context: string;
  dateStr: string;
  createdAt: string;
}

// FAQ Item
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Event Config Singleton
export interface EventConfig {
  id: string;
  status: EventStatus;
  officialStartTime: string; // ISO String (2026-10-30T18:00:00+01:00)
  youtubeUrl: string;
  hourOverride: number | null;
  venueCapacity: number;
  waitlistActive: boolean;
  resultOutcome: string;
}

// Admin User
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}
