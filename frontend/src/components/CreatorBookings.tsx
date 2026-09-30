import React, { useState, useMemo } from 'react';
import {
  Ticket,
  Sparkles,
  LayoutDashboard,
  User,
  Sun,
  Moon,
  LogOut,
  Search,
  ChevronDown,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  CreditCard,
  Download,
  Filter,
  Eye,
  Calendar,
  DollarSign,
  AlertCircle,
  Check,
  X,
  ExternalLink,
  ShieldCheck,
  Layers,
  Copy,
  Receipt,
  FileSpreadsheet,
  Flame
} from 'lucide-react';

interface CreatorBookingsProps {
  onExploreClick?: () => void;
  onProfileClick?: () => void;
  onOpenProfile?: () => void;
  onOpenDashboard?: () => void;
  onLogout?: () => void;
}

interface BookingRecord {
  id: string;
  buyerName: string;
  buyerEmail: string;
  avatarUrl?: string;
  event: string;
  ticketType: 'General' | 'VIP' | 'VVIP Table' | 'Early Bird' | 'Backstage Pass';
  amount: number;
  paystackReference: string;
  date: string;
  time: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  paymentChannel: 'Card' | 'Bank Transfer' | 'USSD' | 'Apple Pay';
  quantity: number;
}

const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'BKG-1094',
    buyerName: 'John Doe',
    buyerEmail: 'john.doe@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    event: 'Summer Concert',
    ticketType: 'General',
    amount: 15000,
    paystackReference: 'pstk_live_9482710398',
    date: '21 Aug 2026',
    time: '11:42 AM',
    status: 'Paid',
    paymentChannel: 'Card',
    quantity: 1,
  },
  {
    id: 'BKG-1093',
    buyerName: 'Amara Okeke',
    buyerEmail: 'amara.okeke@yahoo.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    event: 'Afrobeats Night 2026',
    ticketType: 'VIP',
    amount: 25000,
    paystackReference: 'pstk_live_8391024857',
    date: '21 Aug 2026',
    time: '10:15 AM',
    status: 'Paid',
    paymentChannel: 'Bank Transfer',
    quantity: 1,
  },
  {
    id: 'BKG-1092',
    buyerName: 'Tunde Balogun',
    buyerEmail: 'tunde.b@outlook.com',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    event: 'Tech Conference',
    ticketType: 'Early Bird',
    amount: 10000,
    paystackReference: 'pstk_live_7281940192',
    date: '21 Aug 2026',
    time: '09:30 AM',
    status: 'Pending',
    paymentChannel: 'USSD',
    quantity: 1,
  },
  {
    id: 'BKG-1091',
    buyerName: 'Chiamaka Eze',
    buyerEmail: 'chi.eze@techafrica.org',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    event: 'Afrobeats Night 2026',
    ticketType: 'VIP',
    amount: 50000,
    paystackReference: 'pstk_live_6192847102',
    date: '20 Aug 2026',
    time: '08:14 PM',
    status: 'Paid',
    paymentChannel: 'Card',
    quantity: 2,
  },
  {
    id: 'BKG-1090',
    buyerName: 'David Adeleke',
    buyerEmail: 'davido.fans@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    event: 'Summer Concert',
    ticketType: 'VVIP Table',
    amount: 150000,
    paystackReference: 'pstk_live_5081938201',
    date: '20 Aug 2026',
    time: '06:55 PM',
    status: 'Paid',
    paymentChannel: 'Card',
    quantity: 1,
  },
  {
    id: 'BKG-1089',
    buyerName: 'Fola Adelekan',
    buyerEmail: 'fola.adelekan@corp.ng',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    event: 'Tech Conference',
    ticketType: 'General',
    amount: 15000,
    paystackReference: 'pstk_live_4971829381',
    date: '20 Aug 2026',
    time: '04:10 PM',
    status: 'Failed',
    paymentChannel: 'Card',
    quantity: 1,
  },
  {
    id: 'BKG-1088',
    buyerName: 'Kemi Adebayo',
    buyerEmail: 'kemi.adebayo@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&q=80',
    event: 'Summer Concert',
    ticketType: 'General',
    amount: 15000,
    paystackReference: 'pstk_live_3861928471',
    date: '19 Aug 2026',
    time: '02:22 PM',
    status: 'Refunded',
    paymentChannel: 'Card',
    quantity: 1,
  },
  {
    id: 'BKG-1087',
    buyerName: 'Emeka Nwosu',
    buyerEmail: 'emeka.nwosu@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    event: 'Afrobeats Night 2026',
    ticketType: 'Backstage Pass',
    amount: 75000,
    paystackReference: 'pstk_live_2751829301',
    date: '19 Aug 2026',
    time: '01:05 PM',
    status: 'Paid',
    paymentChannel: 'Card',
    quantity: 1,
  },
];

