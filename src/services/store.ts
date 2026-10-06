import QRCode from 'qrcode';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
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
import {
  db,
  auth,
  signInWithGoogle,
  logOut,
  handleFirestoreError,
  OperationType,
  subscribeToAuth,
} from './firebase';

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
  },
];

const INITIAL_UPDATES: LiveUpdate[] = [
  {
    id: 'upd_1',
    title: 'The Send-Off is Underway at Landmark Lagos!',
    message:
      'The hall is electric. Poets, French educators, and supporters from across Nigeria and West Africa have packed Landmark. Favour is speaking to the crowd before her final medical checks.',
    milestoneHour: 0,
    isPinned: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'upd_2',
    title: 'Independent Witnesses & Timekeepers Stationed',
    message:
      'Official GWR timekeepers and independent French linguists have completed verification of the digital precision timers and logbooks. All lesson modules are staged.',
    milestoneHour: 0,
    isPinned: false,
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

class StoreService {
  private inMemoryRegistrations: Registration[] = [];
  private inMemoryUpdates: LiveUpdate[] = [];
  private inMemoryPartners: PartnerInquiry[] = [];
  private inMemoryPress: PressRequest[] = [];
  private inMemoryPhrases: DailyPhrase[] = [];
  private inMemoryFaqs: FaqItem[] = [];
  private inMemoryConfig: EventConfig;
  private isInitialized = false;

  constructor() {
    this.inMemoryConfig = this.getItem<EventConfig>(STORAGE_KEYS.CONFIG, {
      ...INITIAL_CONFIG,
      status: 'upcoming' as const,
      officialStartTime: '2026-10-30T18:00:00+01:00',
    });
    this.inMemoryUpdates = this.getItem<LiveUpdate[]>(STORAGE_KEYS.UPDATES, INITIAL_UPDATES);
    this.inMemoryPartners = this.getItem<PartnerInquiry[]>(STORAGE_KEYS.PARTNERS, []);
    this.inMemoryPress = this.getItem<PressRequest[]>(STORAGE_KEYS.PRESS, []);
    this.inMemoryPhrases = this.getItem<DailyPhrase[]>(
      STORAGE_KEYS.PHRASES,
      INITIAL_PHRASES.map((p, i) => ({
        ...p,
        id: `phrase_${i + 1}`,
        createdAt: new Date().toISOString(),
      }))
    );
    this.inMemoryFaqs = this.getItem<FaqItem[]>(
      STORAGE_KEYS.FAQS,
      INITIAL_FAQS.map((f, i) => ({
        ...f,
        id: `faq_${i + 1}`,
      }))
    );

    this.initFirebaseListeners();
  }

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

  // --- Real-time Firebase Sync ---
  private initFirebaseListeners() {
    if (!this.isBrowser()) return;

    // Listen to Event Config from Firestore
    const configPath = 'eventConfig';
    try {
      onSnapshot(
        doc(db, configPath, 'global'),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as EventConfig;
            this.inMemoryConfig = { ...this.inMemoryConfig, ...data };
            this.setItem(STORAGE_KEYS.CONFIG, this.inMemoryConfig);
          }
        },
        (error) => {
          console.warn('Firestore eventConfig listener:', error.message);
        }
      );
    } catch (err) {
      console.warn('Firestore config listener init error:', err);
    }

    // Listen to Live Updates in real-time
    const updatesPath = 'liveUpdates';
    try {
      onSnapshot(
        collection(db, updatesPath),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: LiveUpdate[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...(docSnap.data() as Omit<LiveUpdate, 'id'>) });
            });
            list.sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            this.inMemoryUpdates = list;
            this.setItem(STORAGE_KEYS.UPDATES, list);
          }
        },
        (error) => {
          console.warn('Firestore liveUpdates listener:', error.message);
        }
      );
    } catch (err) {
      console.warn('Firestore live updates listener init error:', err);
    }

    // Listen to Daily Phrases
    const phrasesPath = 'dailyPhrases';
    try {
      onSnapshot(
        collection(db, phrasesPath),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: DailyPhrase[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...(docSnap.data() as Omit<DailyPhrase, 'id'>) });
            });
            this.inMemoryPhrases = list;
            this.setItem(STORAGE_KEYS.PHRASES, list);
          }
        },
        (error) => {
          console.warn('Firestore dailyPhrases listener:', error.message);
        }
      );
    } catch (err) {
      console.warn('Firestore daily phrases listener init error:', err);
    }

    // Listen to FAQs
    const faqsPath = 'faqs';
    try {
      onSnapshot(
        collection(db, faqsPath),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: FaqItem[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...(docSnap.data() as Omit<FaqItem, 'id'>) });
            });
            this.inMemoryFaqs = list;
            this.setItem(STORAGE_KEYS.FAQS, list);
          }
        },
        (error) => {
          console.warn('Firestore faqs listener:', error.message);
        }
      );
    } catch (err) {
      console.warn('Firestore FAQs listener init error:', err);
    }

    // Listen to Auth State
    subscribeToAuth((user) => {
      if (user) {
        const adminEmail = user.email || '';
        const isMasterAdmin =
          adminEmail.toLowerCase() === 'stephenmayowa112@gmail.com' ||
          adminEmail.toLowerCase() === INITIAL_ADMIN.email.toLowerCase();
        const currentSession = this.getAdminSession();
        if (!currentSession && isMasterAdmin) {
          const adminUser: AdminUser = {
            id: user.uid,
            email: user.email || '',
            name: user.displayName || 'Authorized Administrator',
            role: 'ADMIN',
          };
          this.setItem(STORAGE_KEYS.ADMIN_SESSION, adminUser);
        }
      }
    });
  }

  // Generate QR Code data URL
  async generateTicketQr(ticketCode: string): Promise<string> {
    try {
      return await QRCode.toDataURL(ticketCode, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 320,
        color: {
          dark: '#064E3B',
          light: '#FFFFFF',
        },
      });
    } catch (err) {
      console.error('QR generation error', err);
      return '';
    }
  }

  // --- REGISTRATIONS ---
  async getRegistrations(): Promise<Registration[]> {
    const registrationsPath = 'registrations';
    try {
      const snap = await getDocs(collection(db, registrationsPath));
      if (!snap.empty) {
        const list: Registration[] = [];
        snap.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...(docSnap.data() as Omit<Registration, 'id'>) });
        });
        list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.inMemoryRegistrations = list;
        this.setItem(STORAGE_KEYS.REGISTRATIONS, list);
        return list;
      }
    } catch (error) {
      console.warn('Firestore getDocs registrations error, using local state:', error);
    }

    const stored = this.getItem<Registration[]>(STORAGE_KEYS.REGISTRATIONS, []);
    if (stored.length === 0) {
      const hydrated: Registration[] = [];
      for (const item of SAMPLE_REGISTRATIONS) {
        const qr = await this.generateTicketQr(item.ticketCode);
        hydrated.push({ ...item, qrCodeDataUrl: qr });
      }
      this.inMemoryRegistrations = hydrated;
      this.setItem(STORAGE_KEYS.REGISTRATIONS, hydrated);
      return hydrated;
    }
    this.inMemoryRegistrations = stored;
    return stored;
  }

  async registerAttendee(
    data: RegistrationFormData,
    utmParams?: { utmSource?: string; utmMedium?: string; utmCampaign?: string }
  ): Promise<{ registration: Registration; isUpdate: boolean; waitlisted: boolean }> {
    const list = await this.getRegistrations();
    const config = this.getEventConfig();
    const existingIndex = list.findIndex(
      (r) => r.email.toLowerCase() === data.email.toLowerCase()
    );
    const isWaitlisted = config.waitlistActive;

    if (existingIndex >= 0) {
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

      // Write update to Firebase Firestore
      const docPath = `registrations/${updated.id}`;
      try {
        await updateDoc(doc(db, 'registrations', updated.id), {
          fullName: updated.fullName,
          phone: updated.phone,
          attendeesCount: updated.attendeesCount,
          attendanceType: updated.attendanceType,
          hearAbout: updated.hearAbout || '',
          updatedAt: updated.updatedAt,
        });
      } catch (err) {
        console.warn('Firestore registration update warning:', err);
      }

      return { registration: updated, isUpdate: true, waitlisted: isWaitlisted };
    }

    // Generate fresh ticket code: UGB-2026-XXXX
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const initials =
      data.fullName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'UG';
    const ticketCode = `UGB-2026-${initials}${randomHex}`;
    const qrCodeDataUrl = await this.generateTicketQr(ticketCode);

    const docId = `reg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const newRecord: Registration = {
      id: docId,
      fullName: data.fullName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      attendeesCount: data.attendeesCount,
      attendanceType: data.attendanceType,
      hearAbout: data.hearAbout || '',
      consent: data.consent,
      ticketCode,
      qrCodeDataUrl,
      checkedIn: false,
      utmSource: utmParams?.utmSource || '',
      utmMedium: utmParams?.utmMedium || '',
      utmCampaign: utmParams?.utmCampaign || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    list.unshift(newRecord);
    this.setItem(STORAGE_KEYS.REGISTRATIONS, list);

    // Persist new registration to Firebase Firestore
    const writePath = `registrations/${newRecord.id}`;
    try {
      await setDoc(doc(db, 'registrations', newRecord.id), newRecord);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, writePath);
    }

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
      (r) =>
        r.ticketCode.toLowerCase() === cleanQuery || r.email.toLowerCase() === cleanQuery
    );

    if (!record) {
      return {
        success: false,
        message: `No registration found for ticket "${ticketCodeOrEmail}". Please verify the code or email.`,
      };
    }

    if (record.checkedIn) {
      return {
        success: false,
        alreadyCheckedIn: true,
        registration: record,
        message: `Double check-in prevented! This ticket was ALREADY checked in on ${new Date(
          record.checkedInAt || ''
        ).toLocaleString('en-GB', { timeZone: 'Africa/Lagos' })} (WAT).`,
      };
    }

    const checkInTime = new Date().toISOString();
    record.checkedIn = true;
    record.checkedInAt = checkInTime;
    record.updatedAt = checkInTime;

    this.setItem(STORAGE_KEYS.REGISTRATIONS, list);

    // Persist check-in status to Firebase Firestore
    const updatePath = `registrations/${record.id}`;
    try {
      await updateDoc(doc(db, 'registrations', record.id), {
        checkedIn: true,
        checkedInAt: checkInTime,
        updatedAt: checkInTime,
      });
    } catch (err) {
      console.warn('Firestore ticket check-in update error:', err);
    }

    return {
      success: true,
      registration: record,
      message: `Verified! Welcome ${record.fullName} (${record.attendeesCount} ${
        record.attendeesCount > 1 ? 'attendees' : 'attendee'
      }). Ticket: ${record.ticketCode}.`,
    };
  }

  // --- PARTNER INQUIRIES ---
  getPartnerInquiries(): PartnerInquiry[] {
    const stored = this.getItem<PartnerInquiry[]>(STORAGE_KEYS.PARTNERS, []);
    return stored.length > 0 ? stored : this.inMemoryPartners;
  }

  async fetchPartnerInquiriesFromFirestore(): Promise<PartnerInquiry[]> {
    const path = 'partnerInquiries';
    try {
      const snap = await getDocs(collection(db, path));
      const list: PartnerInquiry[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<PartnerInquiry, 'id'>) }));
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.inMemoryPartners = list;
      this.setItem(STORAGE_KEYS.PARTNERS, list);
      return list;
    } catch (err) {
      console.warn('Firestore partner inquiries fetch warning:', err);
      return this.getPartnerInquiries();
    }
  }

  addPartnerInquiry(data: PartnerInquiryFormData): PartnerInquiry {
    const list = this.getPartnerInquiries();
    const docId = `partner_${Date.now()}`;
    const newRecord: PartnerInquiry = {
      id: docId,
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
    this.inMemoryPartners = list;
    this.setItem(STORAGE_KEYS.PARTNERS, list);

    // Save to Firestore
    setDoc(doc(db, 'partnerInquiries', docId), newRecord).catch((err) => {
      console.warn('Firestore partner inquiry write error:', err);
    });

    return newRecord;
  }

  updatePartnerStatus(id: string, status: 'new' | 'replied'): void {
    const list = this.getPartnerInquiries();
    const idx = list.findIndex((p) => p.id === id);
    if (idx >= 0) {
      const now = new Date().toISOString();
      list[idx].status = status;
      list[idx].updatedAt = now;
      this.inMemoryPartners = list;
      this.setItem(STORAGE_KEYS.PARTNERS, list);

      updateDoc(doc(db, 'partnerInquiries', id), {
        status,
        updatedAt: now,
      }).catch((err) => {
        console.warn('Firestore partner status update error:', err);
      });
    }
  }

  // --- PRESS REQUESTS ---
  getPressRequests(): PressRequest[] {
    const stored = this.getItem<PressRequest[]>(STORAGE_KEYS.PRESS, []);
    return stored.length > 0 ? stored : this.inMemoryPress;
  }

  async fetchPressRequestsFromFirestore(): Promise<PressRequest[]> {
    const path = 'pressRequests';
    try {
      const snap = await getDocs(collection(db, path));
      const list: PressRequest[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...(d.data() as Omit<PressRequest, 'id'>) }));
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      this.inMemoryPress = list;
      this.setItem(STORAGE_KEYS.PRESS, list);
      return list;
    } catch (err) {
      console.warn('Firestore press requests fetch warning:', err);
      return this.getPressRequests();
    }
  }

  addPressRequest(data: PressRequestFormData): PressRequest {
    const list = this.getPressRequests();
    const docId = `press_${Date.now()}`;
    const newRecord: PressRequest = {
      id: docId,
      name: data.name,
      outlet: data.outlet,
      role: data.role,
      email: data.email,
      coverageType: data.coverageType,
      notes: data.notes || '',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newRecord);
    this.inMemoryPress = list;
    this.setItem(STORAGE_KEYS.PRESS, list);

    // Save to Firestore
    setDoc(doc(db, 'pressRequests', docId), newRecord).catch((err) => {
      console.warn('Firestore press request write error:', err);
    });

    return newRecord;
  }

  updatePressStatus(id: string, status: 'new' | 'replied'): void {
    const list = this.getPressRequests();
    const idx = list.findIndex((p) => p.id === id);
    if (idx >= 0) {
      const now = new Date().toISOString();
      list[idx].status = status;
      list[idx].updatedAt = now;
      this.inMemoryPress = list;
      this.setItem(STORAGE_KEYS.PRESS, list);

      updateDoc(doc(db, 'pressRequests', id), {
        status,
        updatedAt: now,
      }).catch((err) => {
        console.warn('Firestore press status update error:', err);
      });
    }
  }

  // --- LIVE UPDATES ---
  getLiveUpdates(): LiveUpdate[] {
    const stored = this.getItem<LiveUpdate[]>(STORAGE_KEYS.UPDATES, INITIAL_UPDATES);
    return stored.length > 0 ? stored : this.inMemoryUpdates;
  }

  addLiveUpdate(
    title: string,
    message: string,
    milestoneHour?: number | null,
    isPinned = false
  ): LiveUpdate {
    const list = this.getLiveUpdates();
    const docId = `upd_${Date.now()}`;
    const now = new Date().toISOString();
    const newRecord: LiveUpdate = {
      id: docId,
      title,
      message,
      milestoneHour: milestoneHour ?? null,
      isPinned,
      createdAt: now,
      updatedAt: now,
    };
    list.unshift(newRecord);
    this.inMemoryUpdates = list;
    this.setItem(STORAGE_KEYS.UPDATES, list);

    // Save to Firebase Firestore
    setDoc(doc(db, 'liveUpdates', docId), newRecord).catch((err) => {
      console.warn('Firestore live update write error:', err);
    });

    return newRecord;
  }

  deleteLiveUpdate(id: string): void {
    const list = this.getLiveUpdates().filter((u) => u.id !== id);
    this.inMemoryUpdates = list;
    this.setItem(STORAGE_KEYS.UPDATES, list);

    // Delete from Firestore
    deleteDoc(doc(db, 'liveUpdates', id)).catch((err) => {
      console.warn('Firestore live update delete error:', err);
    });
  }

  togglePinUpdate(id: string): void {
    const list = this.getLiveUpdates();
    const idx = list.findIndex((u) => u.id === id);
    if (idx >= 0) {
      list[idx].isPinned = !list[idx].isPinned;
      list[idx].updatedAt = new Date().toISOString();
      this.inMemoryUpdates = list;
      this.setItem(STORAGE_KEYS.UPDATES, list);

      updateDoc(doc(db, 'liveUpdates', id), {
        isPinned: list[idx].isPinned,
        updatedAt: list[idx].updatedAt,
      }).catch((err) => {
        console.warn('Firestore live update pin error:', err);
      });
    }
  }

  // --- DAILY PHRASES ---
  getDailyPhrases(): DailyPhrase[] {
    const stored = this.getItem<DailyPhrase[]>(STORAGE_KEYS.PHRASES, []);
    return stored.length > 0 ? stored : this.inMemoryPhrases;
  }

  getTodayPhrase(): DailyPhrase {
    const phrases = this.getDailyPhrases();
    return (
      phrases[0] || {
        id: 'default',
        french: "Ensemble, nous écrivons l'histoire.",
        english: 'Together, we are writing history.',
        phonetic: 'ahn-SAHM-bluh, noo z-ay-kree-VOHN lees-TWAHR',
        context: 'Official motto for the 48-Hour French Marathon.',
        dateStr: '2026-10-30',
        createdAt: new Date().toISOString(),
      }
    );
  }

  saveDailyPhrase(
    phrase: Omit<DailyPhrase, 'id' | 'createdAt'>,
    id?: string
  ): DailyPhrase {
    const list = this.getDailyPhrases();
    if (id) {
      const idx = list.findIndex((p) => p.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...phrase };
        this.inMemoryPhrases = list;
        this.setItem(STORAGE_KEYS.PHRASES, list);

        setDoc(doc(db, 'dailyPhrases', id), list[idx]).catch((err) => {
          console.warn('Firestore phrase update error:', err);
        });
        return list[idx];
      }
    }
    const docId = `phrase_${Date.now()}`;
    const created: DailyPhrase = {
      ...phrase,
      id: docId,
      createdAt: new Date().toISOString(),
    };
    list.unshift(created);
    this.inMemoryPhrases = list;
    this.setItem(STORAGE_KEYS.PHRASES, list);

    setDoc(doc(db, 'dailyPhrases', docId), created).catch((err) => {
      console.warn('Firestore phrase create error:', err);
    });
    return created;
  }

  // --- FAQS ---
  getFaqs(): FaqItem[] {
    const stored = this.getItem<FaqItem[]>(STORAGE_KEYS.FAQS, []);
    return stored.length > 0 ? stored : this.inMemoryFaqs;
  }

  saveFaqItem(item: Omit<FaqItem, 'id'>, id?: string): FaqItem {
    const list = this.getFaqs();
    if (id) {
      const idx = list.findIndex((f) => f.id === id);
      if (idx >= 0) {
        list[idx] = { ...list[idx], ...item };
        this.inMemoryFaqs = list;
        this.setItem(STORAGE_KEYS.FAQS, list);

        setDoc(doc(db, 'faqs', id), list[idx]).catch((err) => {
          console.warn('Firestore FAQ update error:', err);
        });
        return list[idx];
      }
    }
    const docId = `faq_${Date.now()}`;
    const created: FaqItem = {
      ...item,
      id: docId,
    };
    list.push(created);
    this.inMemoryFaqs = list;
    this.setItem(STORAGE_KEYS.FAQS, list);

    setDoc(doc(db, 'faqs', docId), created).catch((err) => {
      console.warn('Firestore FAQ create error:', err);
    });
    return created;
  }

  deleteFaqItem(id: string): void {
    const list = this.getFaqs().filter((f) => f.id !== id);
    this.inMemoryFaqs = list;
    this.setItem(STORAGE_KEYS.FAQS, list);

    deleteDoc(doc(db, 'faqs', id)).catch((err) => {
      console.warn('Firestore FAQ delete error:', err);
    });
  }

  // --- EVENT CONFIG ---
  getEventConfig(): EventConfig {
    const stored = this.getItem<EventConfig>(STORAGE_KEYS.CONFIG, this.inMemoryConfig);
    return stored;
  }

  updateEventConfig(updates: Partial<EventConfig>): EventConfig {
    const current = this.getEventConfig();
    const updated = { ...current, ...updates };
    this.inMemoryConfig = updated;
    this.setItem(STORAGE_KEYS.CONFIG, updated);

    // Save to Firebase Firestore
    setDoc(doc(db, 'eventConfig', 'global'), updated, { merge: true }).catch((err) => {
      console.warn('Firestore config update error:', err);
    });

    return updated;
  }

  // --- ADMIN AUTH & SESSION ---
  getAdminSession(): AdminUser | null {
    return this.getItem<AdminUser | null>(STORAGE_KEYS.ADMIN_SESSION, null);
  }

  loginAdmin(password: string): { success: boolean; user?: AdminUser; error?: string } {
    if (
      password === INITIAL_ADMIN.passwordHash ||
      password === 'admin' ||
      password === 'ugegbe2026' ||
      password === 'marathon2026'
    ) {
      const user: AdminUser = {
        id: 'admin_1',
        email: INITIAL_ADMIN.email,
        name: INITIAL_ADMIN.name,
        role: INITIAL_ADMIN.role,
      };
      this.setItem(STORAGE_KEYS.ADMIN_SESSION, user);
      return { success: true, user };
    }
    return { success: false, error: 'Incorrect administrator password.' };
  }

  async loginAdminWithGoogle(): Promise<{
    success: boolean;
    user?: AdminUser;
    error?: string;
  }> {
    try {
      const firebaseUser = await signInWithGoogle();
      const email = firebaseUser.email || '';
      const isOwner =
        email.toLowerCase() === 'stephenmayowa112@gmail.com' ||
        email.toLowerCase() === INITIAL_ADMIN.email.toLowerCase();

      const user: AdminUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || 'Authorized Administrator',
        role: isOwner ? 'ADMIN' : 'STAFF',
      };
      this.setItem(STORAGE_KEYS.ADMIN_SESSION, user);
      return { success: true, user };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { success: false, error: message };
    }
  }

  async logoutAdmin(): Promise<void> {
    try {
      await logOut();
    } catch (err) {
      console.warn('Sign-out warning:', err);
    }
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
      'Registered At',
    ];

    const rows = registrations.map((r) => [
      `"${r.ticketCode}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      r.attendeesCount,
      `"${r.attendanceType}"`,
      r.checkedIn ? 'YES' : 'NO',
      r.checkedInAt
        ? `"${new Date(r.checkedInAt).toLocaleString('en-GB', {
            timeZone: 'Africa/Lagos',
          })}"`
        : '""',
      `"${r.utmSource || ''}"`,
      `"${new Date(r.createdAt).toISOString()}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  }
}

export const store = new StoreService();
