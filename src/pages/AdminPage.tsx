import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Users,
  QrCode,
  Radio,
  FileText,
  Mail,
  BarChart3,
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Pin,
  ExternalLink,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { store } from '../services/store';
import {
  Registration,
  EventConfig,
  LiveUpdate,
  PartnerInquiry,
  PressRequest,
  DailyPhrase,
  FaqItem,
  AdminUser,
} from '../types';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(store.getAdminSession());
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  type AdminTab = 'registrations' | 'checkin' | 'live-control' | 'content' | 'inbox' | 'analytics';
  const [activeTab, setActiveTab] = useState<AdminTab>('registrations');

  // Registrations state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'in_person' | 'online' | 'checked_in'>('all');

  // QR Check-in state
  const [checkinCodeInput, setCheckinCodeInput] = useState('');
  const [checkinResult, setCheckinResult] = useState<{
    success: boolean;
    alreadyCheckedIn?: boolean;
    registration?: Registration;
    message: string;
  } | null>(null);

  // Live Control state
  const [eventConfig, setEventConfig] = useState<EventConfig>(store.getEventConfig());
  const [configSavedToast, setConfigSavedToast] = useState(false);
  const [liveUpdates, setLiveUpdates] = useState<LiveUpdate[]>(store.getLiveUpdates());
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateMessage, setNewUpdateMessage] = useState('');
  const [newUpdateHour, setNewUpdateHour] = useState<number | ''>('');
  const [newUpdatePinned, setNewUpdatePinned] = useState(false);

  // Content manager state
  const [phrase, setPhrase] = useState<DailyPhrase>(store.getTodayPhrase());
  const [faqs, setFaqs] = useState<FaqItem[]>(store.getFaqs());
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Attendance');

  // Inbox state
  const [partners, setPartners] = useState<PartnerInquiry[]>(store.getPartnerInquiries());
  const [pressRequests, setPressRequests] = useState<PressRequest[]>(store.getPressRequests());

  // Load registrations on mount
  useEffect(() => {
    if (currentUser) {
      store.getRegistrations().then(setRegistrations);
    }
  }, [currentUser]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = store.loginAdmin(passwordInput);
    if (result.success && result.user) {
      setCurrentUser(result.user);
      store.getRegistrations().then(setRegistrations);
    } else {
      setLoginError(result.error || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    store.logoutAdmin();
    setCurrentUser(null);
  };

  // QR Check-in Action
  const handlePerformCheckIn = async (codeToVerify?: string) => {
    const code = (codeToVerify || checkinCodeInput).trim();
    if (!code) return;

    const result = await store.checkInTicket(code);
    setCheckinResult(result);
    setCheckinCodeInput('');

    // Reload list
    const updated = await store.getRegistrations();
    setRegistrations(updated);
  };

  // CSV Export Action
  const handleExportCsv = () => {
    const csv = store.exportRegistrationsCsv(registrations);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ugegbe-marathon-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Live Config Save
  const handleSaveConfig = () => {
    store.updateEventConfig(eventConfig);
    setConfigSavedToast(true);
    setTimeout(() => setConfigSavedToast(false), 3000);
  };

  // Add Live Update
  const handleAddLiveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateTitle || !newUpdateMessage) return;

    store.addLiveUpdate(
      newUpdateTitle,
      newUpdateMessage,
      newUpdateHour === '' ? null : Number(newUpdateHour),
      newUpdatePinned
    );
    setLiveUpdates(store.getLiveUpdates());
    setNewUpdateTitle('');
    setNewUpdateMessage('');
    setNewUpdateHour('');
    setNewUpdatePinned(false);
  };

  // Add FAQ Item
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion || !newFaqAnswer) return;

    store.saveFaqItem({
      question: newFaqQuestion,
      answer: newFaqAnswer,
      category: newFaqCategory,
      order: faqs.length + 1,
    });
    setFaqs(store.getFaqs());
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  // Save Phrase
  const [phraseSaved, setPhraseSaved] = useState(false);
  const handleSavePhrase = (e: React.FormEvent) => {
    e.preventDefault();
    store.saveDailyPhrase(phrase, phrase.id);
    setPhraseSaved(true);
    setTimeout(() => setPhraseSaved(false), 3000);
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterType === 'in_person') return r.attendanceType === 'in_person';
    if (filterType === 'online') return r.attendanceType === 'online';
    if (filterType === 'checked_in') return r.checkedIn === true;
    return true;
  });

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const totalAttendeesCount = registrations.reduce((sum, r) => sum + r.attendeesCount, 0);
  const inPersonCount = registrations.filter((r) => r.attendanceType === 'in_person').length;
  const onlineCount = registrations.filter((r) => r.attendanceType === 'online').length;
  const checkedInCount = registrations.filter((r) => r.checkedIn).length;

  // LOGIN SCREEN (If not authenticated)
  if (!currentUser) {
    return (
      <div className="w-full bg-[#FAF8F5] py-20 min-h-[70vh] flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-4">
          <div className="bg-white border-2 border-emerald-900/30 rounded-2xl p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-950 text-amber-400 mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                STAFF & OPERATIONS PORTAL
              </h1>
              <p className="text-xs font-mono text-slate-500">
                Favour Ugegbe 48-Hour French Language Marathon
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  Administrator Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter staff password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                />
                <p className="mt-1 text-[11px] text-slate-400 font-mono">
                  Default test access: <span className="text-emerald-800 font-bold">marathon2026</span>
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
              >
                Authenticate Session
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-mono">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={async () => {
                  setLoginError(null);
                  const res = await store.loginAdminWithGoogle();
                  if (res.success && res.user) {
                    setCurrentUser(res.user);
                    store.getRegistrations().then(setRegistrations);
                  } else {
                    setLoginError(res.error || 'Google authentication failed.');
                  }
                }}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign In With Google (Firebase Auth)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="w-full bg-[#F4F6F5] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Bar Header */}
        <div className="bg-[#022C22] text-white p-6 rounded-2xl border border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>COMMAND & ADJUDICATION DESK</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black uppercase text-white tracking-tight">
              OPERATIONS CONTROL CENTRE
            </h1>
            <p className="text-xs text-emerald-200 font-mono">
              Logged in as: {currentUser.name} ({currentUser.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              View Public Site
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-900/60 hover:bg-rose-900 text-rose-200 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented Controls) */}
        <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-xl overflow-x-auto shadow-xs text-xs font-mono font-medium">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'registrations'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Registrations ({registrations.length})
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'checkin'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            QR Check-in Station
          </button>

          <button
            onClick={() => setActiveTab('live-control')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'live-control'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Live Broadcast & Feed
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'content'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Content & FAQs
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'inbox'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Inboxes ({partners.length + pressRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-emerald-950 text-amber-400 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Analytics & UTMs
          </button>
        </div>

        {/* 1. REGISTRATIONS TAB */}
        {activeTab === 'registrations' && (
          <div className="space-y-6">
            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Total Passes
                </span>
                <span className="text-3xl font-display font-black text-slate-900 font-mono">
                  {totalRegistrations}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  {totalAttendeesCount} Total Attendees
                </span>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  In-Person (Landmark)
                </span>
                <span className="text-3xl font-display font-black text-emerald-900 font-mono">
                  {inPersonCount}
                </span>
                <span className="text-[11px] text-emerald-700 block mt-1">
                  Capacity: {eventConfig.venueCapacity}
                </span>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Online Stream Passes
                </span>
                <span className="text-3xl font-display font-black text-slate-800 font-mono">
                  {onlineCount}
                </span>
                <span className="text-[11px] text-slate-500 block mt-1">
                  Global Streamers
                </span>
              </div>

              <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  Checked In (Landmark)
                </span>
                <span className="text-3xl font-display font-black text-amber-600 font-mono">
                  {checkedInCount}
                </span>
                <span className="text-[11px] text-amber-700 block mt-1">
                  {inPersonCount > 0 ? `${((checkedInCount / inPersonCount) * 100).toFixed(0)}% checked in` : '0%'}
                </span>
              </div>
            </div>

            {/* Filter Bar & Export */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-1 items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search attendee by name, email, ticket code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-mono">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${filterType === 'all' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('in_person')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${filterType === 'in_person' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'}`}
                  >
                    In Person
                  </button>
                  <button
                    onClick={() => setFilterType('online')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${filterType === 'online' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'}`}
                  >
                    Online
                  </button>
                  <button
                    onClick={() => setFilterType('checked_in')}
                    className={`px-3 py-1.5 rounded-md transition-colors ${filterType === 'checked_in' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600'}`}
                  >
                    Checked In
                  </button>
                </div>
              </div>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono text-xs uppercase tracking-wider font-bold rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Registrations Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Ticket Code</th>
                      <th className="py-3.5 px-4 font-semibold">Attendee Name</th>
                      <th className="py-3.5 px-4 font-semibold">Contact</th>
                      <th className="py-3.5 px-4 font-semibold">Guests</th>
                      <th className="py-3.5 px-4 font-semibold">Mode</th>
                      <th className="py-3.5 px-4 font-semibold">Check-in Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 font-mono text-xs">
                          No registrations found matching your query.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-xs text-emerald-950">
                            {r.ticketCode}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900 block">{r.fullName}</span>
                            <span className="text-[11px] text-slate-400 font-mono">{r.email}</span>
                          </td>
                          <td className="py-3.5 px-4 text-xs font-mono text-slate-600">
                            {r.phone}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-xs font-semibold">
                            {r.attendeesCount}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider ${
                                r.attendanceType === 'in_person'
                                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {r.attendanceType === 'in_person' ? 'Landmark' : 'Online'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            {r.checkedIn ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-mono font-bold text-[11px]">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Checked In
                              </span>
                            ) : (
                              <span className="text-slate-400 font-mono text-[11px]">Pending</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {!r.checkedIn && (
                              <button
                                onClick={() => handlePerformCheckIn(r.ticketCode)}
                                className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                              >
                                Check In
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. QR CHECK-IN SCANNER TAB */}
        {activeTab === 'checkin' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border-2 border-emerald-900/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>MOBILE-FRIENDLY TICKET CHECK-IN TERMINAL</span>
              </div>
              <h2 className="text-2xl font-display font-black text-emerald-950 uppercase tracking-tight">
                VALIDATE ATTENDEE ENTRY
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Scan attendee QR code with handheld barcode reader or type/paste the unique ticket code (e.g. <code>UGB-2026-CH01</code>) or email address below. Prevents duplicate admissions.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePerformCheckIn();
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter Ticket Code or Email"
                    value={checkinCodeInput}
                    onChange={(e) => setCheckinCodeInput(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-800"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Verify Ticket
                  </button>
                </div>
              </form>

              {/* Check-in Outcome Display */}
              {checkinResult && (
                <div
                  className={`p-5 rounded-xl border text-sm space-y-2 ${
                    checkinResult.success
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : checkinResult.alreadyCheckedIn
                      ? 'bg-amber-50 border-amber-300 text-amber-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold font-display uppercase">
                    {checkinResult.success ? (
                      <CheckCircle className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600" />
                    )}
                    <span>{checkinResult.success ? 'ADMISSION GRANTED' : checkinResult.alreadyCheckedIn ? 'ALREADY CHECKED IN' : 'VERIFICATION FAILED'}</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{checkinResult.message}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. LIVE BROADCAST CONTROL TAB */}
        {activeTab === 'live-control' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Event Phase & Stream URL Config */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                  LIVE PHASE & OVERRIDES
                </h2>
                {configSavedToast && (
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    Settings Saved! ✓
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Event Phase Status *
                  </label>
                  <select
                    value={eventConfig.status}
                    onChange={(e) =>
                      setEventConfig({ ...eventConfig, status: e.target.value as any })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold"
                  >
                    <option value="upcoming">Upcoming (Pre-Event Countdown Mode)</option>
                    <option value="live">Live (Active 48-Hour Stream & Clock Running)</option>
                    <option value="completed">Completed (Victory / Results State)</option>
                    <option value="attempt-ended">Attempt Ended (Results Mode)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Official Start Time (ISO Format)
                  </label>
                  <input
                    type="text"
                    value={eventConfig.officialStartTime}
                    onChange={(e) =>
                      setEventConfig({ ...eventConfig, officialStartTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    Default: 2026-10-30T18:00:00+01:00 (Africa/Lagos WAT)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    YouTube Stream / Embed URL
                  </label>
                  <input
                    type="text"
                    value={eventConfig.youtubeUrl || ''}
                    onChange={(e) =>
                      setEventConfig({ ...eventConfig, youtubeUrl: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Running Hour Display Override (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="e.g. 26.5 to preview Hour 26 record break"
                    value={eventConfig.hourOverride ?? ''}
                    onChange={(e) =>
                      setEventConfig({
                        ...eventConfig,
                        hourOverride: e.target.value === '' ? null : parseFloat(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                  <p className="text-[11px] text-slate-400 font-mono mt-1">
                    Leave blank to compute real-time elapsed hours from official start.
                  </p>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">Waitlist State</span>
                    <span className="text-[11px] text-slate-500">
                      Show waitlist warning on registration form
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={eventConfig.waitlistActive}
                    onChange={(e) =>
                      setEventConfig({ ...eventConfig, waitlistActive: e.target.checked })
                    }
                    className="w-4 h-4 text-emerald-800 rounded cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveConfig}
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Save Live Configuration
                </button>
              </div>
            </div>

            {/* Right: Live Dispatches Manager */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
                <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                  POST A LIVE DISPATCH UPDATE
                </h2>

                <form onSubmit={handleAddLiveUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                      Update Headline *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hour 12 Milestone Reached!"
                      value={newUpdateTitle}
                      onChange={(e) => setNewUpdateTitle(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                      Update Dispatch Body *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write brief live update to appear on /live feed..."
                      value={newUpdateMessage}
                      onChange={(e) => setNewUpdateMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                        Milestone Hour (Optional)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 12"
                        value={newUpdateHour}
                        onChange={(e) =>
                          setNewUpdateHour(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                        }
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>

                    <label className="flex items-center gap-2 mt-5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newUpdatePinned}
                        onChange={(e) => setNewUpdatePinned(e.target.checked)}
                        className="w-4 h-4 text-emerald-800 rounded"
                      />
                      <span className="text-xs font-mono font-semibold text-slate-700">Pin to top</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Publish Live Dispatch (Auto-Refreshes on /live)
                  </button>
                </form>
              </div>

              {/* Updates List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
                <h3 className="font-display font-bold text-slate-900 uppercase text-sm">
                  Active Live Dispatches ({liveUpdates.length})
                </h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {liveUpdates.map((u) => (
                    <div
                      key={u.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                          <span>{new Date(u.createdAt).toLocaleTimeString()}</span>
                          {u.isPinned && <span className="text-amber-600 font-bold">📌 PINNED</span>}
                        </div>
                        <h4 className="font-bold text-slate-900 mt-0.5">{u.title}</h4>
                        <p className="text-slate-600 text-xs mt-0.5">{u.message}</p>
                      </div>
                      <button
                        onClick={() => {
                          store.deleteLiveUpdate(u.id);
                          setLiveUpdates(store.getLiveUpdates());
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                        title="Delete update"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. CONTENT & FAQ TAB */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Daily French Phrase Editor */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                DAILY FRENCH PHRASE MANAGER
              </h2>

              <form onSubmit={handleSavePhrase} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    French Phrase (Texte en français) *
                  </label>
                  <input
                    type="text"
                    required
                    value={phrase.french}
                    onChange={(e) => setPhrase({ ...phrase, french: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    English Translation *
                  </label>
                  <input
                    type="text"
                    required
                    value={phrase.english}
                    onChange={(e) => setPhrase({ ...phrase, english: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Phonetic Guide *
                  </label>
                  <input
                    type="text"
                    required
                    value={phrase.phonetic}
                    onChange={(e) => setPhrase({ ...phrase, phonetic: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Context / Note *
                  </label>
                  <textarea
                    rows={2}
                    value={phrase.context}
                    onChange={(e) => setPhrase({ ...phrase, context: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  {phraseSaved ? 'Saved! ✓' : 'Save Daily Phrase'}
                </button>
              </form>
            </div>

            {/* FAQ Manager */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                FAQ ITEMS MANAGER
              </h2>

              <form onSubmit={handleAddFaq} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Question *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Can I bring my laptop?"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Answer *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Clear, helpful response..."
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-800 mb-1">
                    Category *
                  </label>
                  <select
                    value={newFaqCategory}
                    onChange={(e) => setNewFaqCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  >
                    <option value="Venue & Access">Venue & Access</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Record & Rules">Record & Rules</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-950 hover:bg-emerald-900 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Add FAQ Item
                </button>
              </form>

              <div className="space-y-3 pt-2">
                <h3 className="font-display font-bold text-slate-900 uppercase text-xs font-mono">
                  Existing Questions ({faqs.length})
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {faqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800 truncate max-w-sm">
                        {faq.question}
                      </span>
                      <button
                        onClick={() => {
                          store.deleteFaqItem(faq.id);
                          setFaqs(store.getFaqs());
                        }}
                        className="text-rose-500 hover:text-rose-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. INBOXES TAB (Partner & Press) */}
        {activeTab === 'inbox' && (
          <div className="space-y-8">
            {/* Partner Inquiries */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                PARTNER INQUIRIES ({partners.length})
              </h2>

              {partners.length === 0 ? (
                <p className="text-xs font-mono text-slate-400 py-4">No partner inquiries yet.</p>
              ) : (
                <div className="space-y-4">
                  {partners.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 font-display text-base">
                          {p.name} · <span className="text-emerald-900">{p.organization}</span>
                        </span>
                        <button
                          onClick={() => {
                            const next = p.status === 'new' ? 'replied' : 'new';
                            store.updatePartnerStatus(p.id, next);
                            setPartners(store.getPartnerInquiries());
                          }}
                          className={`px-2.5 py-1 text-xs font-mono font-bold uppercase rounded cursor-pointer ${
                            p.status === 'new'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          Status: {p.status}
                        </button>
                      </div>
                      <div className="text-xs font-mono text-slate-500">
                        Email: {p.email} · Tier: <span className="font-semibold text-slate-800">{p.tierInterest}</span>
                      </div>
                      <p className="text-xs text-slate-700 bg-white p-3 rounded border border-slate-200 leading-relaxed">
                        {p.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Press Requests */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-xl font-display font-black text-emerald-950 uppercase tracking-tight">
                PRESS ACCREDITATION REQUESTS ({pressRequests.length})
              </h2>

              {pressRequests.length === 0 ? (
                <p className="text-xs font-mono text-slate-400 py-4">No press requests logged yet.</p>
              ) : (
                <div className="space-y-4">
                  {pressRequests.map((pr) => (
                    <div
                      key={pr.id}
                      className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 font-display text-base">
                          {pr.name} ({pr.role}) · <span className="text-emerald-900">{pr.outlet}</span>
                        </span>
                        <button
                          onClick={() => {
                            const next = pr.status === 'new' ? 'replied' : 'new';
                            store.updatePressStatus(pr.id, next);
                            setPressRequests(store.getPressRequests());
                          }}
                          className={`px-2.5 py-1 text-xs font-mono font-bold uppercase rounded cursor-pointer ${
                            pr.status === 'new'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          Status: {pr.status}
                        </button>
                      </div>
                      <div className="text-xs font-mono text-slate-500">
                        Email: {pr.email} · Coverage: {pr.coverageType}
                      </div>
                      {pr.notes && (
                        <p className="text-xs text-slate-700 bg-white p-3 rounded border border-slate-200 leading-relaxed">
                          Notes: {pr.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. ANALYTICS & UTMs TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  ATTENDANCE TYPE RATIO
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between font-mono">
                    <span>In-Person at Landmark</span>
                    <span className="font-bold">{inPersonCount} ({totalRegistrations > 0 ? ((inPersonCount / totalRegistrations) * 100).toFixed(0) : 0}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-800 rounded-full"
                      style={{ width: `${totalRegistrations > 0 ? (inPersonCount / totalRegistrations) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="flex justify-between font-mono pt-2">
                    <span>Online Live Stream</span>
                    <span className="font-bold">{onlineCount} ({totalRegistrations > 0 ? ((onlineCount / totalRegistrations) * 100).toFixed(0) : 0}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${totalRegistrations > 0 ? (onlineCount / totalRegistrations) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  TOP ACQUISITION CHANNELS (UTM)
                </span>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Instagram (@UGEGBEGWR)</span>
                    <span className="font-bold text-slate-900">42%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Direct / Word of Mouth</span>
                    <span className="font-bold text-slate-900">28%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>X (Twitter)</span>
                    <span className="font-bold text-slate-900">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TikTok & Others</span>
                    <span className="font-bold text-slate-900">12%</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border border-slate-200 rounded-xl space-y-4 shadow-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  VENUE CAPACITY UTILISATION
                </span>
                <div className="space-y-2">
                  <div className="text-3xl font-display font-black text-slate-900 font-mono">
                    {inPersonCount} / {eventConfig.venueCapacity}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Auditorium capacity at Landmark Centre, Victoria Island. Waitlist triggers automatically if capacity threshold is exceeded.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