export default function CreatorBookings({
  onExploreClick,
  onProfileClick,
  onOpenDashboard,
  onLogout,
}: CreatorBookingsProps) {
  // Day / Night mode (Night is default)
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const isNight = theme === 'night';

  // Bookings state
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('All events');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending' | 'Failed' | 'Refunded'>('All');

  // Modal states
  const [viewBooking, setViewBooking] = useState<BookingRecord | null>(null);
  const [refundBooking, setRefundBooking] = useState<BookingRecord | null>(null);
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Event filter
      if (selectedEvent !== 'All events') {
        if (selectedEvent === 'Summer Concert' && b.event !== 'Summer Concert') return false;
        if (selectedEvent === 'Afrobeats Night 2026' && b.event !== 'Afrobeats Night 2026') return false;
        if (selectedEvent === 'Tech Conference' && b.event !== 'Tech Conference') return false;
      }

      // Status chip filter
      if (statusFilter !== 'All' && b.status !== statusFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = b.buyerName.toLowerCase().includes(query);
        const matchesEmail = b.buyerEmail.toLowerCase().includes(query);
        const matchesRef = b.paystackReference.toLowerCase().includes(query);
        const matchesId = b.id.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesRef && !matchesId) return false;
      }

      return true;
    });
  }, [bookings, selectedEvent, statusFilter, searchQuery]);

  // KPI Calculations
  const kpis = useMemo(() => {
    const totalBookings = bookings.length;
    const successfulPayments = bookings.filter((b) => b.status === 'Paid').length;
    const pendingCount = bookings.filter((b) => b.status === 'Pending').length;
    const totalRevenue = bookings
      .filter((b) => b.status === 'Paid')
      .reduce((sum, b) => sum + b.amount, 0);

    return {
      totalBookings,
      successfulPayments,
      pendingCount,
      totalRevenue,
    };
  }, [bookings]);

  // Handle refund confirmation
  const handleConfirmRefund = () => {
    if (!refundBooking) return;
    setIsProcessingRefund(true);
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((b) =>
          b.id === refundBooking.id ? { ...b, status: 'Refunded' } : b
        )
      );
      setIsProcessingRefund(false);
      const refundedId = refundBooking.id;
      setRefundBooking(null);
      showToast(`Refund of ₦${refundBooking.amount.toLocaleString()} for ${refundedId} processed successfully!`, 'success');
    }, 700);
  };

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div
      className={`min-h-screen selection:bg-[#7C3AED] selection:text-white flex flex-col justify-between font-sans transition-colors duration-200 ${
        isNight
          ? 'bg-[#0B0714] text-[#F5F0FF]'
          : 'bg-[#F7F5FB] text-[#1A1228]'
      }`}
    >
      {/* 1. HEADER (Required Structure: Left logo, Center nav, Top Right: theme toggle, avatar "Cynthia", Logout) */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
          isNight
            ? 'bg-[#0B0714]/95 border-[#2E2545] text-[#F5F0FF]'
            : 'bg-white/95 border-[#E8E2F3] text-[#1A1228] shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* LEFT: GoAfterDark logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={onOpenDashboard}
            id="bookings-header-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <Flame className="h-5 w-5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-black tracking-tight leading-none ${
                  isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
                }`}
              >
                Go<span className="text-[#FF1E83]">AfterDark</span>
              </span>
              <span
                className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'
                }`}
              >
                Creator Studio
              </span>
            </div>
          </div>

          {/* CENTER: Explore Events, Profile, Creator Dashboard */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={onExploreClick}
              id="nav-center-explore"
              className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              <Sparkles className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
              <span>Explore Events</span>
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              id="nav-center-profile"
              className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>

            <button
              type="button"
              onClick={onOpenDashboard}
              id="nav-center-dashboard"
              className={`inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Creator Dashboard</span>
            </button>
          </nav>

          {/* TOP RIGHT CLUSTER, in this exact order:
              1. Day / night theme toggle
              2. Avatar "Cynthia"
              3. Logout */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* 1. Day / Night Theme Toggle */}
            <div
              className={`flex items-center rounded-2xl p-1 shadow-sm border transition-all ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022]'
                  : 'border-[#E8E2F3] bg-[#F7F5FB]'
              }`}
              role="radiogroup"
              aria-label="Theme mode selector"
              id="theme-mode-toggle"
            >
              {/* Day button with Sunshine / Sun icon */}
              <button
                type="button"
                onClick={() => setTheme('day')}
                id="btn-theme-day"
                role="radio"
                aria-checked={!isNight}
                aria-label="Day mode"
                className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  !isNight
                    ? 'bg-white text-[#7C3AED] shadow-sm ring-1 ring-[#E8E2F3]'
                    : 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#2E2545]/40'
                }`}
              >
                <Sun className={`h-4 w-4 ${!isNight ? 'text-amber-500 fill-amber-400' : 'text-[#B8A9D4]'}`} />
                <span className="text-[11px] font-extrabold tracking-wide hidden sm:inline">Day</span>
              </button>

              {/* Night button with Moon icon (Default active) */}
              <button
                type="button"
                onClick={() => setTheme('night')}
                id="btn-theme-night"
                role="radio"
                aria-checked={isNight}
                aria-label="Night mode"
                className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isNight
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30 ring-1 ring-white/20'
                    : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-white/60'
                }`}
              >
                <Moon className={`h-4 w-4 ${isNight ? 'text-white fill-white' : 'text-[#6B6280]'}`} />
                <span className="text-[11px] font-extrabold tracking-wide hidden sm:inline">Night</span>
              </button>
            </div>

            {/* 2. Avatar "Cynthia" */}
            <button
              type="button"
              onClick={onProfileClick}
              id="header-user-avatar-cynthia"
              className={`flex items-center gap-2 rounded-2xl p-1.5 sm:pr-3 border transition-all ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022] hover:border-[#7C3AED] text-[#F5F0FF]'
                  : 'border-[#E8E2F3] bg-white hover:border-[#7C3AED] text-[#1A1228]'
              }`}
            >
              <div className="h-8 w-8 rounded-xl overflow-hidden ring-1 ring-[#7C3AED]/50 bg-gradient-to-tr from-[#7C3AED] to-indigo-600">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Cynthia"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold hidden sm:inline">Cynthia</span>
            </button>

            {/* 3. Logout */}
            <button
              type="button"
              onClick={onLogout}
              id="header-btn-logout"
              title="Log out"
              className={`inline-flex items-center gap-1.5 rounded-2xl p-2 sm:px-3 sm:py-2 text-xs font-bold transition-all ${
                isNight
                  ? 'text-rose-400 hover:text-white hover:bg-rose-950/40 border border-rose-900/30'
                  : 'text-rose-600 hover:text-white hover:bg-rose-500 border border-rose-200'
              }`}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* PAGE HEADER: Title + Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4" id="bookings-title-section">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className={`text-[11px] font-black uppercase tracking-widest ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
                Live Transactions Engine
              </span>
            </div>
            <h1
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Bookings
            </h1>
            <p className={`text-sm mt-1 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
              See who paid for your events and track each ticket.
            </p>
          </div>

          {/* Quick export / sync button */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                showToast(`Exported ${filteredBookings.length} booking records to CSV!`, 'success');
              }}
              id="btn-export-bookings"
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-sm ${
                isNight
                  ? 'border border-[#2E2545] bg-[#161022] text-[#F5F0FF] hover:bg-[#2E2545] hover:border-[#7C3AED]'
                  : 'border border-[#E8E2F3] bg-white text-[#1A1228] hover:bg-[#F7F5FB] hover:border-[#7C3AED]'
              }`}
            >
              <Download className="h-4 w-4 text-[#A78BFA]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 3. KPI ROW: Total bookings, Successful payments, Pending, Revenue ₦ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="bookings-kpi-row">
          {/* Card 1: Total Bookings */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022]'
                : 'border-[#E8E2F3] bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Total Bookings
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7C3AED]/10 text-[#A78BFA]">
                <Receipt className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                {kpis.totalBookings}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" /> +12% this week
              </span>
            </div>
            <p className={`text-xs mt-1 ${isNight ? 'text-[#B8A9D4]/70' : 'text-[#6B6280]/80'}`}>
              Orders across all published events
            </p>
          </div>

          {/* Card 2: Successful Payments */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022]'
                : 'border-[#E8E2F3] bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Successful Payments
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                {kpis.successfulPayments}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {Math.round((kpis.successfulPayments / (kpis.totalBookings || 1)) * 100)}% conversion
              </span>
            </div>
            <p className={`text-xs mt-1 ${isNight ? 'text-[#B8A9D4]/70' : 'text-[#6B6280]/80'}`}>
              Settled via Paystack checkout
            </p>
          </div>

          {/* Card 3: Pending */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022]'
                : 'border-[#E8E2F3] bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Pending
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <Clock className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                {kpis.pendingCount}
              </span>
              <span className="text-xs font-bold text-amber-400">
                Awaiting bank clearance
              </span>
            </div>
            <p className={`text-xs mt-1 ${isNight ? 'text-[#B8A9D4]/70' : 'text-[#6B6280]/80'}`}>
              USSD / Bank transfer initiated
            </p>
          </div>

          {/* Card 4: Revenue ₦ */}
          <div
            className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022] ring-1 ring-[#7C3AED]/30'
                : 'border-[#E8E2F3] bg-white ring-1 ring-[#7C3AED]/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Revenue ₦
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-indigo-600 text-white shadow-sm shadow-[#7C3AED]/30">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${
                isNight ? 'from-white via-[#F5F0FF] to-[#A78BFA]' : 'from-[#1A1228] to-[#7C3AED]'
              }`}>
                {formatNaira(kpis.totalRevenue)}
              </span>
            </div>
            <p className={`text-xs mt-1 ${isNight ? 'text-[#B8A9D4]/70' : 'text-[#6B6280]/80'}`}>
              Total paid earnings before payout
            </p>
          </div>
        </section>

        {/* 4. FILTERS SECTION: Search, Event Dropdown, Status Chips */}
        <section
          className={`rounded-2xl border p-5 sm:p-6 shadow-sm transition-colors duration-200 space-y-4 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022]'
              : 'border-[#E8E2F3] bg-white'
          }`}
          id="section-bookings-filters"
        >
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className={`h-4 w-4 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or reference…"
                id="input-bookings-search"
                className={`block w-full rounded-2xl border py-2.5 pl-10 pr-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                  isNight
                    ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/50 focus:border-[#7C3AED]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:border-[#7C3AED] focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-bold text-[#B8A9D4] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Event Dropdown: All events, Summer Concert, Afrobeats Night 2026 */}
            <div className="flex items-center gap-2">
              <label htmlFor="select-event-dropdown" className="text-xs font-bold uppercase tracking-wider sr-only">
                Event Selection
              </label>
              <div className="relative min-w-[220px]">
                <select
                  id="select-event-dropdown"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className={`block w-full appearance-none rounded-2xl border py-2.5 pl-4 pr-10 text-xs sm:text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 cursor-pointer ${
                    isNight
                      ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] focus:border-[#7C3AED]'
                      : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] focus:border-[#7C3AED]'
                  }`}
                >
                  <option value="All events">All events</option>
                  <option value="Summer Concert">Summer Concert</option>
                  <option value="Afrobeats Night 2026">Afrobeats Night 2026</option>
                  <option value="Tech Conference">Tech Conference</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                  <ChevronDown className={`h-4 w-4 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Status Chips: All, Paid, Pending, Failed, Refunded */}
          <div className="flex items-center flex-wrap gap-2 pt-2 border-t border-inherit">
            <span className={`text-xs font-bold uppercase tracking-wider mr-1 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
              Status:
            </span>

            {(['All', 'Paid', 'Pending', 'Failed', 'Refunded'] as const).map((status) => {
              const isActive = statusFilter === status;
              const count = status === 'All'
                ? bookings.length
                : bookings.filter((b) => b.status === status).length;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  id={`status-chip-${status.toLowerCase()}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all duration-150 ${
                    isActive
                      ? isNight
                        ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30 ring-1 ring-white/20'
                        : 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
                      : isNight
                      ? 'bg-[#1D162B] text-[#B8A9D4] hover:text-[#F5F0FF] border border-[#2E2545] hover:border-[#7C3AED]'
                      : 'bg-[#F7F5FB] text-[#6B6280] hover:text-[#1A1228] border border-[#E8E2F3] hover:border-[#7C3AED]'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isNight
                        ? 'bg-[#2E2545] text-[#B8A9D4]'
                        : 'bg-[#E8E2F3] text-[#6B6280]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5. BOOKINGS TABLE */}
        <section
          className={`rounded-2xl border overflow-hidden shadow-sm transition-colors duration-200 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022]'
              : 'border-[#E8E2F3] bg-white'
          }`}
          id="section-bookings-table"
        >
          {/* Table Header Bar */}
          <div className="p-4 sm:p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-inherit">
            <div>
              <h2 className={`text-lg font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                Order Records ({filteredBookings.length})
              </h2>
              <p className={`text-xs mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Real-time verified checkout logs synchronized via Paystack webhook.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Webhook Connected
              </span>
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[960px]">
              <thead>
                <tr
                  className={`border-b text-[11px] font-black uppercase tracking-wider ${
                    isNight
                      ? 'border-[#2E2545] bg-[#1D162B]/70 text-[#B8A9D4]'
                      : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#6B6280]'
                  }`}
                >
                  <th className="py-3.5 px-4 sm:px-6">Buyer</th>
                  <th className="py-3.5 px-4">Event</th>
                  <th className="py-3.5 px-4">Ticket Type</th>
                  <th className="py-3.5 px-4">Amount (₦)</th>
                  <th className="py-3.5 px-4">Paystack Reference</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <AlertCircle className="h-8 w-8 text-[#B8A9D4]" />
                        <p className={`text-sm font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                          No bookings match your current filters.
                        </p>
                        <p className={`text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                          Try searching a different keyword or resetting your status filter.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedEvent('All events');
                            setStatusFilter('All');
                          }}
                          className="mt-2 text-xs font-bold text-[#7C3AED] hover:underline"
                        >
                          Reset all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => {
                    return (
                      <tr
                        key={b.id}
                        className={`transition-colors duration-150 group ${
                          isNight
                            ? 'hover:bg-[#1D162B]/80'
                            : 'hover:bg-[#F7F5FB]'
                        }`}
                      >
                        {/* 1. Buyer name + email */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-xl overflow-hidden shrink-0 ring-1 ring-[#7C3AED]/40 bg-gradient-to-tr from-[#7C3AED] to-indigo-600">
                              {b.avatarUrl ? (
                                <img
                                  src={b.avatarUrl}
                                  alt={b.buyerName}
                                  className="h-full w-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center font-black text-xs text-white">
                                  {b.buyerName.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className={`font-bold text-sm leading-snug ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                                {b.buyerName}
                              </div>
                              <div className={`text-xs leading-none mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                                {b.buyerEmail}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* 2. Event */}
                        <td className="py-4 px-4">
                          <span className={`font-bold text-xs ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                            {b.event}
                          </span>
                        </td>

                        {/* 3. Ticket type */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                              b.ticketType === 'VIP' || b.ticketType === 'VVIP Table'
                                ? isNight
                                  ? 'bg-[#7C3AED]/20 text-[#A78BFA] border border-[#7C3AED]/30'
                                  : 'bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20'
                                : b.ticketType === 'Early Bird'
                                ? isNight
                                  ? 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                                  : 'bg-amber-50 text-amber-800 border border-amber-200'
                                : isNight
                                ? 'bg-[#2E2545]/60 text-[#F5F0FF] border border-[#2E2545]'
                                : 'bg-[#F7F5FB] text-[#1A1228] border border-[#E8E2F3]'
                            }`}
                          >
                            <Ticket className="h-3 w-3" />
                            {b.ticketType}
                          </span>
                        </td>

                        {/* 4. Amount (₦) */}
                        <td className="py-4 px-4">
                          <div className={`font-mono font-black text-sm ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                            {formatNaira(b.amount)}
                          </div>
                          {b.quantity > 1 && (
                            <span className={`text-[10px] ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                              ({b.quantity} × {formatNaira(b.amount / b.quantity)})
                            </span>
                          )}
                        </td>

                        {/* 5. Paystack reference */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-mono text-xs ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
                              {b.paystackReference.slice(0, 14)}…
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(b.paystackReference);
                                showToast(`Copied reference: ${b.paystackReference}`);
                              }}
                              title="Copy full reference"
                              className={`p-1 rounded-md transition ${
                                isNight ? 'text-[#B8A9D4] hover:text-white' : 'text-[#6B6280] hover:text-[#1A1228]'
                              }`}
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </td>

                        {/* 6. Date */}
                        <td className="py-4 px-4">
                          <div className={`text-xs font-semibold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                            {b.date}
                          </div>
                          <div className={`text-[11px] ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                            {b.time}
                          </div>
                        </td>

                        {/* 7. Status pill */}
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider border ${
                              b.status === 'Paid'
                                ? isNight
                                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : b.status === 'Pending'
                                ? isNight
                                  ? 'bg-amber-950/50 text-amber-300 border-amber-800/60'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                                : b.status === 'Failed'
                                ? isNight
                                  ? 'bg-rose-950/50 text-rose-300 border-rose-900/60'
                                  : 'bg-rose-50 text-rose-700 border-rose-200'
                                : isNight
                                ? 'bg-[#2E2545] text-[#B8A9D4] border-[#2E2545]'
                                : 'bg-[#E8E2F3] text-[#6B6280] border-[#D6CCE8]'
                            }`}
                          >
                            {b.status === 'Paid' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                            {b.status === 'Pending' && <Clock className="h-3.5 w-3.5 text-amber-400" />}
                            {b.status === 'Failed' && <XCircle className="h-3.5 w-3.5 text-rose-400" />}
                            {b.status === 'Refunded' && <RotateCcw className="h-3.5 w-3.5 text-[#A78BFA]" />}
                            <span>{b.status}</span>
                          </span>
                        </td>

                        {/* 8. Actions: View, Refund */}
                        <td className="py-4 px-4 sm:px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* View Action */}
                            <button
                              type="button"
                              onClick={() => setViewBooking(b)}
                              id={`btn-view-booking-${b.id}`}
                              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold transition shadow-xs ${
                                isNight
                                  ? 'bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545] border border-[#2E2545]'
                                  : 'bg-[#F7F5FB] text-[#1A1228] hover:bg-[#E8E2F3] border border-[#E8E2F3]'
                              }`}
                            >
                              <Eye className="h-3.5 w-3.5 text-[#A78BFA]" />
                              <span>View</span>
                            </button>

                            {/* Refund Action */}
                            <button
                              type="button"
                              onClick={() => setRefundBooking(b)}
                              disabled={b.status === 'Refunded' || b.status === 'Failed'}
                              id={`btn-refund-booking-${b.id}`}
                              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold transition shadow-xs disabled:opacity-40 disabled:cursor-not-allowed ${
                                isNight
                                  ? 'border border-rose-900/50 bg-rose-950/20 text-rose-300 hover:bg-rose-900/40'
                                  : 'border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                              }`}
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span>Refund</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Summary */}
          <div
            className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
              isNight ? 'border-[#2E2545] bg-[#1D162B]/40 text-[#B8A9D4]' : 'border-[#E8E2F3] bg-[#F7F5FB]/60 text-[#6B6280]'
            }`}
          >
            <span>Showing {filteredBookings.length} of {bookings.length} total orders</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="font-bold">Paystack Automated Payout: Every Monday 9:00 AM WAT</span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-12 w-full border-t py-8 text-xs font-semibold transition-colors duration-200 ${
          isNight
            ? 'border-[#2E2545] bg-[#0B0714] text-[#B8A9D4]'
            : 'border-[#E8E2F3] bg-white text-[#6B6280]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF1E83] text-white">
              <Flame className="h-3.5 w-3.5 fill-white" />
            </div>
            <span className={`font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>GoAfterDark</span>
            <span>— Creator Bookings & Payments Portal</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Secured by Paystack</span>
            <span>Organizer: Cynthia Okechukwu</span>
            <span className={`font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>Lagos, Nigeria</span>
          </div>
        </div>
      </footer>

      {/* VIEW BOOKING MODAL */}
      {viewBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setViewBooking(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022] text-[#F5F0FF]'
                : 'border-[#E8E2F3] bg-white text-[#1A1228]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-4 border-inherit">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/20 text-[#A78BFA]">
                  <Receipt className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black">Booking Details</h3>
                  <p className={`text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                    Order {viewBooking.id} • {viewBooking.paystackReference}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewBooking(null)}
                className={`transition ${isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'}`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Buyer Profile Box */}
            <div className={`p-4 rounded-xl border flex items-center gap-4 ${
              isNight ? 'border-[#2E2545] bg-[#1D162B]' : 'border-[#E8E2F3] bg-[#F7F5FB]'
            }`}>
              <div className="h-12 w-12 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#7C3AED]">
                {viewBooking.avatarUrl ? (
                  <img src={viewBooking.avatarUrl} alt={viewBooking.buyerName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center font-black text-white bg-[#7C3AED]">
                    {viewBooking.buyerName.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate">{viewBooking.buyerName}</h4>
                <p className={`text-xs truncate ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>{viewBooking.buyerEmail}</p>
                <span className="inline-block mt-1 text-[10px] font-mono text-emerald-400">
                  Payment Method: {viewBooking.paymentChannel}
                </span>
              </div>
            </div>

            {/* Event & Ticket Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs py-2 border-b border-inherit">
                <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Event Name:</span>
                <span className="font-bold">{viewBooking.event}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-inherit">
                <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Ticket Tier:</span>
                <span className="font-bold text-[#A78BFA]">{viewBooking.ticketType} (Qty: {viewBooking.quantity})</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-inherit">
                <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Transaction Date:</span>
                <span className="font-bold">{viewBooking.date} at {viewBooking.time}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-2 border-b border-inherit">
                <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Payment Status:</span>
                <span className="font-black uppercase text-emerald-400">{viewBooking.status}</span>
              </div>
              <div className="flex items-center justify-between text-base font-black py-2">
                <span>Total Amount Paid:</span>
                <span className="text-xl font-mono text-[#A78BFA]">{formatNaira(viewBooking.amount)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setViewBooking(null)}
                className={`rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                  isNight
                    ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:bg-white'
                }`}
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  const b = viewBooking;
                  setViewBooking(null);
                  setRefundBooking(b);
                }}
                disabled={viewBooking.status === 'Refunded' || viewBooking.status === 'Failed'}
                className="inline-flex items-center gap-1.5 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-xs font-black text-white shadow-md shadow-rose-600/30 transition"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Issue Refund</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REFUND CONFIRMATION MODAL */}
      {refundBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setRefundBooking(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight
                ? 'border-rose-900/50 bg-[#161022] text-[#F5F0FF]'
                : 'border-rose-200 bg-white text-[#1A1228]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-500 border-b pb-3 border-inherit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <RotateCcw className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-rose-500">Confirm Ticket Refund</h3>
                <p className={`text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Order #{refundBooking.id} • {refundBooking.buyerName}
                </p>
              </div>
            </div>

            <div className={`rounded-xl p-3.5 border text-xs leading-relaxed space-y-1.5 ${
              isNight
                ? 'border-rose-900/40 bg-rose-950/20 text-rose-200'
                : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}>
              <p className="font-bold">You are about to refund <strong className="underline">{formatNaira(refundBooking.amount)}</strong>.</p>
              <p>The funds will be returned to {refundBooking.buyerName}'s account ({refundBooking.paymentChannel}) and their ticket barcode will be invalidated immediately.</p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRefundBooking(null)}
                className={`rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                  isNight
                    ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:bg-white'
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmRefund}
                disabled={isProcessingRefund}
                id="btn-confirm-refund-action"
                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 text-xs font-black text-white shadow-md shadow-rose-600/30 transition active:scale-95"
              >
                {isProcessingRefund ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Refund...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Confirm ₦{refundBooking.amount.toLocaleString()} Refund</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300 ${
            toastMessage.type === 'success'
              ? 'border-emerald-700/60 bg-emerald-950/90 text-emerald-200'
              : toastMessage.type === 'error'
              ? 'border-rose-700/60 bg-rose-950/90 text-rose-200'
              : 'border-[#7C3AED]/60 bg-[#161022]/95 text-[#F5F0FF]'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : toastMessage.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-[#A78BFA] shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-bold">{toastMessage.text}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-xs opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </aside>
      )}
    </div>
  );
}

export { CreatorBookings };
