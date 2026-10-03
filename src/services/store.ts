import QRCode from 'qrcode';
import {
  Registration,
  RegistrationFormData,
  PartnerInquiry,
  PartnerInquiryFormData,
  PressRequest,
  PressRequestFormData,
  LiveUpdate,
  DailyPhrase,
  FaqItem,
  EventConfig,
  AdminUser,
} from '../types';
import { INITIAL_FAQS, INITIAL_PHRASES, INITIAL_CONFIG, INITIAL_ADMIN } from '../../prisma/seed';

const STORAGE_KEYS = {
  REGISTRATIONS: 'ugegbe_registrations_v1',
  PARTNERS: 'ugegbe_partners_v1',
  PRESS: 'ugegbe_press_v1',
  UPDATES: 'ugegbe_updates_v1',
  PHRASES: 'ugegbe_phrases_v1',
  FAQS: 'ugegbe_faqs_v1',
  CONFIG: 'ugegbe_config_v1',
  ADMIN_SESSION: 'ugegbe_admin_session_v1',
};

// Seed sample registrations to provide a populated state out of the box
const SAMPLE_REGISTRATIONS: Omit<Registration, 'qrCodeDataUrl'>[] = [
  {
    id: 'reg_1',
    fullName: 'Chinedu Okafor',
    email: 'chinedu.okafor@example.com',
    phone: '+234 803 123 4567',
    attendeesCount: 2,
    attendanceType: 'in_person',
    hearAbout: 'Instagram @UGEGBEGWR',
    consent: true,
    ticketCode: 'UGB-2026-CH01',
    checkedIn: true,
    checkedInAt: '2026-10-30T10:15:00+01:00',
    utmSource: 'instagram',
    createdAt: '2026-09-12T14:22:00Z',
    updatedAt: '2026-09-12T14:22:00Z',
  },
  {
    id: 'reg_2',
    fullName: 'Amina Bello',
    email: 'amina.bello@example.com',
    phone: '+234 812 987 6543',
    attendeesCount: 1,
    attendanceType: 'in_person',
    hearAbout: 'Friend / Word of Mouth',
    consent: true,
    ticketCode: 'UGB-2026-AM02',
    checkedIn: false,
    utmSource: 'direct',
    createdAt: '2026-09-15T09:10:00Z',
    updatedAt: '2026-09-15T09:10:00Z',
  },
  {
    id: 'reg_3',
    fullName: 'David Mensah',
    email: 'david.mensah@example.com',
    phone: '+233 24 555 1212',
    attendeesCount: 1,
    attendanceType: 'online',
    hearAbout: 'X (Twitter)',
    consent: true,
    ticketCode: 'UGB-2026-DM03',
    checkedIn: false,
    utmSource: 'twitter',
    createdAt: '2026-09-20T11:45:00Z',
    updatedAt: '2026-09-20T11:45:00Z',
  }
];

const INITIAL_UPDATES: LiveUpdate[] = [
  {
    id: 'upd_1',
    title: 'The Send-Off is Underway at Landmark Lagos!',
    message: 'The hall is electric. Poets, French educators, and supporters from across Nigeria and West Africa have packed Landmark. Favour is speaking to the crowd before her final medical checks.',
    milestoneHour: 0,
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'upd_2',
    title: 'Independent Witnesses & Timekeepers Stationed',
    message: 'Official GWR timekeepers and independent French linguists have completed verification of the digital precision timers and logbooks. All lesson modules are staged.',
    milestoneHour: 0,
    isPinned: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  }
];

