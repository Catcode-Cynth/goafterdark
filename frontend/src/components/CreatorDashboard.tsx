import React, { useState, useMemo } from 'react';
import {
  Ticket,
  Search,
  Plus,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  Eye,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Filter,
  Check,
  X,
  AlertCircle,
  QrCode,
  Share2,
  Download,
  Sun,
  Moon,
  User,
  Flame,
  ArrowLeft
} from 'lucide-react';

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time?: string;
  location?: string;
  status: 'Published' | 'Draft' | 'Completed' | 'Upcoming';
  ticketsSold: number;
  capacity: number;
  peopleApplied: number;
  checkedIn: number;
  pricePerTicket: number;
  revenue: number;
  category: string;
  image?: string;
}

export interface CreatorDashboardProps {
  onExploreClick?: () => void;
  onLogout?: () => void;
  onOpenProfile?: () => void;
  onViewAttendees?: () => void;
  onCreateEventClick?: () => void;
}

const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    name: 'Afrobeats Night 2026',
    date: '25 Jul 2026',
    time: '8:00 PM',
    location: 'Eko Convention Centre, Victoria Island, Lagos',
    status: 'Published',
    ticketsSold: 186,
    capacity: 250,
    peopleApplied: 210,
    checkedIn: 142,
    pricePerTicket: 15000,
    revenue: 2790000,
    category: 'Concert & Nightlife',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-2',
    name: 'Summer Beach Rave Lagos',
    date: '12 Aug 2026',
    time: '6:30 PM',
    location: 'Landmark Beach Arena, Oniru, Lagos',
    status: 'Published',
    ticketsSold: 84,
    capacity: 120,
    peopleApplied: 92,
    checkedIn: 24,
    pricePerTicket: 15000,
    revenue: 1260000,
    category: 'Festival & Music',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-3',
    name: 'Tech Innovators Summit Lagos',
    date: '05 Sep 2026',
    time: '9:00 AM',
    location: 'Civic Centre, Ozumba Mbadiwe, Lagos',
    status: 'Draft',
    ticketsSold: 0,
    capacity: 300,
    peopleApplied: 45,
    checkedIn: 0,
    pricePerTicket: 25000,
    revenue: 0,
    category: 'Tech & Business',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt-4',
    name: 'VIP Rooftop Lounge Session',
    date: '18 Jul 2026',
    time: '7:00 PM',
    location: 'The View Lounge, Ikoyi, Lagos',
    status: 'Completed',
    ticketsSold: 54,
    capacity: 54,
    peopleApplied: 54,
    checkedIn: 52,
    pricePerTicket: 15000,
    revenue: 810000,
    category: 'Exclusive VIP',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
  },
];

