import React, { useState, useMemo } from 'react';
import {
  Ticket,
  Search,
  Calendar,
  MapPin,
  QrCode,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight,
  User,
  LogOut,
  CreditCard,
  ShieldCheck,
  Zap,
  Tag,
  ArrowRight,
  Filter,
  Check,
  X,
  Eye,
  Share2,
  Info,
  Phone,
  Mail,
  AlertCircle,
  Sun,
  Moon,
  Heart,
  Plus,
  Minus,
  Receipt,
  Smartphone,
  ChevronDown,
  Layers,
  Compass,
  Flame
} from 'lucide-react';

export interface PublishedEvent {
  id: string;
  title: string;
  category: 'Concerts' | 'Theatre' | 'Sports' | 'Culture' | 'This weekend';
  image: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  spotsLeft: number;
  badge?: string;
  organizer: string;
  description: string;
  isFavorite?: boolean;
  ticketTiers: {
    id: string;
    name: string;
    price: number;
    description: string;
    available: number;
  }[];
}

export interface MyBooking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  time: string;
  venue: string;
  ticketType: string;
  ticketId: string;
  qrValue: string;
  amountPaid: number;
  paymentMethod: 'Paystack' | 'Card' | 'Bank Transfer';
  paymentStatus: 'Paid';
  checkInStatus: 'Not checked in' | 'Checked in';
  checkInTime?: string;
  bookedOn: string;
  quantity: number;
  gateLane: string;
}

const PUBLISHED_EVENTS_DATA: PublishedEvent[] = [
  {
    id: 'pub-1',
    title: 'Afrobeats Night 2026',
    category: 'Concerts',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    date: 'Fri, 28 Aug 2026',
    time: '7:00 PM WAT',
    venue: 'Eko Convention Centre',
    location: 'Victoria Island, Lagos',
    price: 15000,
    spotsLeft: 24,
    badge: 'Selling fast',
    organizer: 'Flytime Live Lagos',
    description: 'The definitive Lagos nightlife concert experience featuring headline sets by Burna Boy, Asake, Tems, live percussion, and VIP sky deck lounges.',
    isFavorite: true,
    ticketTiers: [
      { id: 't1-1', name: 'General Admission', price: 15000, description: 'Arena floor access with open standing & direct stage view', available: 24 },
      { id: 't1-2', name: 'VIP Front Row', price: 35000, description: 'FastTrack entry, front stage deck & welcome cocktail', available: 8 },
      { id: 't1-3', name: 'Table of 5 (VVIP)', price: 175000, description: 'Mezzanine booth with dedicated host & bottle service', available: 2 },
    ],
  },
  {
    id: 'pub-2',
    title: 'Summer Concert Live',
    category: 'Concerts',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    date: 'Sun, 30 Aug 2026',
    time: '5:30 PM WAT',
    venue: 'Landmark Beach Arena',
    location: 'Oniru, Victoria Island, Lagos',
    price: 20000,
    spotsLeft: 12,
    badge: '12 spots left',
    organizer: 'GoAfterDark Live',
    description: 'Open-air beachfront electronic & afro-fusion festival under the night sky with beach cabanas, craft cocktails, and sunset DJ sets.',
    isFavorite: true,
    ticketTiers: [
      { id: 't2-1', name: 'Beach Pass (General)', price: 20000, description: 'Festival grounds entry & beachfront stage access', available: 12 },
      { id: 't2-2', name: 'Cabana VIP Pass', price: 50000, description: 'Shaded VIP cabana, private beach bar & snack tray', available: 4 },
    ],
  },
  {
    id: 'pub-3',
    title: 'Tech Conference Lagos 2026',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
    date: 'Thu, 03 Sep 2026',
    time: '9:00 AM WAT',
    venue: 'Landmark Centre Hall 1 & 2',
    location: 'Water Corporation Dr, Lagos',
    price: 25000,
    spotsLeft: 45,
    badge: 'Hot ticket',
    organizer: 'Lagos Tech Innovators',
    description: 'West Africa’s flagship gathering of venture founders, software architects, AI builders, product leaders, and after-hours networking mixers.',
    isFavorite: false,
    ticketTiers: [
      { id: 't3-1', name: 'Standard Delegate', price: 25000, description: 'Full conference keynote access, workshops & lunch buffet', available: 35 },
      { id: 't3-2', name: 'Executive VIP Pass', price: 65000, description: 'Founders lounge, private networking dinner & speaker swag', available: 10 },
    ],
  },
  {
    id: 'pub-4',
    title: 'Death & The King’s Horseman',
    category: 'Theatre',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80',
    date: 'Sat, 05 Sep 2026',
    time: '6:00 PM WAT',
    venue: 'Terra Kulture Theatre',
    location: 'Tiamiyu Savage, Victoria Island, Lagos',
    price: 12000,
    spotsLeft: 18,
    badge: 'Limited seats',
    organizer: 'Bolanle Austen-Peters Productions',
    description: 'A theatrical production of Wole Soyinka’s Nobel Prize-winning classic performed by veteran Nigerian stage luminaries.',
    isFavorite: false,
    ticketTiers: [
      { id: 't4-1', name: 'Standard Gallery', price: 12000, description: 'Tiered gallery seating with optimal stage view', available: 18 },
      { id: 't4-2', name: 'Patrons Box Seat', price: 30000, description: 'Lower tier private box with intermission champagne', available: 5 },
    ],
  },
  {
    id: 'pub-5',
    title: 'Lagos City Night Marathon & 10K',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    date: 'Sat, 12 Sep 2026',
    time: '6:30 PM WAT',
    venue: 'Tafawa Balewa Square (TBS)',
    location: 'Lagos Island, Lagos',
    price: 10000,
    spotsLeft: 80,
    badge: 'Registration open',
    organizer: 'Athletics Federation of Nigeria',
    description: 'Electrifying night run through illuminated Lagos bridges, neon tunnels, hydration music stages, and finisher medal party.',
    isFavorite: false,
    ticketTiers: [
      { id: 't5-1', name: '10km Runner Bib + Medal', price: 10000, description: 'Official chip-timed bib, glow t-shirt & finisher medal', available: 80 },
      { id: 't5-2', name: '42km Elite Marathon', price: 15000, description: 'Elite category timing, energy gels & recovery tent pass', available: 40 },
    ],
  },
  {
    id: 'pub-6',
    title: 'Eyo Heritage Cultural Gala',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
    date: 'Sun, 20 Sep 2026',
    time: '11:00 AM WAT',
    venue: 'Tafawa Balewa Square',
    location: 'Lagos Island, Lagos',
    price: 8000,
    spotsLeft: 55,
    badge: 'Cultural showcase',
    organizer: 'Lagos State Ministry of Tourism',
    description: 'Spectacular Adimu Orisha Play, white-robed masquerades, traditional drums, royal processions, and authentic Lagos culinary arts.',
    isFavorite: false,
    ticketTiers: [
      { id: 't6-1', name: 'Grandstand Seat', price: 8000, description: 'Shaded spectator seating in main TBS pavilion', available: 55 },
      { id: 't6-2', name: 'VIP Dignitary Lounge', price: 25000, description: 'Air-conditioned hospitality suite with traditional buffet', available: 10 },
    ],
  },
];

