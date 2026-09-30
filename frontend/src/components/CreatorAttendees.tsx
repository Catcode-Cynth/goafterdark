import React, { useState, useMemo } from 'react';
import {
  Flame,
  Search,
  Download,
  QrCode,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Eye,
  Check,
  X,
  Calendar,
  Layers,
  ArrowUpDown,
  Send,
  Printer,
  Copy,
  Volume2,
  VolumeX,
  Camera,
  AlertCircle,
  ShieldCheck,
  MapPin,
  RefreshCw,
  Sun,
  Moon,
  Ticket
} from 'lucide-react';

export interface Attendee {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  avatarBg: string;
  email: string;
  phone: string;
  event: string;
  eventId: string;
  ticketType: 'General' | 'VIP' | 'Early Bird' | 'Backstage' | 'Table of 5';
  status: 'Booked' | 'Checked in' | 'Pending';
  bookedOn: string;
  rawDate: string;
  ticketId: string;
  qrCodeValue: string;
  pricePaid: number;
  checkInTime?: string;
  gateLane?: string;
  checkedInBy?: string;
  notes?: string;
}

const SAMPLE_ATTENDEES: Attendee[] = [
  {
    id: 'att-1',
    name: 'John Doe',
    initials: 'JD',
    avatarBg: 'from-[#FF1E83] to-[#C9005A]',
    email: 'john@email.com',
    phone: '+234 803 123 4567',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'General',
    status: 'Booked',
    bookedOn: '12 Aug 2026',
    rawDate: '2026-08-12',
    ticketId: 'QR-8842',
    qrCodeValue: 'GAD-AFRO-8842-JDOE',
    pricePaid: 45000,
    gateLane: 'Gate 2 (General Entry)',
    notes: 'Requested main floor entrance',
  },
  {
    id: 'att-2',
    name: 'Amara Okeke',
    initials: 'AO',
    avatarBg: 'from-amber-500 to-[#FF1E83]',
    email: 'amara@email.com',
    phone: '+234 812 987 6543',
    event: 'Island Summer Rave',
    eventId: 'evt-2',
    ticketType: 'VIP',
    status: 'Checked in',
    bookedOn: '10 Aug 2026',
    rawDate: '2026-08-10',
    ticketId: 'QR-2291',
    qrCodeValue: 'GAD-RAVE-2291-AOKE',
    pricePaid: 75000,
    checkInTime: '10:42 PM by Gate A',
    gateLane: 'Gate 1 (VIP FastTrack)',
    checkedInBy: 'Cynthia Vance (Lead Host)',
    notes: 'Complimentary champagne pass included',
  },
  {
    id: 'att-3',
    name: 'Tunde Bakare',
    initials: 'TB',
    avatarBg: 'from-[#FF5364] to-[#C9005A]',
    email: 'tunde@email.com',
    phone: '+234 705 334 1122',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'VIP',
    status: 'Booked',
    bookedOn: '15 Aug 2026',
    rawDate: '2026-08-15',
    ticketId: 'QR-1104',
    qrCodeValue: 'GAD-AFRO-1104-TBAK',
    pricePaid: 120000,
    gateLane: 'Gate 1 (VIP FastTrack)',
    notes: 'Access to Sky Deck Lounge',
  },
  {
    id: 'att-4',
    name: 'Chioma Obi',
    initials: 'CO',
    avatarBg: 'from-rose-500 to-[#FF1E83]',
    email: 'chioma@email.com',
    phone: '+234 809 445 7890',
    event: 'Lagos Underground Showcase',
    eventId: 'evt-3',
    ticketType: 'Early Bird',
    status: 'Checked in',
    bookedOn: '08 Aug 2026',
    rawDate: '2026-08-08',
    ticketId: 'QR-5509',
    qrCodeValue: 'GAD-LGUG-5509-COBI',
    pricePaid: 25000,
    checkInTime: '9:18 PM by Gate C',
    gateLane: 'Gate 3 (South Terrace)',
    checkedInBy: 'Emeka N. (Gate Staff)',
  },
  {
    id: 'att-5',
    name: 'Emeka Nwosu',
    initials: 'EN',
    avatarBg: 'from-emerald-500 to-teal-600',
    email: 'emeka@email.com',
    phone: '+234 802 331 4455',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'General',
    status: 'Pending',
    bookedOn: '14 Aug 2026',
    rawDate: '2026-08-14',
    ticketId: 'QR-7723',
    qrCodeValue: 'GAD-AFRO-7723-ENWO',
    pricePaid: 45000,
    gateLane: 'Gate 2 (General Entry)',
    notes: 'Awaiting ID verification on entry',
  },
  {
    id: 'att-6',
    name: 'Fatima Bello',
    initials: 'FB',
    avatarBg: 'from-amber-400 to-orange-500',
    email: 'fatima@email.com',
    phone: '+234 816 778 9900',
    event: 'Island Summer Rave',
    eventId: 'evt-2',
    ticketType: 'General',
    status: 'Checked in',
    bookedOn: '09 Aug 2026',
    rawDate: '2026-08-09',
    ticketId: 'QR-4418',
    qrCodeValue: 'GAD-RAVE-4418-FBEL',
    pricePaid: 35000,
    checkInTime: '11:05 PM by Gate B',
    gateLane: 'Gate 2 (General Entry)',
    checkedInBy: 'Cynthia Vance (Lead Host)',
  },
  {
    id: 'att-7',
    name: 'Zainab Al-Hassan',
    initials: 'ZA',
    avatarBg: 'from-[#FF1E83] to-purple-800',
    email: 'zainab.alhassan@lagosvip.com',
    phone: '+234 803 555 7711',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'Table of 5',
    status: 'Booked',
    bookedOn: '16 Aug 2026',
    rawDate: '2026-08-16',
    ticketId: 'QR-9021',
    qrCodeValue: 'GAD-AFRO-9021-ZALH',
    pricePaid: 450000,
    gateLane: 'VIP Hospitality Suite',
    notes: 'Includes dedicated bottle service & host',
  },
  {
    id: 'att-8',
    name: 'David Adeleke',
    initials: 'DA',
    avatarBg: 'from-emerald-600 to-green-700',
    email: 'david.adeleke@musicgrp.com',
    phone: '+234 901 888 2233',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'Backstage',
    status: 'Pending',
    bookedOn: '18 Aug 2026',
    rawDate: '2026-08-18',
    ticketId: 'QR-3310',
    qrCodeValue: 'GAD-AFRO-3310-DADE',
    pricePaid: 150000,
    gateLane: 'Artist & Press Gate',
    notes: 'Awaiting artist hospitality clearance',
  },
  {
    id: 'att-9',
    name: 'Marcus Sterling',
    initials: 'MS',
    avatarBg: 'from-orange-500 to-amber-600',
    email: 'm.sterling@globalfintech.io',
    phone: '+1 415 555 0198',
    event: 'Lagos Underground Showcase',
    eventId: 'evt-3',
    ticketType: 'VIP',
    status: 'Booked',
    bookedOn: '11 Aug 2026',
    rawDate: '2026-08-11',
    ticketId: 'QR-6649',
    qrCodeValue: 'GAD-LGUG-6649-MSTE',
    pricePaid: 65000,
    gateLane: 'VIP Ballroom Entrance',
    notes: 'Invited to Founder VIP Dinner',
  },
  {
    id: 'att-10',
    name: 'Blessing Eze',
    initials: 'BE',
    avatarBg: 'from-teal-500 to-emerald-600',
    email: 'blessing.eze@creativehub.ng',
    phone: '+234 814 667 8899',
    event: 'Island Summer Rave',
    eventId: 'evt-2',
    ticketType: 'Early Bird',
    status: 'Checked in',
    bookedOn: '07 Aug 2026',
    rawDate: '2026-08-07',
    ticketId: 'QR-1984',
    qrCodeValue: 'GAD-RAVE-1984-BEZE',
    pricePaid: 30000,
    checkInTime: '10:15 PM by Gate B',
    gateLane: 'Gate 2 (General Entry)',
    checkedInBy: 'Samuel K. (Staff)',
  },
  {
    id: 'att-11',
    name: 'Kemi Adeosun',
    initials: 'KA',
    avatarBg: 'from-rose-500 to-[#FF1E83]',
    email: 'kemi.adeosun@lagosstyle.com',
    phone: '+234 803 999 1100',
    event: 'Afrobeats After Dark 2026',
    eventId: 'evt-1',
    ticketType: 'VIP',
    status: 'Booked',
    bookedOn: '13 Aug 2026',
    rawDate: '2026-08-13',
    ticketId: 'QR-4472',
    qrCodeValue: 'GAD-AFRO-4472-KADE',
    pricePaid: 120000,
    gateLane: 'Gate 1 (VIP FastTrack)',
  },
  {
    id: 'att-12',
    name: 'Femi Otedola',
    initials: 'FO',
    avatarBg: 'from-amber-500 to-rose-600',
    email: 'femi.otedola@zenithexec.com',
    phone: '+234 802 111 2233',
    event: 'Lagos Underground Showcase',
    eventId: 'evt-3',
    ticketType: 'VIP',
    status: 'Pending',
    bookedOn: '17 Aug 2026',
    rawDate: '2026-08-17',
    ticketId: 'QR-8210',
    qrCodeValue: 'GAD-LGUG-8210-FOTE',
    pricePaid: 65000,
    gateLane: 'Executive Lounge Gate',
  },
];