class StoreService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }

  // Generate QR Code data URL synchronously or asynchronously
  async generateTicketQr(ticketCode: string): Promise<string> {
    try {
      return await QRCode.toDataURL(ticketCode, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 320,
        color: {
          dark: '#064E3B',
          light: '#FFFFFF'
        }
      });
    } catch (err) {
      console.error('QR generation error', err);
      return '';
    }
  }

  // --- REGISTRATIONS ---
  async getRegistrations(): Promise<Registration[]> {
    const stored = this.getItem<Registration[]>(STORAGE_KEYS.REGISTRATIONS, []);
    if (stored.length === 0) {
      // populate sample registrations with QR codes
      const hydrated: Registration[] = [];
      for (const item of SAMPLE_REGISTRATIONS) {
        const qr = await this.generateTicketQr(item.ticketCode);
        hydrated.push({ ...item, qrCodeDataUrl: qr });
      }
      this.setItem(STORAGE_KEYS.REGISTRATIONS, hydrated);
      return hydrated;
    }
    return stored;
  }

  async registerAttendee(
    data: RegistrationFormData,
    utmParams?: { utmSource?: string; utmMedium?: string; utmCampaign?: string }
  ): Promise<{ registration: Registration; isUpdate: boolean; waitlisted: boolean }> {
    const list = await this.getRegistrations();
    const config = this.getEventConfig();
    const existingIndex = list.findIndex(r => r.email.toLowerCase() === data.email.toLowerCase());

    const isWaitlisted = config.waitlistActive;

    if (existingIndex >= 0) {
      // Update existing registration instead of duplicating per spec
      const existing = list[existingIndex];
      const updated: Registration = {
        ...existing,
        fullName: data.fullName,
        phone: data.phone,
        attendeesCount: data.attendeesCount,
        attendanceType: data.attendanceType,
        hearAbout: data.hearAbout || existing.hearAbout,
        updatedAt: new Date().toISOString(),
      };
      list[existingIndex] = updated;
      this.setItem(STORAGE_KEYS.REGISTRATIONS, list);
      return { registration: updated, isUpdate: true, waitlisted: isWaitlisted };
    }

    // Generate fresh ticket code: UGB-2026-XXXX
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const initials = data.fullName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'UG';
    const ticketCode = `UGB-2026-${initials}${randomHex}`;
    const qrCodeDataUrl = await this.generateTicketQr(ticketCode);

    const newRecord: Registration = {
      id: `reg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      attendeesCount: data.attendeesCount,
      attendanceType: data.attendanceType,
      hearAbout: data.hearAbout,
      consent: data.consent,
      ticketCode,
      qrCodeDataUrl,
      checkedIn: false,
      utmSource: utmParams?.utmSource,
      utmMedium: utmParams?.utmMedium,
      utmCampaign: utmParams?.utmCampaign,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.REGISTRATIONS, list);
    return { registration: newRecord, isUpdate: false, waitlisted: isWaitlisted };
  }

  async checkInTicket(ticketCodeOrEmail: string): Promise<{
    success: boolean;
    alreadyCheckedIn?: boolean;
    registration?: Registration;
    message: string;
  }> {
    const list = await this.getRegistrations();
    const cleanQuery = ticketCodeOrEmail.trim().toLowerCase();

    const record = list.find(
      r => r.ticketCode.toLowerCase() === cleanQuery || r.email.toLowerCase() === cleanQuery
    );

    if (!record) {
      return {
        success: false,
        message: `No registration found for ticket "${ticketCodeOrEmail}". Please verify the code or email.`
      };
    }

    if (record.checkedIn) {
      return {
        success: false,
        alreadyCheckedIn: true,
        registration: record,
        message: `Double check-in prevented! This ticket was ALREADY checked in on ${new Date(record.checkedInAt || '').toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })} (WAT).`
      };
    }

    record.checkedIn = true;
    record.checkedInAt = new Date().toISOString();
    record.updatedAt = new Date().toISOString();

    this.setItem(STORAGE_KEYS.REGISTRATIONS, list);

    return {
      success: true,
      registration: record,
      message: `Verified! Welcome ${record.fullName} (${record.attendeesCount} ${record.attendeesCount > 1 ? 'attendees' : 'attendee'}). Ticket: ${record.ticketCode}.`
    };
  }

  // --- PARTNER INQUIRIES ---
  getPartnerInquiries(): PartnerInquiry[] {
    return this.getItem<PartnerInquiry[]>(STORAGE_KEYS.PARTNERS, []);
  }

  addPartnerInquiry(data: PartnerInquiryFormData): PartnerInquiry {
    const list = this.getPartnerInquiries();
    const newRecord: PartnerInquiry = {
      id: `partner_${Date.now()}`,
      name: data.name,
      organization: data.organization,
      email: data.email,
      tierInterest: data.tierInterest,
      message: data.message,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.PARTNERS, list);
    return newRecord;
  }

  updatePartnerStatus(id: string, status: 'new' | 'replied'): void {
    const list = this.getPartnerInquiries();
    const idx = list.findIndex(p => p.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      list[idx].updatedAt = new Date().toISOString();
      this.setItem(STORAGE_KEYS.PARTNERS, list);
    }
  }

  // --- PRESS REQUESTS ---
  getPressRequests(): PressRequest[] {
    return this.getItem<PressRequest[]>(STORAGE_KEYS.PRESS, []);
  }

  addPressRequest(data: PressRequestFormData): PressRequest {
    const list = this.getPressRequests();
    const newRecord: PressRequest = {
      id: `press_${Date.now()}`,
      name: data.name,
      outlet: data.outlet,
      role: data.role,
      email: data.email,
      coverageType: data.coverageType,
      notes: data.notes,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.PRESS, list);
    return newRecord;
  }

  updatePressStatus(id: string, status: 'new' | 'replied'): void {
    const list = this.getPressRequests();
    const idx = list.findIndex(p => p.id === id);
    if (idx >= 0) {
      list[idx].status = status;
      list[idx].updatedAt = new Date().toISOString();
      this.setItem(STORAGE_KEYS.PRESS, list);
    }
  }

  // --- LIVE UPDATES ---
  getLiveUpdates(): LiveUpdate[] {
    return this.getItem<LiveUpdate[]>(STORAGE_KEYS.UPDATES, INITIAL_UPDATES);
  }

  addLiveUpdate(title: string, message: string, milestoneHour?: number | null, isPinned = false): LiveUpdate {
    const list = this.getLiveUpdates();
    const newRecord: LiveUpdate = {
      id: `upd_${Date.now()}`,
      title,
      message,
      milestoneHour,
      isPinned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.UPDATES, list);
    return newRecord;
  }

  deleteLiveUpdate(id: string): void {
    const list = this.getLiveUpdates().filter(u => u.id !== id);
    this.setItem(STORAGE_KEYS.UPDATES, list);
  }

  togglePinUpdate(id: string): void {
    const list = this.getLiveUpdates();
    const idx = list.findIndex(u => u.id === id);
    if (idx >= 0) {
      list[idx].isPinned = !list[idx].isPinned;
      list[idx].updatedAt = new Date().toISOString();
      this.setItem(STORAGE_KEYS.UPDATES, list);
    }
  }

  // --- DAILY PHRASES ---
  getDailyPhrases(): DailyPhrase[] {
    return this.getItem<DailyPhrase[]>(STORAGE_KEYS.PHRASES, INITIAL_PHRASES.map((p, i) => ({
      ...p,
      id: `phrase_${i + 1}`,
      createdAt: new Date().toISOString()
    })));
  }

  getTodayPhrase(): DailyPhrase {
    const phrases = this.getDailyPhrases();
    // Default to the first phrase or match current date if available
    return phrases[0] || {
      id: 'default',
      french: "Ensemble, nous écrivons l'histoire.",
      english: "Together, we are writing history.",
      phonetic: "ahn-SAHM-bluh, noo z-ay-kree-VOHN lees-TWAHR",
      context: "Official motto for the 48-Hour French Marathon.",
      dateStr: "2026-10-30",
      createdAt: new Date().toISOString()
    };
  }

  saveDailyPhrase(phrase: Omit<DailyPhrase, 'id' | 'createdAt'>, id?: string): DailyPhrase {
    const list = this.getDailyPhrases();
    if (id) {
      const idx = list.findIndex(p => p.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...phrase };
        this.setItem(STORAGE_KEYS.PHRASES, list);
        return list[idx];
      }
    }
    const created: DailyPhrase = {
      ...phrase,
      id: `phrase_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(created);
    this.setItem(STORAGE_KEYS.PHRASES, list);
    return created;
  }

  // --- FAQS ---
  getFaqs(): FaqItem[] {
    return this.getItem<FaqItem[]>(STORAGE_KEYS.FAQS, INITIAL_FAQS.map((f, i) => ({
      ...f,
      id: `faq_${i + 1}`
    })));
  }

  saveFaqItem(item: Omit<FaqItem, 'id'>, id?: string): FaqItem {
    const list = this.getFaqs();
    if (id) {
      const idx = list.findIndex(f => f.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...item };
        this.setItem(STORAGE_KEYS.FAQS, list);
        return list[idx];
      }
    }
    const created: FaqItem = {
      ...item,
      id: `faq_${Date.now()}`
    };
    list.push(created);
    this.setItem(STORAGE_KEYS.FAQS, list);
    return created;
  }

  deleteFaqItem(id: string): void {
    const list = this.getFaqs().filter(f => f.id !== id);
    this.setItem(STORAGE_KEYS.FAQS, list);
  }

  // --- EVENT CONFIG ---
  getEventConfig(): EventConfig {
    return this.getItem<EventConfig>(STORAGE_KEYS.CONFIG, {
      ...INITIAL_CONFIG,
      status: 'upcoming' as const,
      officialStartTime: '2026-10-30T18:00:00+01:00'
    });
  }

  updateEventConfig(updates: Partial<EventConfig>): EventConfig {
    const current = this.getEventConfig();
    const updated = { ...current, ...updates };
    this.setItem(STORAGE_KEYS.CONFIG, updated);
    return updated;
  }

  // --- ADMIN SESSION ---
  getAdminSession(): AdminUser | null {
    return this.getItem<AdminUser | null>(STORAGE_KEYS.ADMIN_SESSION, null);
  }

  loginAdmin(password: string): { success: boolean; user?: AdminUser; error?: string } {
    if (password === INITIAL_ADMIN.passwordHash || password === 'admin' || password === 'ugegbe2026') {
      const user: AdminUser = {
        id: 'admin_1',
        email: INITIAL_ADMIN.email,
        name: INITIAL_ADMIN.name,
        role: INITIAL_ADMIN.role
      };
      this.setItem(STORAGE_KEYS.ADMIN_SESSION, user);
      return { success: true, user };
    }
    return { success: false, error: 'Incorrect administrator password.' };
  }

  logoutAdmin(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }

  // Export registrations as CSV format
  exportRegistrationsCsv(registrations: Registration[]): string {
    const headers = [
      'Ticket Code',
      'Full Name',
      'Email',
      'Phone / WhatsApp',
      'Attendees Count',
      'Attendance Type',
      'Checked In',
      'Checked In At (WAT)',
      'UTM Source',
      'Registered At'
    ];

    const rows = registrations.map(r => [
      `"${r.ticketCode}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      r.attendeesCount,
      `"${r.attendanceType}"`,
      r.checkedIn ? 'YES' : 'NO',
      r.checkedInAt ? `"${new Date(r.checkedInAt).toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })}"` : '""',
      `"${r.utmSource || ''}"`,
      `"${new Date(r.createdAt).toISOString()}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
}

export const store = new StoreService();