const INITIAL_MY_BOOKINGS: MyBooking[] = [
  {
    id: 'bk-1',
    eventId: 'pub-1',
    eventTitle: 'Afrobeats Night 2026',
    eventImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    date: 'Fri, 28 Aug 2026',
    time: '7:00 PM WAT',
    venue: 'Eko Convention Centre, Victoria Island',
    ticketType: 'General Admission',
    ticketId: 'GAD-8842',
    qrValue: 'GAD-AFRO-8842-CYNTHIA',
    amountPaid: 15000,
    paymentMethod: 'Paystack',
    paymentStatus: 'Paid',
    checkInStatus: 'Not checked in',
    bookedOn: '12 Aug 2026',
    quantity: 1,
    gateLane: 'Gate 2 (General Entry)',
  },
  {
    id: 'bk-2',
    eventId: 'pub-2',
    eventTitle: 'Summer Concert Live',
    eventImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
    date: 'Sun, 30 Aug 2026',
    time: '5:30 PM WAT',
    venue: 'Landmark Beach Arena, Oniru Lagos',
    ticketType: 'VIP Pass',
    ticketId: 'GAD-2291',
    qrValue: 'GAD-SUMM-2291-CYNTHIA',
    amountPaid: 35000,
    paymentMethod: 'Paystack',
    paymentStatus: 'Paid',
    checkInStatus: 'Checked in',
    checkInTime: '7:42 PM on 30 Aug',
    bookedOn: '10 Aug 2026',
    quantity: 1,
    gateLane: 'Gate 1 (VIP FastTrack)',
  },
];

interface AttendeeDashboardProps {
  onLogout?: () => void;
  onOpenCreatorView?: () => void;
}

export default function AttendeeDashboard({
  onLogout,
  onOpenCreatorView,
}: AttendeeDashboardProps) {
  // Theme state: Default this mockup to NIGHT mode
  // Hot pink: #FF1E83, Soft red/coral: #FF5364, Mustard gold: #F59E0B
  // Night tokens: page #0B0714, cards #161022, text #F5F0FF, muted #C8BDD4, borders #2A1E38
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const isNight = theme === 'night';

  // Navigation active tab: 'explore' | 'my-tickets' | 'profile'
  const [activeNavTab, setActiveNavTab] = useState<'explore' | 'my-tickets' | 'profile'>('explore');

  // Search & Category Chips for Hero
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Events list state (supports toggling favorites)
  const [events, setEvents] = useState<PublishedEvent[]>(PUBLISHED_EVENTS_DATA);

  // User's private bookings (for Cynthia only)
  const [myBookings, setMyBookings] = useState<MyBooking[]>(INITIAL_MY_BOOKINGS);

  // Quick Booking Strip State (docked interactive booking controller)
  const [selectedEventForBooking, setSelectedEventForBooking] = useState<PublishedEvent>(PUBLISHED_EVENTS_DATA[0]);
  const [selectedTierId, setSelectedTierId] = useState<string>(PUBLISHED_EVENTS_DATA[0].ticketTiers[0].id);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);

  // Modals
  const [activeTicketModal, setActiveTicketModal] = useState<MyBooking | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [eventDetailModal, setEventDetailModal] = useState<PublishedEvent | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Toggle favorite heart on an event
  const handleToggleHeart = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const nextFav = !evt.isFavorite;
          showToast(
            nextFav
              ? `Added "${evt.title}" to saved favorites`
              : `Removed "${evt.title}" from saved favorites`,
            'info'
          );
          return { ...evt, isFavorite: nextFav };
        }
        return evt;
      })
    );
  };

  // Switch selected event in booking strip
  const handleSelectEventForBooking = (event: PublishedEvent) => {
    setSelectedEventForBooking(event);
    setSelectedTierId(event.ticketTiers[0]?.id || 't1-1');
    setTicketQuantity(1);
    const bookingStripEl = document.getElementById('quick-booking-strip');
    bookingStripEl?.scrollIntoView({ behavior: 'smooth' });
  };

  // Current chosen tier & total amount calculation
  const currentTier = useMemo(() => {
    return (
      selectedEventForBooking.ticketTiers.find((t) => t.id === selectedTierId) ||
      selectedEventForBooking.ticketTiers[0]
    );
  }, [selectedEventForBooking, selectedTierId]);

  const totalBookingAmount = useMemo(() => {
    return currentTier.price * ticketQuantity;
  }, [currentTier, ticketQuantity]);

  // Execute Paystack Payment
  const handlePayWithPaystack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newTicketId = 'GAD-' + Math.floor(1000 + Math.random() * 9000);
      const newBooking: MyBooking = {
        id: 'bk-' + Date.now(),
        eventId: selectedEventForBooking.id,
        eventTitle: selectedEventForBooking.title,
        eventImage: selectedEventForBooking.image,
        date: selectedEventForBooking.date,
        time: selectedEventForBooking.time,
        venue: `${selectedEventForBooking.venue}, ${selectedEventForBooking.location}`,
        ticketType: currentTier.name,
        ticketId: newTicketId,
        qrValue: `GAD-${newTicketId}-CYNTHIA`,
        amountPaid: totalBookingAmount,
        paymentMethod: 'Paystack',
        paymentStatus: 'Paid',
        checkInStatus: 'Not checked in',
        bookedOn: '22 Aug 2026',
        quantity: ticketQuantity,
        gateLane: currentTier.name.toLowerCase().includes('vip')
          ? 'Gate 1 (VIP FastTrack)'
          : 'Gate 2 (General Entry)',
      };

      setMyBookings((prev) => [newBooking, ...prev]);
      showToast(
        `✓ Paystack payment of ₦${totalBookingAmount.toLocaleString()} successful! Pass ${newTicketId} added to My Tickets.`,
        'success'
      );

      // Auto scroll to My Tickets
      const ticketsSection = document.getElementById('my-tickets-section');
      ticketsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 1100);
  };

  // Download QR Code Simulation
  const handleDownloadQR = (booking: MyBooking) => {
    showToast(`Digital pass (${booking.ticketId}) downloaded to your device!`, 'info');
  };

  // Filter published events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = evt.title.toLowerCase().includes(q);
        const matchesVenue = evt.venue.toLowerCase().includes(q);
        const matchesDesc = evt.description.toLowerCase().includes(q);
        const matchesCategory = evt.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesVenue && !matchesDesc && !matchesCategory) {
          return false;
        }
      }

      // 2. Category Filter
      if (activeCategory === 'All') return true;
      if (activeCategory === 'This weekend') {
        return evt.date.includes('Fri') || evt.date.includes('Sat') || evt.date.includes('Sun');
      }
      return evt.category.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [events, searchQuery, activeCategory]);

  return (
    <div
      className={`min-h-screen selection:bg-[#FF1E83] selection:text-white flex flex-col justify-between font-sans transition-colors duration-200 ${
        isNight ? 'bg-[#0B0714] text-[#F5F0FF]' : 'bg-[#FAF8FC] text-[#140E1E]'
      }`}
    >
      {/* 1. TOP NAVIGATION HEADER */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md shadow-sm transition-colors duration-200 ${
          isNight
            ? 'border-[#2A1E38] bg-[#161022]/95 text-[#F5F0FF]'
            : 'border-[#EAE2F2] bg-white/95 text-[#140E1E]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: GoAfterDark Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                setActiveNavTab('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90 text-left"
              id="goafterdark-nav-logo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20">
                <Flame className="h-5 w-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-black tracking-tight leading-none ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
                  }`}
                >
                  GoAfter<span className="text-[#FF1E83]">Dark</span>
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#FF1E83]'}`}>
                  Your pass to the night
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links: Explore Events (selected), My Tickets, Profile */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setActiveNavTab('explore');
                const el = document.getElementById('discover-hero');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="nav-tab-explore-events"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                activeNavTab === 'explore'
                  ? 'bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                  : isNight
                  ? 'text-[#C8BDD4] hover:text-[#F5F0FF] hover:bg-[#2A1E38]/50'
                  : 'text-[#6B5E78] hover:text-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => {
                setActiveNavTab('my-tickets');
                const el = document.getElementById('my-tickets-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="nav-tab-my-tickets"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 relative ${
                activeNavTab === 'my-tickets'
                  ? 'bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                  : isNight
                  ? 'text-[#C8BDD4] hover:text-[#F5F0FF] hover:bg-[#2A1E38]/50'
                  : 'text-[#6B5E78] hover:text-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <Ticket className="h-4 w-4" />
              <span>My Tickets</span>
              {myBookings.length > 0 && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                    activeNavTab === 'my-tickets'
                      ? 'bg-white text-[#FF1E83]'
                      : 'bg-[#FF1E83] text-white'
                  }`}
                >
                  {myBookings.length}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setActiveNavTab('profile');
                setIsProfileModalOpen(true);
              }}
              id="nav-tab-profile"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all duration-150 ${
                activeNavTab === 'profile'
                  ? 'bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                  : isNight
                  ? 'text-[#C8BDD4] hover:text-[#F5F0FF] hover:bg-[#2A1E38]/50'
                  : 'text-[#6B5E78] hover:text-[#FF1E83] hover:bg-[#FAF8FC]'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </nav>

          {/* Top Right: dark/light toggle, then avatar “Cynthia”, then Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1. Dark/Light Mode Selector (Sun / Moon) */}
            <div
              className={`inline-flex items-center rounded-2xl p-1 border transition-colors ${
                isNight ? 'bg-[#0B0714] border-[#2A1E38]' : 'bg-[#FAF8FC] border-[#EAE2F2]'
              }`}
              role="group"
              aria-label="Theme mode selector"
              id="theme-mode-toggle-group"
            >
              <button
                type="button"
                onClick={() => setTheme('day')}
                id="theme-toggle-day"
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  !isNight
                    ? 'bg-white text-[#FF1E83] shadow-sm ring-1 ring-[#EAE2F2]'
                    : 'text-[#C8BDD4] hover:text-white hover:bg-[#161022]'
                }`}
                aria-label="Day mode"
                title="Switch to Day mode"
              >
                <Sun className={`h-4 w-4 ${!isNight ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#C8BDD4]'}`} />
                <span className="hidden sm:inline">Day</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('night')}
                id="theme-toggle-night"
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isNight
                    ? 'bg-[#FF1E83] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                    : 'text-[#6B5E78] hover:text-[#140E1E] hover:bg-white'
                }`}
                aria-label="Night mode"
                title="Switch to Night mode (Default)"
              >
                <Moon className={`h-4 w-4 ${isNight ? 'text-white fill-white' : 'text-[#6B5E78]'}`} />
                <span className="hidden sm:inline">Night</span>
              </button>
            </div>

            {/* 2. Avatar + name (Cynthia) */}
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(true)}
              id="attendee-avatar-badge"
              className={`flex items-center gap-2.5 rounded-2xl border px-3 py-1.5 text-xs font-bold shadow-sm transition ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#F5F0FF] hover:border-[#FF1E83]'
                  : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#140E1E] hover:border-[#FF1E83]'
              }`}
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] text-xs font-black text-white shadow-sm">
                CY
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className={`font-bold leading-tight ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                  Cynthia
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Verified Pass Holder
                </span>
              </div>
            </button>

            {/* 3. Logout */}
            <button
              onClick={onLogout}
              id="attendee-logout-btn"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-bold transition shadow-sm ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#C8BDD4] hover:border-rose-800 hover:bg-rose-950/40 hover:text-rose-400'
                  : 'border-[#EAE2F2] bg-white text-[#6B5E78] hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
              title="Logout from GoAfterDark"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* HERO SECTION */}
        <section
          className={`relative overflow-hidden rounded-2xl border p-6 sm:p-10 shadow-sm transition-colors ${
            isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EAE2F2] bg-white'
          }`}
          id="discover-hero"
        >
          {/* Vibrant Hot Pink Glow Accent */}
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#FF1E83]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-40 h-32 w-32 rounded-full bg-[#FF5364]/10 blur-2xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold border ${
                isNight
                  ? 'border-[#2A1E38] bg-[#0B0714] text-[#FF1E83]'
                  : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#FF1E83]'
              }`}
            >
              <Flame className="h-3.5 w-3.5 fill-[#FF1E83]" />
              <span>GoAfterDark Eventee Hub</span>
            </div>

            {/* Exact hero heading and subtitle as specified */}
            <h1
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
              }`}
            >
              Discover events
            </h1>

            <p
              className={`text-base leading-relaxed ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              Browse events, book a seat, and keep your tickets in one place.
            </p>

            {/* Search Input: Search concerts, theatre, sports, culture… */}
            <div className="pt-2">
              <div className="relative max-w-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className={`h-4 w-4 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id="attendee-search-events"
                  placeholder="Search concerts, theatre, sports, culture…"
                  className={`block w-full rounded-2xl border py-3.5 pl-11 pr-10 text-sm font-semibold transition focus:outline-none shadow-xs ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0B0714] text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:bg-[#161022]'
                      : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#140E1E] placeholder:text-[#6B5E78]/60 focus:border-[#FF1E83] focus:bg-white'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3.5 ${
                      isNight ? 'text-[#C8BDD4] hover:text-[#F5F0FF]' : 'text-[#6B5E78] hover:text-[#140E1E]'
                    }`}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Chips: All, Concerts, Theatre, Sports, Culture, This weekend (selected chip in hot pink) */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold mr-1 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                Filter by:
              </span>
              {['All', 'Concerts', 'Theatre', 'Sports', 'Culture', 'This weekend'].map((chip) => {
                const isSelected = activeCategory === chip;
                return (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setActiveCategory(chip)}
                    id={`filter-chip-${chip.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`rounded-2xl px-4 py-1.5 text-xs font-bold transition-all duration-150 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30 ring-1 ring-white/20'
                        : isNight
                        ? 'border border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4] hover:border-[#FF1E83] hover:bg-[#161022] hover:text-[#F5F0FF]'
                        : 'border border-[#EAE2F2] bg-[#FAF8FC] text-[#6B5E78] hover:border-[#FF1E83]/50 hover:bg-white hover:text-[#140E1E]'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 1 — ALL EVENTS (FROM CREATORS) */}
        <section className="space-y-6" id="all-events-section">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#FF1E83] animate-pulse"></span>
                <h2
                  className={`text-2xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
                  }`}
                >
                  All events
                </h2>
              </div>
              <p
                className={`mt-0.5 text-xs font-medium ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                }`}
              >
                Top concerts, theatre, sports, cultural galas & live shows in Lagos
              </p>
            </div>

            <div
              className={`text-xs font-bold px-3 py-1.5 rounded-2xl self-start sm:self-auto border ${
                isNight
                  ? 'border-[#2A1E38] bg-[#161022] text-[#C8BDD4]'
                  : 'border-[#EAE2F2] bg-white text-[#6B5E78]'
              }`}
            >
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event available' : 'events available'}
            </div>
          </div>

          {/* Card Grid (3 columns) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                id={`event-card-${evt.id}`}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#FF1E83] hover:shadow-xl hover:shadow-[#FF1E83]/10 ${
                  isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EAE2F2] bg-white'
                }`}
              >
                {/* Image + Badges + Heart Favorite */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B0714]">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-90" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-xl bg-black/70 px-2.5 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md border border-white/10">
                      <Tag className="h-3 w-3 text-[#FF1E83]" />
                      {evt.category}
                    </span>
                  </div>

                  {/* Badges & Favorite Heart */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {evt.badge && (
                      <span className="inline-flex items-center gap-1 rounded-xl bg-[#F59E0B] px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-black shadow-md">
                        <Sparkles className="h-3 w-3 fill-black" />
                        {evt.badge}
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => handleToggleHeart(evt.id, e)}
                      id={`heart-btn-${evt.id}`}
                      className={`flex h-8 w-8 items-center justify-center rounded-xl backdrop-blur-md border transition-all ${
                        evt.isFavorite
                          ? 'bg-[#FF1E83] text-white border-[#FF1E83] shadow-md shadow-[#FF1E83]/30 scale-105'
                          : 'bg-black/60 text-white/80 border-white/20 hover:bg-black hover:text-[#FF1E83]'
                      }`}
                      title={evt.isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={`h-4 w-4 ${evt.isFavorite ? 'fill-white text-white' : 'hover:fill-[#FF1E83]'}`}
                      />
                    </button>
                  </div>

                  {/* Price in NGN (mustard gold) */}
                  <div className="absolute bottom-3 right-3 rounded-xl bg-black/80 px-3 py-1 text-xs font-black text-[#F59E0B] shadow-md backdrop-blur-md border border-white/10">
                    From ₦{evt.price.toLocaleString()}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                  <div className="space-y-2">
                    {/* Date & Time */}
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF1E83]">
                      <Calendar className="h-3.5 w-3.5 shrink-0" />
                      <span>{evt.date}</span>
                      <span className={`font-normal ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                        • {evt.time}
                      </span>
                    </div>

                    {/* Event Title */}
                    <h3
                      className={`text-lg font-black tracking-tight group-hover:text-[#FF1E83] transition-colors line-clamp-1 ${
                        isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
                      }`}
                    >
                      {evt.title}
                    </h3>

                    {/* Lagos Venue */}
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF1E83]" />
                      <span className="line-clamp-1 font-medium">{evt.venue}</span>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed pt-1 ${
                        isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                      }`}
                    >
                      {evt.description}
                    </p>
                  </div>

                  {/* Action Buttons: "Book ticket" (hot pink) and "View details" */}
                  <div
                    className={`flex items-center gap-2 pt-3 border-t ${
                      isNight ? 'border-[#2A1E38]' : 'border-[#EAE2F2]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectEventForBooking(evt)}
                      id={`btn-book-ticket-${evt.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] py-2.5 px-3 text-xs font-bold text-white shadow-md shadow-[#FF1E83]/25 transition hover:brightness-110 active:scale-95"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>Book ticket</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEventDetailModal(evt)}
                      id={`btn-view-details-${evt.id}`}
                      className={`inline-flex items-center justify-center gap-1 rounded-2xl border py-2.5 px-3 text-xs font-bold transition ${
                        isNight
                          ? 'border-[#2A1E38] bg-[#0B0714] text-[#F5F0FF] hover:border-[#FF1E83] hover:bg-[#161022]'
                          : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#140E1E] hover:border-[#FF1E83] hover:bg-white hover:text-[#FF1E83]'
                      }`}
                    >
                      <span>View details</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* BOOKING STRIP (HOT PINK PAYSTACK BUTTON) */}
        <section
          id="quick-booking-strip"
          className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 shadow-md transition-all ${
            isNight
              ? 'border-[#2A1E38] bg-[#161022]'
              : 'border-[#EAE2F2] bg-white'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* Left: Selected Event Info */}
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0714]">
                <img
                  src={selectedEventForBooking.image}
                  alt={selectedEventForBooking.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#FF1E83]/20 border border-[#FF1E83]/40 px-2 py-0.5 text-[10px] font-bold text-[#FF1E83]">
                    Instant Paystack Checkout
                  </span>
                  <span className={`text-xs font-semibold ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    {selectedEventForBooking.date}
                  </span>
                </div>
                <h3 className={`text-base font-black line-clamp-1 ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                  {selectedEventForBooking.title}
                </h3>
                <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  {selectedEventForBooking.venue}
                </p>
              </div>
            </div>

            {/* Middle: Ticket Type Selection & Quantity */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Ticket Type Dropdown */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  Ticket Type
                </label>
                <select
                  value={selectedTierId}
                  onChange={(e) => setSelectedTierId(e.target.value)}
                  id="booking-strip-tier-select"
                  className={`rounded-2xl border px-3 py-2 text-xs font-bold focus:outline-none transition ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0B0714] text-[#F5F0FF] focus:border-[#FF1E83]'
                      : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#140E1E] focus:border-[#FF1E83]'
                  }`}
                >
                  {selectedEventForBooking.ticketTiers.map((tier) => (
                    <option key={tier.id} value={tier.id} className={isNight ? 'bg-[#161022] text-[#F5F0FF]' : 'bg-white text-[#140E1E]'}>
                      {tier.name} — ₦{tier.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity (+ / -) */}
              <div>
                <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  Quantity
                </label>
                <div
                  className={`flex items-center rounded-2xl border ${
                    isNight ? 'border-[#2A1E38] bg-[#0B0714]' : 'border-[#EAE2F2] bg-[#FAF8FC]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    className={`px-2.5 py-1.5 text-xs font-bold transition ${
                      isNight ? 'text-[#C8BDD4] hover:text-[#F5F0FF]' : 'text-[#6B5E78] hover:text-[#140E1E]'
                    }`}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className={`w-7 text-center text-xs font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                    {ticketQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                    className={`px-2.5 py-1.5 text-xs font-bold transition ${
                      isNight ? 'text-[#C8BDD4] hover:text-[#F5F0FF]' : 'text-[#6B5E78] hover:text-[#140E1E]'
                    }`}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Total NGN */}
              <div className="text-left sm:text-right pl-2">
                <span className={`block text-[10px] font-bold uppercase tracking-wider ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  Total Amount
                </span>
                <span className="text-lg font-black text-[#F59E0B]">
                  ₦{totalBookingAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Right: Hot Pink button "Pay with Paystack" */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePayWithPaystack}
                disabled={isProcessingPayment}
                id="booking-strip-pay-btn"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 disabled:opacity-60"
              >
                <CreditCard className="h-4 w-4" />
                <span>
                  {isProcessingPayment
                    ? 'Connecting Paystack…'
                    : `Pay with Paystack • ₦${totalBookingAmount.toLocaleString()}`}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2 — MY TICKETS (THIS ATTENDEE ONLY) */}
        <section className="space-y-6" id="my-tickets-section">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4 ${
              isNight ? 'border-[#2A1E38]' : 'border-[#EAE2F2]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-[#FF1E83]" />
                <h2
                  className={`text-2xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
                  }`}
                >
                  My tickets
                </h2>
              </div>
              <p
                className={`mt-0.5 text-xs font-medium ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                }`}
              >
                Your confirmed passes and digital QR barcodes for upcoming events
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`rounded-2xl px-3 py-1 text-xs font-bold border ${
                  isNight
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {myBookings.length} Active Digital Passes
              </span>
            </div>
          </div>

          {/* Cards list for THIS attendee only */}
          {myBookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {myBookings.map((booking) => {
                const isCheckedIn = booking.checkInStatus === 'Checked in';
                return (
                  <div
                    key={booking.id}
                    id={`my-booking-card-${booking.id}`}
                    className={`relative flex flex-col sm:flex-row items-stretch justify-between overflow-hidden rounded-2xl border p-5 shadow-sm transition hover:border-[#FF1E83]/60 ${
                      isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EAE2F2] bg-white'
                    }`}
                  >
                    {/* Left details */}
                    <div className="flex-1 space-y-3 pr-0 sm:pr-4">
                      {/* Status Badges: Payment: Paid, Check-in status, Ticket ID */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-black border ${
                            isNight
                              ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                          Payment: Paid
                        </span>

                        {isCheckedIn ? (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-black border ${
                              isNight
                                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            <Check className="h-3 w-3 text-emerald-400" />
                            Checked in
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-black border ${
                              isNight
                                ? 'bg-[#FF1E83]/15 text-[#FF1E83] border-[#FF1E83]/30'
                                : 'bg-[#FF1E83]/10 text-[#FF1E83] border-[#FF1E83]/20'
                            }`}
                          >
                            <Clock className="h-3 w-3 text-[#FF1E83]" />
                            Not checked in
                          </span>
                        )}

                        <span
                          className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                            isNight
                              ? 'text-[#FF1E83] bg-[#0B0714] border-[#2A1E38]'
                              : 'text-[#FF1E83] bg-[#FAF8FC] border-[#EAE2F2]'
                          }`}
                        >
                          {booking.ticketId}
                        </span>
                      </div>

                      {/* Event Title & Ticket Type */}
                      <div>
                        <h3 className={`text-lg font-black tracking-tight ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                          {booking.eventTitle}
                        </h3>
                        <p className={`text-xs font-semibold ${isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'}`}>
                          Tier: {booking.ticketType} • {booking.quantity} {booking.quantity === 1 ? 'Pass' : 'Passes'}
                        </p>
                      </div>

                      {/* Venue & Date */}
                      <div className={`space-y-1 text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 shrink-0 text-[#FF1E83]" />
                          <span>{booking.date} at {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#FF1E83]" />
                          <span className="line-clamp-1">{booking.venue}</span>
                        </div>
                      </div>

                      {/* Amount Paid & Gate Lane */}
                      <div className="flex items-center justify-between pt-1">
                        <div>
                          <span className={`text-[10px] uppercase font-bold tracking-wider block ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                            Amount Paid (Paystack)
                          </span>
                          <span className="text-sm font-black text-[#F59E0B]">
                            ₦{booking.amountPaid.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] uppercase font-bold tracking-wider block ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                            Assigned Gate
                          </span>
                          <span className={`text-xs font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                            {booking.gateLane}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side: QR Thumbnail & Action Buttons */}
                    <div
                      className={`mt-4 sm:mt-0 flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 border-t sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4 ${
                        isNight ? 'border-[#2A1E38]' : 'border-[#EAE2F2]'
                      }`}
                    >
                      {/* QR Thumbnail Preview */}
                      <div
                        onClick={() => setActiveTicketModal(booking)}
                        className="group/qr relative flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-[#EAE2F2] cursor-pointer hover:ring-2 hover:ring-[#FF1E83] transition shadow-xs"
                        title="Click to view full digital pass"
                      >
                        {/* SVG QR Code Simulation */}
                        <div className="h-20 w-20 flex flex-col justify-between p-1 bg-white">
                          <div className="flex justify-between">
                            <div className="h-5 w-5 bg-black border-2 border-white ring-1 ring-black flex items-center justify-center">
                              <div className="h-2 w-2 bg-black" />
                            </div>
                            <div className="h-5 w-5 bg-black border-2 border-white ring-1 ring-black flex items-center justify-center">
                              <div className="h-2 w-2 bg-black" />
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <div className="grid grid-cols-4 gap-0.5">
                              <div className="h-1.5 w-1.5 bg-black" />
                              <div className="h-1.5 w-1.5 bg-[#FF1E83]" />
                              <div className="h-1.5 w-1.5 bg-black" />
                              <div className="h-1.5 w-1.5 bg-black" />
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="h-5 w-5 bg-black border-2 border-white ring-1 ring-black flex items-center justify-center">
                              <div className="h-2 w-2 bg-black" />
                            </div>
                            <div className="h-4 w-4 border-2 border-dashed border-[#FF1E83] flex items-center justify-center">
                              <div className="h-1 w-1 bg-[#FF1E83]" />
                            </div>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-black tracking-tight mt-0.5">
                          SCAN AT GATE
                        </span>
                      </div>

                      {/* Action buttons: View ticket / Download QR */}
                      <div className="flex flex-col gap-1.5 w-full sm:w-28">
                        <button
                          type="button"
                          onClick={() => setActiveTicketModal(booking)}
                          id={`btn-view-pass-${booking.id}`}
                          className="inline-flex items-center justify-center gap-1 rounded-xl bg-[#FF1E83] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-xs hover:bg-[#FF0070] transition"
                        >
                          <Eye className="h-3 w-3" />
                          <span>View ticket</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadQR(booking)}
                          id={`btn-download-qr-${booking.id}`}
                          className={`inline-flex items-center justify-center gap-1 rounded-xl border px-2.5 py-1.5 text-[11px] font-bold transition ${
                            isNight
                              ? 'border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4] hover:text-[#F5F0FF] hover:border-[#FF1E83]'
                              : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#6B5E78] hover:text-[#140E1E] hover:border-[#FF1E83]'
                          }`}
                        >
                          <Download className="h-3 w-3" />
                          <span>Download QR</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={`rounded-2xl border p-12 text-center ${
                isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EAE2F2] bg-white'
              }`}
            >
              <Ticket className="mx-auto h-12 w-12 text-[#C8BDD4]/40" />
              <h3 className={`mt-3 text-base font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                No tickets booked yet
              </h3>
              <p className={`mt-1 text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                Browse the events above and book your first seat with Paystack.
              </p>
            </div>
          )}
        </section>

        {/* SECTION 3 — BOOKING & CHECK-IN HISTORY (THIS USER ONLY) */}
        <section className="space-y-6" id="history-section">
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-4 ${
              isNight ? 'border-[#2A1E38]' : 'border-[#EAE2F2]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-[#FF1E83]" />
                <h2
                  className={`text-2xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'
                  }`}
                >
                  Booking & check-in history
                </h2>
              </div>
              <p
                className={`mt-0.5 text-xs font-medium ${
                  isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
                }`}
              >
                Detailed receipts, Paystack transaction totals & admission check-in timestamps
              </p>
            </div>

            <span className={`text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
              {myBookings.length} Total Transactions
            </span>
          </div>

          {/* History Table / Clean Records */}
          <div
            className={`overflow-hidden rounded-2xl border shadow-sm ${
              isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EAE2F2] bg-white'
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead
                  className={`border-b text-[11px] font-black uppercase tracking-wider ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4]'
                      : 'border-[#EAE2F2] bg-[#FAF8FC] text-[#6B5E78]'
                  }`}
                >
                  <tr>
                    <th className="py-3.5 pl-5 pr-3">Date Booked</th>
                    <th className="px-3 py-3.5">Event</th>
                    <th className="px-3 py-3.5">Ticket ID & Tier</th>
                    <th className="px-3 py-3.5">Paystack ₦ Amount</th>
                    <th className="px-3 py-3.5">Check-in Status / Time</th>
                    <th className="py-3.5 pl-3 pr-5 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y font-medium ${
                    isNight ? 'divide-[#2A1E38]' : 'divide-[#EAE2F2]'
                  }`}
                >
                  {myBookings.map((bk) => (
                    <tr
                      key={bk.id}
                      className={`transition-colors ${
                        isNight ? 'hover:bg-[#0B0714]/60' : 'hover:bg-[#FAF8FC]'
                      }`}
                    >
                      {/* Date Booked */}
                      <td className={`py-4 pl-5 pr-3 whitespace-nowrap font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                        {bk.bookedOn}
                      </td>

                      {/* Event */}
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={bk.eventImage}
                            alt=""
                            className="h-9 w-9 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className={`font-black block text-sm ${isNight ? 'text-[#F5F0FF]' : 'text-[#140E1E]'}`}>
                              {bk.eventTitle}
                            </span>
                            <span className={`text-[11px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                              {bk.date} • {bk.venue.split(',')[0]}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Ticket ID & Tier */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-bold text-[#FF1E83] block">
                          {bk.ticketId}
                        </span>
                        <span className={`text-[11px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                          {bk.ticketType} ({bk.quantity}x)
                        </span>
                      </td>

                      {/* Paystack ₦ Amount */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 px-2.5 py-1 text-xs font-black text-[#F59E0B]">
                          <span>₦{bk.amountPaid.toLocaleString()}</span>
                          <span className="text-[9px] font-bold uppercase text-[#F59E0B]/80">(Paid)</span>
                        </div>
                      </td>

                      {/* Check-in Time or Upcoming */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        {bk.checkInStatus === 'Checked in' ? (
                          <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                            <span>{bk.checkInTime || 'Checked in at Gate'}</span>
                          </div>
                        ) : (
                          <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                            <Clock className="h-3.5 w-3.5 shrink-0 text-[#FF1E83]" />
                            <span>Upcoming (Not checked in)</span>
                          </div>
                        )}
                      </td>

                      {/* View Pass Action */}
                      <td className="py-4 pl-3 pr-5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => setActiveTicketModal(bk)}
                          className={`inline-flex items-center gap-1 font-bold text-xs text-[#FF1E83] hover:underline`}
                        >
                          <span>View pass</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-16 border-t py-8 text-center text-xs transition-colors ${
          isNight
            ? 'border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4]'
            : 'border-[#EAE2F2] bg-white text-[#6B5E78]'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF1E83] text-white">
              <Flame className="h-3.5 w-3.5 fill-white" />
            </div>
            <span className="font-bold">GoAfterDark</span>
            <span>— Your pass to the night</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span>© 2026 GoAfterDark Live Ltd.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secured by Paystack
            </span>
          </div>
        </div>
      </footer>

      {/* FULL DIGITAL PASS MODAL */}
      {activeTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#F5F0FF]' : 'border-[#EAE2F2] bg-white text-[#140E1E]'
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-5 bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 fill-white" />
                <span className="font-black text-sm uppercase tracking-wider">Official GoAfterDark Pass</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTicketModal(null)}
                className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Ticket Pass Format */}
            <div className="p-6 space-y-6">
              {/* Event Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#FF1E83]/15 text-[#FF1E83] font-bold text-xs px-2.5 py-0.5 border border-[#FF1E83]/30">
                    {activeTicketModal.ticketType}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#F59E0B]">
                    {activeTicketModal.ticketId}
                  </span>
                </div>
                <h3 className="text-xl font-black">{activeTicketModal.eventTitle}</h3>
                <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  {activeTicketModal.venue}
                </p>
                <p className="text-xs font-bold text-[#FF1E83]">
                  {activeTicketModal.date} • {activeTicketModal.time}
                </p>
              </div>

              {/* Large Vector QR Code */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-black shadow-inner">
                <div className="h-44 w-44 flex flex-col justify-between p-2 border-4 border-black rounded-lg">
                  <div className="flex justify-between">
                    <div className="h-12 w-12 bg-black border-4 border-white ring-2 ring-black flex items-center justify-center">
                      <div className="h-5 w-5 bg-black" />
                    </div>
                    <div className="h-12 w-12 bg-black border-4 border-white ring-2 ring-black flex items-center justify-center">
                      <div className="h-5 w-5 bg-black" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="grid grid-cols-5 gap-1">
                      <div className="h-2.5 w-2.5 bg-black" />
                      <div className="h-2.5 w-2.5 bg-[#FF1E83]" />
                      <div className="h-2.5 w-2.5 bg-black" />
                      <div className="h-2.5 w-2.5 bg-[#FF1E83]" />
                      <div className="h-2.5 w-2.5 bg-black" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-12 w-12 bg-black border-4 border-white ring-2 ring-black flex items-center justify-center">
                      <div className="h-5 w-5 bg-black" />
                    </div>
                    <div className="h-10 w-10 border-2 border-dashed border-[#FF1E83] flex items-center justify-center">
                      <div className="h-4 w-4 bg-[#FF1E83]" />
                    </div>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="font-mono text-xs font-black tracking-widest block text-black">
                    {activeTicketModal.qrValue}
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold">
                    Present barcode at {activeTicketModal.gateLane}
                  </span>
                </div>
              </div>

              {/* Attendee Info */}
              <div
                className={`rounded-2xl border p-4 text-xs space-y-2 ${
                  isNight ? 'border-[#2A1E38] bg-[#0B0714]' : 'border-[#EAE2F2] bg-[#FAF8FC]'
                }`}
              >
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Attendee Name:</span>
                  <span className="font-bold">Cynthia (cynthia@goafterdark.live)</span>
                </div>
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Payment Status:</span>
                  <span className="font-black text-emerald-400">Paid via Paystack (₦{activeTicketModal.amountPaid.toLocaleString()})</span>
                </div>
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Admission Status:</span>
                  <span className="font-bold text-[#FF1E83]">{activeTicketModal.checkInStatus}</span>
                </div>
              </div>

              {/* Download QR Action Button */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadQR(activeTicketModal);
                    setActiveTicketModal(null);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] py-3 text-sm font-bold text-white shadow-md hover:brightness-110 transition"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Pass to Device</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EVENT DETAIL MODAL */}
      {eventDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`relative w-full max-w-lg overflow-hidden rounded-3xl border shadow-2xl max-h-[90vh] flex flex-col ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#F5F0FF]' : 'border-[#EAE2F2] bg-white text-[#140E1E]'
            }`}
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src={eventDetailModal.image}
                alt={eventDetailModal.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setEventDetailModal(null)}
                className="absolute top-4 right-4 rounded-full bg-black/60 p-2 text-white hover:bg-black transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-[#FF1E83] uppercase tracking-wider">
                  {eventDetailModal.category} • Organized by {eventDetailModal.organizer}
                </span>
                <h3 className="text-2xl font-black mt-1">{eventDetailModal.title}</h3>
              </div>

              <div className={`space-y-1.5 text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#FF1E83]" />
                  <span>{eventDetailModal.date} at {eventDetailModal.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FF1E83]" />
                  <span>{eventDetailModal.venue}, {eventDetailModal.location}</span>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                {eventDetailModal.description}
              </p>

              {/* Tiers list */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider">Available Ticket Tiers</h4>
                <div className="space-y-2">
                  {eventDetailModal.ticketTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={`flex items-center justify-between rounded-xl border p-3 ${
                        isNight ? 'border-[#2A1E38] bg-[#0B0714]' : 'border-[#EAE2F2] bg-[#FAF8FC]'
                      }`}
                    >
                      <div>
                        <span className="font-bold text-xs block">{tier.name}</span>
                        <span className={`text-[11px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                          {tier.description}
                        </span>
                      </div>
                      <span className="font-black text-sm text-[#F59E0B] shrink-0 ml-3">
                        ₦{tier.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    handleSelectEventForBooking(eventDetailModal);
                    setEventDetailModal(null);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] py-3 text-sm font-bold text-white shadow-md hover:brightness-110 transition"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Proceed to Booking Strip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE MODAL */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-3xl border shadow-2xl p-6 space-y-5 ${
              isNight ? 'border-[#2A1E38] bg-[#161022] text-[#F5F0FF]' : 'border-[#EAE2F2] bg-white text-[#140E1E]'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-4 border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] text-white font-black text-base">
                  CY
                </div>
                <div>
                  <h3 className="font-black text-lg">Cynthia</h3>
                  <p className={`text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    cynthia@goafterdark.live
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="rounded-full p-1 text-[#C8BDD4] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={`space-y-3 text-xs ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
              <div className="flex justify-between">
                <span>Account Type:</span>
                <span className="font-bold text-[#FF1E83]">Verified Eventee</span>
              </div>
              <div className="flex justify-between">
                <span>Passes Owned:</span>
                <span className="font-bold text-white">{myBookings.length} Active Tickets</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Payment:</span>
                <span className="font-bold text-emerald-400">Paystack Nigeria (NGN)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsProfileModalOpen(false);
                onLogout?.();
              }}
              className="w-full rounded-2xl border border-rose-800 bg-rose-950/40 py-2.5 text-xs font-bold text-rose-400 hover:bg-rose-900/60 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* TOAST POPUP */}
      {toastMessage && (
        <div className="fixed bottom-14 right-6 z-50 flex items-center gap-2 rounded-2xl border border-[#FF1E83]/40 bg-[#161022] px-4 py-3 text-xs font-bold text-white shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5">
          <Sparkles className="h-4 w-4 text-[#FF1E83]" />
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