const EVENTS_LIST = [
  { id: 'all', name: 'All events' },
  { id: 'evt-1', name: 'Afrobeats After Dark 2026' },
  { id: 'evt-2', name: 'Island Summer Rave' },
  { id: 'evt-3', name: 'Lagos Underground Showcase' },
];

interface CreatorAttendeesProps {
  onExploreClick?: () => void;
  onOpenDashboard?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
}

export default function CreatorAttendees({
  onExploreClick,
  onOpenDashboard,
  onLogout,
  onOpenProfile,
}: CreatorAttendeesProps) {
  // Theme state: Default Night Mode
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const isNight = theme === 'night';

  // Attendees state
  const [attendees, setAttendees] = useState<Attendee[]>(SAMPLE_ATTENDEES);
  const [selectedAttendeeId, setSelectedAttendeeId] = useState<string>('att-1');

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Booked' | 'Checked in' | 'Pending'>('All');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  // Modals & Drawers
  const [isCheckInGateOpen, setIsCheckInGateOpen] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [messageRecipient, setMessageRecipient] = useState<Attendee | null>(null);
  const [messageSubject, setMessageSubject] = useState<string>('Your GoAfterDark Ticket Pass & Entry Gate Information');
  const [messageBody, setMessageBody] = useState<string>('');
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // Scanner Simulator in Check-in Gate
  const [scannerSearch, setScannerSearch] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [scannedResult, setScannedResult] = useState<{ attendee: Attendee; status: 'success' | 'already' | 'notfound' } | null>(null);

  // Notification Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Check in handler
  const handleCheckInToggle = (attendeeId: string) => {
    setAttendees((prev) =>
      prev.map((att) => {
        if (att.id === attendeeId) {
          if (att.status === 'Checked in') {
            showToast(`Undid check-in for ${att.name}`, 'info');
            return {
              ...att,
              status: 'Booked',
              checkInTime: undefined,
              checkedInBy: undefined,
            };
          } else {
            const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            showToast(`✓ Checked in ${att.name} (${att.ticketId}) successfully!`, 'success');
            return {
              ...att,
              status: 'Checked in',
              checkInTime: `${nowTime} by Gate A`,
              checkedInBy: 'Cynthia Vance (Lead Host)',
            };
          }
        }
        return att;
      })
    );
  };

  // Filtered attendees
  const filteredAttendees = useMemo(() => {
    return attendees.filter((att) => {
      // 1. Search Query filter (matches Name, Email, Ticket ID, Phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = att.name.toLowerCase().includes(q);
        const matchesEmail = att.email.toLowerCase().includes(q);
        const matchesTicket = att.ticketId.toLowerCase().includes(q);
        const matchesPhone = att.phone.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesTicket && !matchesPhone) {
          return false;
        }
      }

      // 2. Event Filter
      if (selectedEventId !== 'all' && att.eventId !== selectedEventId) {
        return false;
      }

      // 3. Status Filter
      if (statusFilter !== 'All' && att.status !== statusFilter) {
        return false;
      }

      // 4. Date Range Filter
      if (dateRangeFilter === 'today') {
        return att.rawDate === '2026-08-21' || att.rawDate >= '2026-08-15';
      } else if (dateRangeFilter === 'past-7') {
        return att.rawDate >= '2026-08-10';
      }

      return true;
    });
  }, [attendees, searchQuery, selectedEventId, statusFilter, dateRangeFilter]);

  // Total summary counts
  const totalCount = 324;
  const bookedCount = 210;
  const checkedInCount = 87 + attendees.filter(a => a.status === 'Checked in' && !SAMPLE_ATTENDEES.find(s => s.id === a.id && s.status === 'Checked in')).length;
  const notArrivedCount = 123;

  // Selected Attendee object
  const selectedAttendee = useMemo(() => {
    return attendees.find((a) => a.id === selectedAttendeeId) || attendees[0] || null;
  }, [attendees, selectedAttendeeId]);

  // Export CSV Handler
  const handleExportCSV = () => {
    const headers = ['Ticket ID', 'Full Name', 'Email', 'Phone', 'Event', 'Ticket Type', 'Status', 'Booked Date', 'Price Paid (NGN)'];
    const csvRows = [headers.join(',')];

    filteredAttendees.forEach((att) => {
      const row = [
        `"${att.ticketId}"`,
        `"${att.name}"`,
        `"${att.email}"`,
        `"${att.phone}"`,
        `"${att.event}"`,
        `"${att.ticketType}"`,
        `"${att.status}"`,
        `"${att.bookedOn}"`,
        att.pricePaid,
      ];
      csvRows.push(row.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `goafterdark_attendees_export_${selectedEventId}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredAttendees.length} attendee records to CSV`, 'success');
  };

  // Open Messaging modal for attendee
  const handleOpenMessageModal = (att: Attendee) => {
    setMessageRecipient(att);
    setMessageSubject(`Event Pass & Arrival Notice: ${att.event}`);
    setMessageBody(`Hi ${att.name},\n\nWe look forward to seeing you at ${att.event}!\n\nYour digital entry pass is ${att.ticketId}. Please present this at ${att.gateLane || 'Main Gate'} upon arrival.\n\nBest regards,\nCynthia Vance\nGoAfterDark Host`);
    setIsMessageModalOpen(true);
  };

  // Send message submit
  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageRecipient) return;
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setIsMessageModalOpen(false);
      showToast(`Direct message sent to ${messageRecipient.name} (${messageRecipient.email})`, 'success');
    }, 600);
  };

  // Scanner Simulator action
  const handleSimulateScan = (attIdOrCode: string) => {
    const found = attendees.find(
      (a) => a.ticketId.toLowerCase() === attIdOrCode.toLowerCase() ||
             a.qrCodeValue.toLowerCase() === attIdOrCode.toLowerCase() ||
             a.name.toLowerCase().includes(attIdOrCode.toLowerCase())
    );

    if (found) {
      if (found.status === 'Checked in') {
        setScannedResult({ attendee: found, status: 'already' });
      } else {
        handleCheckInToggle(found.id);
        setScannedResult({ attendee: { ...found, status: 'Checked in' }, status: 'success' });
      }
    } else {
      setScannedResult(null);
      showToast(`No attendee found with code "${attIdOrCode}"`, 'warning');
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredAttendees.length / rowsPerPage) || 1;
  const paginatedAttendees = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredAttendees.slice(start, start + rowsPerPage);
  }, [filteredAttendees, currentPage, rowsPerPage]);

  return (
    <div className={`min-h-screen selection:bg-[#FF1E83] selection:text-white flex flex-col justify-between font-sans transition-colors duration-200 ${
      isNight ? 'bg-[#0A070D] text-[#FAF5FF]' : 'bg-[#FAF8FC] text-[#140E1E]'
    }`}>
      {/* 1. TOP NAVIGATION BAR */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md shadow-sm transition-colors duration-200 ${
        isNight
          ? 'border-[#2A1E38] bg-[#161022]/95 text-[#FAF5FF]'
          : 'border-[#EBE4F0] bg-white/95 text-[#140E1E]'
      }`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: GoAfterDark Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90 text-left"
              id="creator-nav-logo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-sm shadow-[#FF1E83]/30">
                <Flame className="h-5 w-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-black tracking-tight leading-none ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Go<span className="text-[#FF1E83]">AfterDark</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF1E83] mt-0.5">
                  Creator Studio
                </span>
              </div>
            </button>
          </div>

          {/* Center: “Explore Events” and “Profile” Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onExploreClick}
              id="nav-explore-events"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-colors ${
                isNight
                  ? 'text-[#C8BDD4] hover:text-[#FF1E83] hover:bg-[#2A1E38]/50'
                  : 'text-[#7E738C] hover:text-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <Sparkles className="h-4 w-4 text-[#FF1E83]" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => {
                if (onOpenProfile) onOpenProfile();
                else setIsProfileModalOpen(true);
              }}
              id="nav-profile"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-colors ${
                isNight
                  ? 'text-[#C8BDD4] hover:text-[#FF1E83] hover:bg-[#2A1E38]/50'
                  : 'text-[#7E738C] hover:text-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <User className={`h-4 w-4 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`} />
              <span>Profile</span>
            </button>
          </nav>

          {/* Right: 1. Day/Night Toggle, 2. Creator Dashboard Badge, 3. Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Day / Night Theme Toggle */}
            <div
              className={`inline-flex items-center rounded-2xl p-1 border transition-colors ${
                isNight
                  ? 'bg-[#0A070D] border-[#2A1E38]'
                  : 'bg-[#FAF8FC] border-[#EBE4F0]'
              }`}
              role="group"
              aria-label="Theme mode toggle"
            >
              <button
                type="button"
                onClick={() => setTheme('day')}
                id="theme-toggle-day"
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  !isNight
                    ? 'bg-white text-[#FF1E83] shadow-sm ring-1 ring-[#EBE4F0]'
                    : 'text-[#C8BDD4] hover:text-white hover:bg-[#161022]'
                }`}
                aria-label="Day mode"
                title="Switch to Day mode"
              >
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Day</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('night')}
                id="theme-toggle-night"
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isNight
                    ? 'bg-[#FF1E83] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                    : 'text-[#7E738C] hover:text-[#140E1E] hover:bg-white'
                }`}
                aria-label="Night mode"
                title="Switch to Night mode"
              >
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Night</span>
              </button>
            </div>

            <button
              onClick={onOpenDashboard}
              id="nav-creator-dashboard-badge"
              className={`flex items-center gap-2.5 rounded-2xl border px-3.5 py-1.5 text-xs font-bold transition shadow-sm ${
                isNight
                  ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:border-[#FF1E83] hover:bg-[#161022]'
                  : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:border-[#FF1E83] hover:bg-white'
              }`}
              title="Open Main Creator Dashboard"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#FF1E83] text-xs font-black text-white shadow-sm">
                CV
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className={`font-bold leading-tight ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>Creator Studio</span>
                <span className="text-[10px] text-[#FF1E83] font-semibold">Cynthia</span>
              </div>
            </button>

            <button
              onClick={onLogout}
              id="nav-logout-btn"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-bold transition shadow-sm ${
                isNight
                  ? 'border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4] hover:border-rose-800 hover:bg-rose-950/40 hover:text-rose-400'
                  : 'border-[#EBE4F0] bg-white text-[#7E738C] hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* 2. PAGE HEADER */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" id="attendees-header-section">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-3 w-3 rounded-full bg-[#FF1E83] ring-4 ring-[#FF1E83]/20 animate-pulse"></span>
              <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                Attendees
              </h1>
            </div>
            <p className={`mt-1 text-sm ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              See who booked your events, monitor ticket gates, and manage live check-in.
            </p>
          </div>

          {/* Right Side: “Export list” button and Hot Pink “Check-in Gate” button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              id="export-list-btn"
              className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold shadow-sm transition active:scale-95 ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF] hover:border-[#FF1E83] hover:bg-[#2A1E38]/50'
                  : 'border-[#EBE4F0] bg-white text-[#140E1E] hover:border-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <Download className="h-4 w-4 text-[#FF1E83]" />
              <span>Export list</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCheckInGateOpen(true)}
              id="checkin-gate-btn"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#FF1E83]/25 transition hover:brightness-110 active:scale-95"
            >
              <QrCode className="h-4 w-4" />
              <span>Check-in Gate</span>
            </button>
          </div>
        </section>

        {/* 3. SUMMARY CARDS (4 KPIs) */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" id="attendees-kpi-summary">
          {/* Card 1: Total attendees */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:border-[#FF1E83]/50 ${
            isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
          }`}>
            <div className={`flex items-center justify-between text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              <span>Total attendees</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${isNight ? 'bg-[#0A070D] text-[#FF1E83]' : 'bg-[#FAF8FC] text-[#FF1E83]'}`}>
                <Flame className="h-3.5 w-3.5 fill-current" />
              </div>
            </div>
            <div className={`mt-2 text-2xl sm:text-3xl font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
              {totalCount}
            </div>
            <p className={`mt-1 text-[11px] font-semibold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              Across 3 active nightlife events
            </p>
          </div>

          {/* Card 2: Booked / applied */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:border-[#FF1E83]/50 ${
            isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
          }`}>
            <div className={`flex items-center justify-between text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              <span>Booked / confirmed</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${isNight ? 'bg-blue-950/40 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                <Layers className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className={`mt-2 text-2xl sm:text-3xl font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
              {bookedCount}
            </div>
            <p className="mt-1 text-[11px] font-semibold text-blue-400">
              Confirmed ticket holders
            </p>
          </div>

          {/* Card 3: Checked in */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:border-[#FF1E83]/50 ${
            isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
          }`}>
            <div className={`flex items-center justify-between text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              <span>Checked in</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${isNight ? 'bg-emerald-950/40 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className={`mt-2 text-2xl sm:text-3xl font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
              {checkedInCount}
            </div>
            <p className="mt-1 text-[11px] font-semibold text-emerald-400">
              {((checkedInCount / totalCount) * 100).toFixed(1)}% verified gate entry
            </p>
          </div>

          {/* Card 4: Not yet arrived */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-sm transition hover:border-[#FF1E83]/50 ${
            isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
          }`}>
            <div className={`flex items-center justify-between text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
              <span>Not yet arrived</span>
              <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${isNight ? 'bg-amber-950/40 text-[#F59E0B]' : 'bg-amber-50 text-amber-600'}`}>
                <Clock className="h-3.5 w-3.5" />
              </div>
            </div>
            <div className={`mt-2 text-2xl sm:text-3xl font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
              {notArrivedCount}
            </div>
            <p className="mt-1 text-[11px] font-semibold text-[#F59E0B]">
              Expected at venue gates
            </p>
          </div>
        </section>

        {/* 4. FILTERS ROW */}
        <section className={`rounded-2xl border p-4 shadow-sm ${
          isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
        }`} id="attendees-filter-row">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Search input */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className={`h-4 w-4 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                id="search-attendees-input"
                placeholder="Search attendees by name, email, or ticket ID…"
                className={`block w-full rounded-2xl border py-2.5 pl-10 pr-9 text-sm font-semibold focus:outline-none transition ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:bg-[#161022]'
                    : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] placeholder:text-[#7E738C]/60 focus:border-[#FF1E83] focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                    isNight ? 'text-[#C8BDD4] hover:text-[#FAF5FF]' : 'text-[#7E738C] hover:text-[#140E1E]'
                  }`}
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Middle: Event Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="event-filter-select" className={`text-xs font-bold shrink-0 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                Event:
              </label>
              <select
                id="event-filter-select"
                value={selectedEventId}
                onChange={(e) => {
                  setSelectedEventId(e.target.value);
                  setCurrentPage(1);
                }}
                className={`rounded-2xl border px-3.5 py-2.5 text-xs font-bold focus:outline-none transition shadow-sm ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#161022] focus:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white focus:border-[#FF1E83]'
                }`}
              >
                {EVENTS_LIST.map((evt) => (
                  <option key={evt.id} value={evt.id} className={isNight ? 'bg-[#161022] text-[#FAF5FF]' : 'bg-white text-[#140E1E]'}>
                    {evt.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status chips: All, Booked, Checked in, Pending */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {(['All', 'Booked', 'Checked in', 'Pending'] as const).map((st) => {
                const isActive = statusFilter === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStatusFilter(st);
                      setCurrentPage(1);
                    }}
                    id={`status-chip-${st.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`rounded-2xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#FF1E83] text-white shadow-sm shadow-[#FF1E83]/30'
                        : isNight
                        ? 'border border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4] hover:border-[#FF1E83] hover:bg-[#161022] hover:text-[#FAF5FF]'
                        : 'border border-[#EBE4F0] bg-[#FAF8FC] text-[#7E738C] hover:border-[#FF1E83]/50 hover:bg-white hover:text-[#140E1E]'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>

            {/* Date range filter */}
            <div className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 shrink-0 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`} />
              <select
                id="date-range-filter-select"
                value={dateRangeFilter}
                onChange={(e) => {
                  setDateRangeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className={`rounded-2xl border px-3.5 py-2.5 text-xs font-bold focus:outline-none transition shadow-sm ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#161022] focus:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white focus:border-[#FF1E83]'
                }`}
              >
                <option value="all" className={isNight ? 'bg-[#161022] text-[#FAF5FF]' : 'bg-white text-[#140E1E]'}>All Dates</option>
                <option value="today" className={isNight ? 'bg-[#161022] text-[#FAF5FF]' : 'bg-white text-[#140E1E]'}>Tonight (22 Aug)</option>
                <option value="past-7" className={isNight ? 'bg-[#161022] text-[#FAF5FF]' : 'bg-white text-[#140E1E]'}>Past 7 Days</option>
                <option value="aug-2026" className={isNight ? 'bg-[#161022] text-[#FAF5FF]' : 'bg-white text-[#140E1E]'}>August 2026</option>
              </select>
            </div>
          </div>
        </section>

        {/* 5. MAIN CONTENT: ATTENDEES TABLE + OPTIONAL RIGHT SIDE PREVIEW PANEL */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
          {/* Main Attendees Table Column */}
          <div className={`${selectedAttendee ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
            <div className={`overflow-hidden rounded-2xl border shadow-sm ${
              isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm" id="attendees-table">
                  <thead className={`border-b text-[11px] font-black uppercase tracking-wider ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4]'
                      : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#7E738C]'
                  }`}>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 sm:pl-6 pr-3">Attendee</th>
                      <th scope="col" className="py-3.5 px-3">Email</th>
                      <th scope="col" className="py-3.5 px-3">Event</th>
                      <th scope="col" className="py-3.5 px-3">Ticket</th>
                      <th scope="col" className="py-3.5 px-3">Status</th>
                      <th scope="col" className="py-3.5 px-3">Booked on</th>
                      <th scope="col" className="py-3.5 px-3">QR / Ticket ID</th>
                      <th scope="col" className="py-3.5 pr-4 sm:pr-6 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className={`divide-y text-xs font-medium ${
                    isNight
                      ? 'divide-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
                      : 'divide-[#EBE4F0] bg-white text-[#140E1E]'
                  }`}>
                    {paginatedAttendees.map((att) => {
                      const isSelected = selectedAttendee?.id === att.id;
                      return (
                        <tr
                          key={att.id}
                          id={`attendee-row-${att.id}`}
                          onClick={() => setSelectedAttendeeId(att.id)}
                          className={`cursor-pointer transition-colors duration-150 ${
                            isSelected
                              ? isNight
                                ? 'bg-[#2A1E38]/50 border-l-4 border-l-[#FF1E83]'
                                : 'bg-[#FAF8FC] border-l-4 border-l-[#FF1E83]'
                              : isNight
                              ? 'hover:bg-[#2A1E38]/30'
                              : 'hover:bg-[#FAF8FC]/70'
                          }`}
                        >
                          {/* Avatar + Full Name */}
                          <td className="py-3.5 pl-4 sm:pl-6 pr-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${att.avatarBg} text-xs font-black text-white shadow-sm`}
                              >
                                {att.initials}
                              </div>
                              <div>
                                <div className={`font-bold text-sm transition-colors ${
                                  isNight ? 'text-[#FAF5FF] hover:text-[#FF1E83]' : 'text-[#140E1E] hover:text-[#FF1E83]'
                                }`}>
                                  {att.name}
                                </div>
                                <div className={`text-[11px] md:hidden ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                                  {att.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className={`py-3.5 px-3 whitespace-nowrap font-semibold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                            {att.email}
                          </td>

                          {/* Event */}
                          <td className={`py-3.5 px-3 whitespace-nowrap font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                            <span className="line-clamp-1 max-w-[160px]" title={att.event}>
                              {att.event}
                            </span>
                          </td>

                          {/* Ticket Type */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className={`rounded-xl border px-2.5 py-1 text-[11px] font-bold ${
                              att.ticketType === 'VIP' || att.ticketType === 'Backstage' || att.ticketType === 'Table of 5'
                                ? 'border-[#F59E0B]/30 bg-[#F59E0B]/10 text-[#F59E0B]'
                                : isNight
                                ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF]'
                                : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E]'
                            }`}>
                              {att.ticketType}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            {att.status === 'Checked in' ? (
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                isNight
                                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                Checked in
                              </span>
                            ) : att.status === 'Pending' ? (
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                isNight
                                  ? 'bg-amber-950/50 text-[#F59E0B] border border-amber-800'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}>
                                <Clock className="h-3 w-3 text-[#F59E0B]" />
                                Pending
                              </span>
                            ) : (
                              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                isNight
                                  ? 'bg-[#FF1E83]/10 text-[#FF1E83] border border-[#FF1E83]/30'
                                  : 'bg-[#FF1E83]/10 text-[#FF1E83] border border-[#FF1E83]/20'
                              }`}>
                                <Flame className="h-3 w-3 fill-current text-[#FF1E83]" />
                                Booked
                              </span>
                            )}
                          </td>

                          {/* Booked on */}
                          <td className={`py-3.5 px-3 whitespace-nowrap font-semibold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                            {att.bookedOn}
                          </td>

                          {/* QR / Ticket ID */}
                          <td className="py-3.5 px-3 whitespace-nowrap">
                            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-lg border ${
                              isNight
                                ? 'bg-[#0A070D] text-[#FF1E83] border-[#2A1E38]'
                                : 'bg-[#FAF8FC] text-[#FF1E83] border-[#EBE4F0]'
                            }`}>
                              {att.ticketId}
                            </span>
                          </td>

                          {/* Actions: View, Check in, Message */}
                          <td className="py-3.5 pr-4 sm:pr-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                              {/* View button */}
                              <button
                                type="button"
                                onClick={() => setSelectedAttendeeId(att.id)}
                                id={`action-view-${att.id}`}
                                className={`rounded-xl border p-1.5 transition shadow-xs ${
                                  isNight
                                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4] hover:border-[#FF1E83] hover:text-[#FF1E83]'
                                    : 'border-[#EBE4F0] bg-white text-[#7E738C] hover:border-[#FF1E83] hover:text-[#FF1E83]'
                                }`}
                                title="View attendee details"
                                aria-label="View attendee"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>

                              {/* Check in button */}
                              {att.status === 'Checked in' ? (
                                <button
                                  type="button"
                                  onClick={() => handleCheckInToggle(att.id)}
                                  id={`action-checked-${att.id}`}
                                  className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition ${
                                    isNight
                                      ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                  }`}
                                  title="Click to undo check-in"
                                >
                                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                                  <span>Checked</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleCheckInToggle(att.id)}
                                  id={`action-checkin-${att.id}`}
                                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] px-2.5 py-1 text-xs font-bold text-white shadow-xs hover:brightness-110 transition active:scale-95"
                                  title="Check in attendee"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  <span>Check in</span>
                                </button>
                              )}

                              {/* Message button */}
                              <button
                                type="button"
                                onClick={() => handleOpenMessageModal(att)}
                                id={`action-msg-${att.id}`}
                                className={`rounded-xl border p-1.5 transition shadow-xs ${
                                  isNight
                                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4] hover:border-[#FF1E83] hover:text-[#FF1E83]'
                                    : 'border-[#EBE4F0] bg-white text-[#7E738C] hover:border-[#FF1E83] hover:text-[#FF1E83]'
                                }`}
                                title="Message attendee"
                                aria-label="Message attendee"
                              >
                                <MessageSquare className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between border-t px-4 py-3 sm:px-6 gap-3 text-xs font-semibold ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#C8BDD4]'
                  : 'border-[#EBE4F0] bg-white text-[#7E738C]'
              }`}>
                <div className="flex items-center gap-2">
                  <span>
                    Showing <strong className={isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}>1–{Math.min(paginatedAttendees.length, rowsPerPage)}</strong> of <strong className={isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}>{totalCount}</strong> attendees
                  </span>
                  <span className={isNight ? 'text-[#2A1E38]' : 'text-[#EBE4F0]'}>|</span>
                  <span className={`text-[11px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                    ({filteredAttendees.length} filtered results)
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border disabled:opacity-40 transition ${
                      isNight
                        ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38]'
                        : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white'
                    }`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((pg) => (
                      <button
                        key={pg}
                        type="button"
                        onClick={() => setCurrentPage(pg)}
                        className={`h-8 w-8 rounded-xl text-xs font-bold transition ${
                          currentPage === pg
                            ? 'bg-[#FF1E83] text-white shadow-xs'
                            : isNight
                            ? 'border border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38]'
                            : 'border border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage >= totalPages}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border disabled:opacity-40 transition ${
                      isNight
                        ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38]'
                        : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white'
                    }`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 6. RIGHT SIDE PANEL: Selected Attendee Preview */}
          {selectedAttendee && (
            <div className="lg:col-span-4" id="attendee-preview-sidepanel">
              <div className={`sticky top-24 rounded-2xl border p-5 sm:p-6 shadow-sm space-y-5 ${
                isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
              }`}>
                {/* Header with Title & Pass ID */}
                <div className={`flex items-center justify-between border-b pb-3 ${
                  isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'
                }`}>
                  <h3 className={`text-xs font-black uppercase tracking-wider ${
                    isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'
                  }`}>
                    Attendee Preview
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono text-xs font-black px-2 py-0.5 rounded-lg border ${
                      isNight
                        ? 'bg-[#0A070D] text-[#FF1E83] border-[#2A1E38]'
                        : 'bg-[#FAF8FC] text-[#FF1E83] border-[#EBE4F0]'
                    }`}>
                      {selectedAttendee.ticketId}
                    </span>
                  </div>
                </div>

                {/* Attendee Profile Head */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedAttendee.avatarBg} text-lg font-black text-white shadow-md`}
                  >
                    {selectedAttendee.initials}
                  </div>
                  <div>
                    <h4 className={`text-lg font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                      {selectedAttendee.name}
                    </h4>
                    <p className={`text-xs font-semibold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                      {selectedAttendee.email}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] font-bold text-[#FF1E83]">
                      <Phone className="h-3 w-3" />
                      <span>{selectedAttendee.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Entry Gate Badge */}
                <div className={`rounded-2xl border p-3.5 space-y-2 ${
                  isNight ? 'border-[#2A1E38] bg-[#0A070D]' : 'border-[#EBE4F0] bg-[#FAF8FC]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Check-in Status</span>
                    {selectedAttendee.status === 'Checked in' ? (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isNight
                          ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Checked in
                      </span>
                    ) : (
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        isNight
                          ? 'bg-[#FF1E83]/15 text-[#FF1E83] border border-[#FF1E83]/30'
                          : 'bg-rose-50 text-[#FF1E83] border border-rose-200'
                      }`}>
                        <Flame className="h-3.5 w-3.5 fill-current text-[#FF1E83]" />
                        Booked
                      </span>
                    )}
                  </div>

                  {selectedAttendee.checkInTime ? (
                    <div className={`text-xs font-semibold p-2 rounded-xl border flex items-center gap-1.5 ${
                      isNight
                        ? 'text-emerald-400 bg-[#161022] border-emerald-900/50'
                        : 'text-emerald-700 bg-white border-emerald-100'
                    }`}>
                      <Clock className="h-3.5 w-3.5" />
                      <span>Verified: {selectedAttendee.checkInTime}</span>
                    </div>
                  ) : (
                    <div className={`text-xs font-semibold p-2 rounded-xl border flex items-center gap-1.5 ${
                      isNight
                        ? 'text-[#C8BDD4] bg-[#161022] border-[#2A1E38]'
                        : 'text-[#7E738C] bg-white border-[#EBE4F0]'
                    }`}>
                      <MapPin className="h-3.5 w-3.5 text-[#FF1E83]" />
                      <span>Assigned Gate: {selectedAttendee.gateLane || 'Main Gate B'}</span>
                    </div>
                  )}
                </div>

                {/* Event & Pass Details */}
                <div className="space-y-2 text-xs">
                  <div className={`flex justify-between py-1 border-b ${isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'}`}>
                    <span className={`font-medium ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Event:</span>
                    <strong className={`text-right ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>{selectedAttendee.event}</strong>
                  </div>
                  <div className={`flex justify-between py-1 border-b ${isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'}`}>
                    <span className={`font-medium ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Ticket Type:</span>
                    <strong className="text-[#FF1E83]">{selectedAttendee.ticketType}</strong>
                  </div>
                  <div className={`flex justify-between py-1 border-b ${isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'}`}>
                    <span className={`font-medium ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Amount Paid:</span>
                    <strong className="text-[#F59E0B]">₦{selectedAttendee.pricePaid.toLocaleString()}</strong>
                  </div>
                  <div className={`flex justify-between py-1 border-b ${isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'}`}>
                    <span className={`font-medium ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Booked Date:</span>
                    <span className={`font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>{selectedAttendee.bookedOn}</span>
                  </div>
                </div>

                {/* Ticket QR Thumbnail */}
                <div className={`rounded-2xl border border-dashed p-4 text-center space-y-2 ${
                  isNight ? 'border-[#2A1E38] bg-[#0A070D]' : 'border-[#EBE4F0] bg-[#FAF8FC]'
                }`}>
                  <div className={`mx-auto flex h-28 w-28 items-center justify-center rounded-2xl p-2 shadow-xs border ${
                    isNight ? 'bg-white border-[#2A1E38]' : 'bg-white border-[#EBE4F0]'
                  }`}>
                    {/* Simulated High-Res SVG QR Code Pattern with Hot Pink Centers */}
                    <svg viewBox="0 0 100 100" className="h-full w-full text-[#140E1E]">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner 1 */}
                      <rect x="10" y="10" width="24" height="24" fill="#140E1E" />
                      <rect x="14" y="14" width="16" height="16" fill="white" />
                      <rect x="18" y="18" width="8" height="8" fill="#FF1E83" />
                      {/* Corner 2 */}
                      <rect x="66" y="10" width="24" height="24" fill="#140E1E" />
                      <rect x="70" y="14" width="16" height="16" fill="white" />
                      <rect x="74" y="18" width="8" height="8" fill="#FF1E83" />
                      {/* Corner 3 */}
                      <rect x="10" y="66" width="24" height="24" fill="#140E1E" />
                      <rect x="14" y="70" width="16" height="16" fill="white" />
                      <rect x="18" y="74" width="8" height="8" fill="#FF1E83" />
                      {/* Grid dots */}
                      <rect x="42" y="14" width="6" height="6" fill="#140E1E" />
                      <rect x="52" y="20" width="6" height="6" fill="#140E1E" />
                      <rect x="42" y="30" width="6" height="6" fill="#140E1E" />
                      <rect x="14" y="44" width="6" height="6" fill="#140E1E" />
                      <rect x="26" y="50" width="6" height="6" fill="#140E1E" />
                      <rect x="44" y="44" width="12" height="12" fill="#FF1E83" />
                      <rect x="66" y="44" width="6" height="6" fill="#140E1E" />
                      <rect x="78" y="52" width="6" height="6" fill="#140E1E" />
                      <rect x="44" y="66" width="6" height="6" fill="#140E1E" />
                      <rect x="56" y="74" width="6" height="6" fill="#140E1E" />
                      <rect x="68" y="68" width="6" height="6" fill="#140E1E" />
                      <rect x="80" y="76" width="6" height="6" fill="#140E1E" />
                    </svg>
                  </div>
                  <div className={`font-mono text-xs font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                    {selectedAttendee.qrCodeValue}
                  </div>
                  <p className={`text-[10px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                    Scan with GoAfterDark Gate Scanner for instant verification
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  {selectedAttendee.status === 'Checked in' ? (
                    <button
                      type="button"
                      onClick={() => handleCheckInToggle(selectedAttendee.id)}
                      id="preview-undo-checkin-btn"
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl border py-3 text-sm font-bold transition ${
                        isNight
                          ? 'border-emerald-800 bg-emerald-950/50 text-emerald-400 hover:bg-emerald-900/60'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>Checked In (Undo)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCheckInToggle(selectedAttendee.id)}
                      id="preview-checkin-btn"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] py-3 text-sm font-bold text-white shadow-md shadow-[#FF1E83]/25 hover:brightness-110 transition active:scale-95"
                    >
                      <Check className="h-4 w-4" />
                      <span>Check In Attendee</span>
                    </button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMessageModal(selectedAttendee)}
                      id="preview-message-btn"
                      className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border py-2.5 text-xs font-bold transition ${
                        isNight
                          ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38] hover:border-[#FF1E83]'
                          : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white hover:border-[#FF1E83]'
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5 text-[#FF1E83]" />
                      <span>Message</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Printing pass badge for ${selectedAttendee.name}...`, 'info');
                      }}
                      id="preview-print-btn"
                      className={`inline-flex items-center justify-center gap-1.5 rounded-2xl border py-2.5 text-xs font-bold transition ${
                        isNight
                          ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38] hover:border-[#FF1E83]'
                          : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white hover:border-[#FF1E83]'
                      }`}
                    >
                      <Printer className={`h-3.5 w-3.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`} />
                      <span>Print Badge</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className={`mt-12 w-full border-t py-6 text-center text-xs font-semibold ${
        isNight
          ? 'border-[#2A1E38] bg-[#161022] text-[#C8BDD4]'
          : 'border-[#EBE4F0] bg-white text-[#7E738C]'
      }`}>
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 fill-current text-[#FF1E83]" />
            <span className={`font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>GoAfterDark Creator Studio</span>
            <span>— Attendee Operations Engine</span>
          </div>
          <p>© 2026 GoAfterDark Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* 7. CHECK-IN GATE SCANNER MODAL */}
      {isCheckInGateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsCheckInGateOpen(false)}
          role="dialog"
          aria-modal="true"
          id="checkin-gate-modal"
        >
          <div
            className={`relative w-full max-w-xl overflow-hidden rounded-2xl border p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]' : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCheckInGateOpen(false)}
              className={`absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-xl transition ${
                isNight ? 'text-[#C8BDD4] hover:bg-[#0A070D] hover:text-[#FAF5FF]' : 'text-[#7E738C] hover:bg-[#FAF8FC] hover:text-[#140E1E]'
              }`}
              aria-label="Close scanner dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h3 className={`text-lg font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Gate Check-in Terminal
                </h3>
                <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                  Live QR code verification and venue pass entry validation
                </p>
              </div>
            </div>

            {/* Simulated Live Viewfinder */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#0A070D] flex flex-col items-center justify-center text-white border border-[#2A1E38]">
              {/* Laser scanning line animation (Hot Pink) */}
              <div className="absolute inset-x-8 top-1/2 h-0.5 bg-[#FF1E83] shadow-[0_0_14px_#FF1E83] animate-pulse" />

              {/* Viewfinder brackets */}
              <div className="relative h-36 w-36 border-2 border-dashed border-[#FF1E83]/70 rounded-2xl flex items-center justify-center">
                <Camera className="h-8 w-8 text-white/40" />
              </div>

              <div className="absolute bottom-3 inset-x-0 flex items-center justify-between px-4 text-xs font-semibold text-white/80">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  Scanner Active (Gate Lane 1)
                </span>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center gap-1 hover:text-white"
                >
                  {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> : <VolumeX className="h-3.5 w-3.5 text-rose-400" />}
                  <span>{soundEnabled ? 'Beep On' : 'Muted'}</span>
                </button>
              </div>
            </div>

            {/* Manual QR / Ticket Search Form */}
            <div className="mt-4 space-y-3">
              <label className={`block text-xs font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                Manual Ticket / Name Lookup:
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={scannerSearch}
                    onChange={(e) => setScannerSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && scannerSearch.trim()) {
                        handleSimulateScan(scannerSearch.trim());
                      }
                    }}
                    placeholder="Enter QR-8842 or name (e.g. John Doe)..."
                    className={`w-full rounded-2xl border py-2.5 px-3.5 text-sm font-semibold focus:outline-none transition ${
                      isNight
                        ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] placeholder-[#C8BDD4]/50 focus:border-[#FF1E83]'
                        : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] placeholder-[#7E738C]/50 focus:border-[#FF1E83] focus:bg-white'
                    }`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (scannerSearch.trim()) handleSimulateScan(scannerSearch.trim());
                  }}
                  className="rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] px-5 py-2.5 text-sm font-bold text-white hover:brightness-110 transition active:scale-95"
                >
                  Validate
                </button>
              </div>

              {/* Quick Preset Test Scan Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
                <span className={`font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>Quick Test:</span>
                {['QR-8842', 'QR-2291', 'QR-1104', 'QR-5509'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setScannerSearch(code);
                      handleSimulateScan(code);
                    }}
                    className={`rounded-xl border px-2 py-0.5 font-mono text-[11px] font-bold transition ${
                      isNight
                        ? 'border-[#2A1E38] bg-[#0A070D] text-[#FF1E83] hover:bg-[#2A1E38] hover:border-[#FF1E83]'
                        : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#FF1E83] hover:bg-white hover:border-[#FF1E83]'
                    }`}
                  >
                    {code}
                  </button>
                ))}
              </div>

              {/* Scan Outcome Banner */}
              {scannedResult && (
                <div
                  className={`mt-3 p-3.5 rounded-2xl border text-xs font-semibold animate-in fade-in ${
                    scannedResult.status === 'success'
                      ? isNight ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : scannedResult.status === 'already'
                      ? isNight ? 'bg-amber-950/60 border-amber-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'
                      : isNight ? 'bg-rose-950/60 border-rose-800 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5 text-sm">
                      {scannedResult.status === 'success' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>Check-in Approved!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span>Already Checked In</span>
                        </>
                      )}
                    </span>
                    <span className="font-mono text-xs">{scannedResult.attendee.ticketId}</span>
                  </div>
                  <div className="mt-1 text-xs">
                    {scannedResult.attendee.name} • {scannedResult.attendee.ticketType} • {scannedResult.attendee.event}
                  </div>
                </div>
              )}
            </div>

            <div className={`mt-5 border-t pt-4 flex justify-end ${isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'}`}>
              <button
                type="button"
                onClick={() => setIsCheckInGateOpen(false)}
                className={`rounded-2xl border px-5 py-2.5 text-xs font-bold transition ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] hover:bg-[#2A1E38]'
                    : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] hover:bg-white'
                }`}
              >
                Close Terminal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. MESSAGE MODAL */}
      {isMessageModalOpen && messageRecipient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsMessageModalOpen(false)}
          role="dialog"
          aria-modal="true"
          id="message-attendee-modal"
        >
          <div
            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]' : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className={`absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-xl transition ${
                isNight ? 'text-[#C8BDD4] hover:bg-[#0A070D] hover:text-[#FAF5FF]' : 'text-[#7E738C] hover:bg-[#FAF8FC] hover:text-[#140E1E]'
              }`}
              aria-label="Close message dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className={`text-lg font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Message Attendee
                </h3>
                <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                  Send direct notice or ticket assistance to {messageRecipient.name}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendMessageSubmit} className="space-y-3.5 text-xs font-semibold">
              <div className={`rounded-2xl p-3 border flex justify-between items-center ${
                isNight ? 'border-[#2A1E38] bg-[#0A070D]' : 'border-[#EBE4F0] bg-[#FAF8FC]'
              }`}>
                <div>
                  <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}>Recipient:</span>{' '}
                  <strong className={isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}>{messageRecipient.name}</strong> ({messageRecipient.email})
                </div>
                <span className={`font-mono text-[11px] font-bold ${isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'}`}>{messageRecipient.ticketId}</span>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className={`w-full rounded-2xl border py-2.5 px-3.5 text-xs focus:outline-none transition ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] focus:border-[#FF1E83]'
                      : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] focus:border-[#FF1E83] focus:bg-white'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1 ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Message Content (Email & SMS)
                </label>
                <textarea
                  rows={5}
                  required
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className={`w-full rounded-2xl border p-3 text-xs focus:outline-none transition ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0A070D] text-[#FAF5FF] focus:border-[#FF1E83]'
                      : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#140E1E] focus:border-[#FF1E83] focus:bg-white'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMessageModalOpen(false)}
                  className={`rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0A070D] text-[#C8BDD4] hover:bg-[#2A1E38] hover:text-[#FAF5FF]'
                      : 'border-[#EBE4F0] bg-[#FAF8FC] text-[#7E738C] hover:bg-white'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingMessage}
                  className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{isSendingMessage ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. CREATOR PROFILE MODAL */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsProfileModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]' : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className={`absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-xl transition ${
                isNight ? 'text-[#C8BDD4] hover:bg-[#0A070D] hover:text-[#FAF5FF]' : 'text-[#7E738C] hover:bg-[#FAF8FC] hover:text-[#140E1E]'
              }`}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-2xl font-black text-white shadow-lg shadow-[#FF1E83]/30">
                CV
              </div>
              <div>
                <h3 className={`text-xl font-black ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>
                  Cynthia Vance
                </h3>
                <p className="text-xs font-bold text-[#FF1E83]">
                  Verified Premier Event Organizer
                </p>
                <p className={`text-xs mt-0.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}`}>
                  cynthia@goafterdark.live • Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className={`mt-5 space-y-2.5 rounded-2xl p-4 text-xs border ${
              isNight ? 'border-[#2A1E38] bg-[#0A070D]' : 'border-[#EBE4F0] bg-[#FAF8FC]'
            }`}>
              <div className="flex justify-between">
                <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}>Account ID:</span>
                <span className={`font-mono font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>ORG-CYNTHIA-8821</span>
              </div>
              <div className="flex justify-between">
                <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}>Live Events Hosted:</span>
                <span className={`font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>4 Nightlife Events</span>
              </div>
              <div className="flex justify-between">
                <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#7E738C]'}>Check-in Gate Staff:</span>
                <span className="font-bold text-emerald-400">3 Operators Active</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="w-full rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#C9005A] py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-110"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. NOTIFICATION TOAST */}
      {toast && (
        <aside
          aria-label="Notification"
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl animate-in slide-in-from-bottom-5 duration-200 max-w-md ${
            isNight
              ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
              : 'border-[#EBE4F0] bg-white text-[#140E1E]'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          ) : (
            <Sparkles className="h-5 w-5 text-[#FF1E83] shrink-0" />
          )}
          <span className={`text-xs font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className={`ml-auto ${isNight ? 'text-[#C8BDD4] hover:text-[#FAF5FF]' : 'text-[#7E738C] hover:text-[#140E1E]'}`}
          >
            <X className="h-4 w-4" />
          </button>
        </aside>
      )}
    </div>
  );
}