export const CreatorDashboard: React.FC<CreatorDashboardProps> = ({
  onExploreClick,
  onLogout,
  onOpenProfile,
  onViewAttendees,
  onCreateEventClick,
}) => {
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const totalRevenue = useMemo(
    () => events.reduce((acc, curr) => acc + curr.revenue, 0),
    [events]
  );
  const totalTicketsSold = useMemo(
    () => events.reduce((acc, curr) => acc + curr.ticketsSold, 0),
    [events]
  );
  const totalCapacity = useMemo(
    () => events.reduce((acc, curr) => acc + curr.capacity, 0),
    [events]
  );
  const totalCheckedIn = useMemo(
    () => events.reduce((acc, curr) => acc + curr.checkedIn, 0),
    [events]
  );

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        evt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === 'All' || evt.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [events, searchQuery, selectedStatus]);

  const handleDeleteEvent = (id: string, name: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast(`"${name}" has been deleted.`);
  };

  const isNight = theme === 'night';

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        isNight ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white shadow-xl shadow-purple-900/30 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-purple-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md ${
          isNight
            ? 'bg-slate-950/80 border-slate-800/80'
            : 'bg-white/80 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onExploreClick && (
              <button
                onClick={onExploreClick}
                className={`p-2 rounded-xl border transition-colors ${
                  isNight
                    ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                title="Back to Public Explore"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                  GoAfterDark
                </span>
                <span
                  className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                    isNight
                      ? 'bg-purple-950/50 text-purple-300 border-purple-800/60'
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}
                >
                  Creator Studio
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isNight ? 'day' : 'night')}
              className={`p-2 rounded-xl border transition-colors ${
                isNight
                  ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-amber-400'
                  : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-600'
              }`}
              title={isNight ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            >
              {isNight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* View Attendees */}
            {onViewAttendees && (
              <button
                onClick={onViewAttendees}
                className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  isNight
                    ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
                }`}
              >
                <Users className="w-4 h-4 text-purple-400" />
                <span>Attendees</span>
              </button>
            )}

            {/* Create Event CTA */}
            <button
              onClick={onCreateEventClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </button>

            {/* Profile */}
            {onOpenProfile && (
              <button
                onClick={onOpenProfile}
                className={`p-2 rounded-xl border transition-colors ${
                  isNight
                    ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-sm'
                }`}
                title="Creator Profile"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Logout */}
            {onLogout && (
              <button
                onClick={onLogout}
                className={`p-2 rounded-xl border transition-colors text-rose-400 hover:text-rose-300 ${
                  isNight
                    ? 'border-slate-800 bg-slate-900 hover:bg-slate-800'
                    : 'border-slate-200 bg-white hover:bg-slate-100 shadow-sm'
                }`}
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Creator Dashboard
            </h1>
            <p className={`text-sm mt-1 ${isNight ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage your ticket sales, attendee check-ins, and live event capacity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Exporting event report as CSV...')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-colors ${
                isNight
                  ? 'border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
              }`}
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Revenue */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isNight
                ? 'bg-slate-900/70 border-slate-800/80 shadow-inner'
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Total Revenue
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">
              ₦{totalRevenue.toLocaleString()}
            </div>
            <div className="mt-2 flex items-center text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>+18.4% this month</span>
            </div>
          </div>

          {/* Tickets Sold */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isNight
                ? 'bg-slate-900/70 border-slate-800/80 shadow-inner'
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Tickets Sold
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">
              {totalTicketsSold}{' '}
              <span className={`text-sm font-normal ${isNight ? 'text-slate-500' : 'text-slate-400'}`}>
                / {totalCapacity}
              </span>
            </div>
            <div className="mt-2 flex items-center text-xs text-purple-400 font-medium">
              <Activity className="w-3.5 h-3.5 mr-1" />
              <span>
                {totalCapacity > 0 ? Math.round((totalTicketsSold / totalCapacity) * 100) : 0}% booked capacity
              </span>
            </div>
          </div>

          {/* Active Events */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isNight
                ? 'bg-slate-900/70 border-slate-800/80 shadow-inner'
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Active Events
              </span>
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">
              {events.filter((e) => e.status === 'Published').length}
            </div>
            <div className={`mt-2 flex items-center text-xs ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
              <Clock className="w-3.5 h-3.5 mr-1 text-indigo-400" />
              <span>{events.filter((e) => e.status === 'Draft').length} draft in review</span>
            </div>
          </div>

          {/* Checked In */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isNight
                ? 'bg-slate-900/70 border-slate-800/80 shadow-inner'
                : 'bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Checked In
              </span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">
              {totalCheckedIn}
            </div>
            <div className="mt-2 flex items-center text-xs text-sky-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>
                {totalTicketsSold > 0 ? Math.round((totalCheckedIn / totalTicketsSold) * 100) : 0}% attendance rate
              </span>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div
          className={`rounded-2xl border overflow-hidden ${
            isNight ? 'bg-slate-900/70 border-slate-800/80' : 'bg-white border-slate-200/80 shadow-sm'
          }`}
        >
          {/* Header & Filters */}
          <div className="p-5 border-b border-inherit flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Your Events</h2>
              <p className={`text-xs mt-0.5 ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Showing {filteredEvents.length} of {events.length} total events
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events, venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm border outline-none transition-colors ${
                    isNight
                      ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-purple-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'
                  }`}
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl border border-inherit bg-slate-950/20">
                {['All', 'Published', 'Draft', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedStatus === status
                        ? 'bg-purple-600 text-white shadow-sm'
                        : isNight
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Table / List */}
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 mx-auto text-slate-500 opacity-60 mb-3" />
              <h3 className="font-semibold text-base">No events found</h3>
              <p className={`text-xs mt-1 ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                Try adjusting your search query or status filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr
                    className={`border-b text-xs uppercase tracking-wider font-semibold ${
                      isNight
                        ? 'border-slate-800/80 text-slate-400 bg-slate-950/40'
                        : 'border-slate-200 text-slate-500 bg-slate-50/60'
                    }`}
                  >
                    <th className="py-3.5 px-5">Event</th>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Tickets Sold</th>
                    <th className="py-3.5 px-4">Revenue</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-inherit">
                  {filteredEvents.map((evt) => (
                    <tr
                      key={evt.id}
                      className={`transition-colors ${
                        isNight ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Event Title & Category */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {evt.image ? (
                            <img
                              src={evt.image}
                              alt={evt.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-inherit"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center shrink-0 text-purple-400">
                              <Calendar className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-semibold truncate max-w-xs">{evt.name}</h4>
                            <p className={`text-xs truncate max-w-xs mt-0.5 ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                              {evt.location || evt.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Date & Time */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-medium text-xs">{evt.date}</div>
                        <div className={`text-[11px] ${isNight ? 'text-slate-400' : 'text-slate-500'}`}>
                          {evt.time || 'TBD'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            evt.status === 'Published'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : evt.status === 'Draft'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              evt.status === 'Published'
                                ? 'bg-emerald-400'
                                : evt.status === 'Draft'
                                ? 'bg-amber-400'
                                : 'bg-slate-400'
                            }`}
                          />
                          {evt.status}
                        </span>
                      </td>

                      {/* Tickets Sold */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-semibold text-xs">
                          {evt.ticketsSold}{' '}
                          <span className={isNight ? 'text-slate-500' : 'text-slate-400'}>
                            / {evt.capacity}
                          </span>
                        </div>
                        <div className="w-24 bg-slate-800 rounded-full h-1.5 mt-1.5 overflow-hidden">
                          <div
                            className="bg-purple-500 h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.round((evt.ticketsSold / (evt.capacity || 1)) * 100)
                              )}%`,
                            }}
                          />
                        </div>
                      </td>

                      {/* Revenue */}
                      <td className="py-4 px-4 whitespace-nowrap font-semibold">
                        ₦{evt.revenue.toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => showToast(`Share link generated for "${evt.name}"`)}
                            className={`p-2 rounded-lg border transition-colors ${
                              isNight
                                ? 'border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                                : 'border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                            }`}
                            title="Share Event"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(evt.id, evt.name)}
                            className="p-2 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreatorDashboard;