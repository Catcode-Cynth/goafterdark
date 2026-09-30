import React, { useState } from 'react';
import {
  Ticket,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  User,
  LogOut,
  Bell,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  Image as ImageIcon,
  ArrowLeft,
  Info,
  Flame
} from 'lucide-react';

interface CreateEventScreenProps {
  onExploreClick?: () => void;
  onOpenDashboard?: () => void;
  onLogout?: () => void;
  onSaveSuccess?: () => void;
}

export const CreateEventScreen: React.FC<CreateEventScreenProps> = ({
  onExploreClick,
  onOpenDashboard,
  onLogout,
  onSaveSuccess,
}) => {
  // Theme state: default this mockup to NIGHT mode as specified
  const [theme, setTheme] = useState<'night' | 'day'>('night');

  // Form State
  const [title, setTitle] = useState('Summer Concert');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('12 Aug 2026 7:00 PM');
  const [venue, setVenue] = useState('Lagos Continental Hotel');
  const [price, setPrice] = useState('20,000');
  const [capacity, setCapacity] = useState('500');

  // Creator Reminder State
  const [reminderOn, setReminderOn] = useState(true);
  const [reminderSchedule, setReminderSchedule] = useState<'1_day' | '3_days' | '1_week'>('1_day');

  // Banner image state
  const [bannerImage, setBannerImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'
  );
  const [isHoveringDropzone, setIsHoveringDropzone] = useState(false);

  // Status toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide an event title', 'info');
      return;
    }
    showToast(`"${title}" published successfully to GoAfterDark!`, 'success');
    if (onSaveSuccess) {
      setTimeout(onSaveSuccess, 1500);
    }
  };

  const handleSaveDraft = () => {
    showToast(`Draft for "${title}" saved to your creator workspace.`, 'info');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerImage(url);
      showToast('Custom banner image applied!', 'success');
    }
  };

  const isNight = theme === 'night';

  return (
    <div
      className={`min-h-screen font-sans flex flex-col justify-between transition-colors duration-300 ${
        isNight
          ? 'bg-[#0B0714] text-[#F5F0FF] selection:bg-[#A78BFA] selection:text-[#0B0714]'
          : 'bg-[#F7F5FB] text-[#1A1228] selection:bg-[#7C3AED] selection:text-white'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-3 text-xs font-bold shadow-2xl transition-all animate-in slide-in-from-bottom-3 duration-200 ${
            isNight
              ? 'border border-[#2E2545] bg-[#161022] text-[#F5F0FF] shadow-purple-950/50'
              : 'border border-[#E8E2F3] bg-white text-[#1A1228] shadow-slate-200/80'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className={`h-4 w-4 shrink-0 ${isNight ? 'text-[#A78BFA]' : 'text-emerald-600'}`} />
          ) : (
            <AlertCircle className={`h-4 w-4 shrink-0 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HEADER (Required: Left Logo, Center Links, Top Right: 1. Toggle 2. Avatar 3. Logout) */}
      {/* ========================================================================= */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 ${
          isNight
            ? 'border-[#2E2545] bg-[#0B0714]/95 text-[#F5F0FF]'
            : 'border-[#E8E2F3] bg-white/95 text-[#1A1228]'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: GoAfterDark Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDashboard}
              type="button"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90 text-left cursor-pointer"
              id="header-goafterdark-logo"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-sm shadow-[#FF1E83]/30">
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
                  className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                    isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'
                  }`}
                >
                  Creator Studio
                </span>
              </div>
            </button>
          </div>

          {/* Center: Explore Events, Profile */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onExploreClick}
              id="header-nav-explore"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              <Sparkles className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
              <span>Explore Events</span>
            </button>

            <button
              onClick={() => showToast('Cynthia Vance • Verified Event Organizer', 'info')}
              id="header-nav-profile"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-bold transition-all ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </nav>

          {/* TOP RIGHT (In exact order: 1. Day/night toggle, 2. Avatar + "Cynthia", 3. Logout) */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* 1. Day / night theme toggle (Segmented switch with prominent Sunshine/Sun and Moon icons) */}
            <div
              className={`flex items-center rounded-2xl border p-1 transition-all duration-200 ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022] shadow-inner shadow-black/60 ring-1 ring-[#7C3AED]/20'
                  : 'border-[#E8E2F3] bg-[#F7F5FB] shadow-xs'
              }`}
              id="header-theme-toggle-container"
              title="Toggle Day / Night Mode"
            >
              {/* Day / Sunshine Icon Button (Visible as alternate option, bright amber on hover) */}
              <button
                type="button"
                onClick={() => setTheme('day')}
                id="header-theme-day-btn"
                title="Switch to Day Mode (Sunshine)"
                aria-label="Switch to Day Mode (Sunshine)"
                className={`flex h-7.5 w-8.5 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                  !isNight
                    ? 'bg-[#7C3AED] text-white shadow-sm shadow-[#7C3AED]/50'
                    : 'text-amber-400/80 hover:text-amber-300 hover:bg-[#2E2545] hover:scale-105'
                }`}
              >
                <Sun
                  className={`h-4.5 w-4.5 transition-all duration-200 ${
                    !isNight
                      ? 'fill-amber-300 text-amber-200 stroke-amber-200'
                      : 'text-amber-400 stroke-amber-400'
                  }`}
                  strokeWidth={2.2}
                />
              </button>

              {/* Night / Moon Icon Button (Active by default with filled purple pill & bright moon) */}
              <button
                type="button"
                onClick={() => setTheme('night')}
                id="header-theme-night-btn"
                title="Night Mode Active (Moon)"
                aria-label="Switch to Night Mode (Moon)"
                className={`flex h-7.5 w-8.5 items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isNight
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/50 ring-1 ring-purple-400/40'
                    : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#E8E2F3]'
                }`}
              >
                <Moon
                  className={`h-4.5 w-4.5 transition-all duration-200 ${
                    isNight
                      ? 'fill-purple-200 text-white stroke-purple-200'
                      : 'text-[#6B6280] stroke-current'
                  }`}
                  strokeWidth={2.2}
                />
              </button>
            </div>

            {/* 2. Avatar + name “Cynthia” */}
            <div
              className={`flex items-center gap-2.5 rounded-2xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022] text-[#F5F0FF] hover:border-[#A78BFA]'
                  : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:border-[#7C3AED]'
              }`}
              onClick={() => showToast('Logged in as Cynthia (Creator Studio)', 'info')}
              id="header-creator-avatar"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A78BFA] text-[11px] font-black text-white shadow-xs">
                CY
              </div>
              <span className="font-bold">Cynthia</span>
            </div>

            {/* 3. Logout */}
            <button
              onClick={onLogout}
              id="header-logout-btn"
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022] text-[#B8A9D4] hover:border-rose-500/40 hover:bg-rose-950/20 hover:text-rose-400'
                  : 'border-[#E8E2F3] bg-white text-[#6B6280] hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600'
              }`}
              title="Sign out of GoAfterDark"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* PAGE CONTAINER (Single Mockup with High-Fidelity Form)                     */}
      {/* ========================================================================= */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-6">
        {/* Page Title & Subtitle */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={onOpenDashboard}
              className={`hover:underline flex items-center gap-1 transition ${
                isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'
              }`}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </button>
            <span className={isNight ? 'text-[#2E2545]' : 'text-[#E8E2F3]'}>/</span>
            <span className={isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}>Create Event</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
            }`}
            id="page-create-event-title"
          >
            Create Event
          </h1>
          <p
            className={`text-sm font-medium ${
              isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
            }`}
          >
            Add details, set tickets, and choose when attendees get reminded.
          </p>
        </div>

        {/* MAIN FORM CARD */}
        <form
          onSubmit={handleSaveEvent}
          className={`rounded-3xl border p-6 sm:p-9 shadow-xl space-y-7 text-left transition-colors duration-300 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022] text-[#F5F0FF]'
              : 'border-[#E8E2F3] bg-[#FFFFFF] text-[#1A1228]'
          }`}
          id="main-create-event-card"
        >
          {/* 1. BANNER UPLOAD */}
          <div className="space-y-2">
            <label
              className={`block text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Banner Upload
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsHoveringDropzone(true);
              }}
              onDragLeave={() => setIsHoveringDropzone(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsHoveringDropzone(false);
                const file = e.dataTransfer.files?.[0];
                if (file) {
                  setBannerImage(URL.createObjectURL(file));
                  showToast('Custom banner image dropped and applied!', 'success');
                }
              }}
              className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${
                isHoveringDropzone
                  ? isNight
                    ? 'border-[#A78BFA] bg-[#A78BFA]/10'
                    : 'border-[#7C3AED] bg-[#7C3AED]/5'
                  : isNight
                  ? 'border-[#2E2545] bg-[#0B0714]/80 hover:border-[#A78BFA]/60'
                  : 'border-[#E8E2F3] bg-[#F7F5FB] hover:border-[#7C3AED]/50'
              }`}
            >
              <input
                type="file"
                id="banner-upload-file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
                title="Upload Banner Image"
              />

              {bannerImage ? (
                <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full group">
                  <img
                    src={bannerImage}
                    alt="Event Banner Preview"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 flex flex-col justify-end p-4 text-white ${
                      isNight
                        ? 'bg-gradient-to-t from-[#0B0714]/90 via-[#0B0714]/40 to-transparent'
                        : 'bg-gradient-to-t from-black/75 via-black/25 to-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/15">
                        <ImageIcon className="h-3.5 w-3.5 text-[#A78BFA]" />
                        Summer Concert Banner
                      </span>
                      <span
                        className={`text-xs font-semibold underline transition ${
                          isNight ? 'text-[#A78BFA] group-hover:text-white' : 'text-purple-200 group-hover:text-white'
                        }`}
                      >
                        Click or drag to change
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm border mb-3 ${
                      isNight
                        ? 'bg-[#161022] text-[#A78BFA] border-[#2E2545]'
                        : 'bg-white text-[#7C3AED] border-[#E8E2F3]'
                    }`}
                  >
                    <Upload className="h-6 w-6" />
                  </div>
                  <h4 className={`text-sm font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                    Upload Banner Image
                  </h4>
                  <p className={`mt-1 text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                    PNG or JPG, 16:9
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 2. TITLE */}
          <div className="space-y-2">
            <label
              htmlFor="event-title-input"
              className={`block text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Title
            </label>
            <input
              type="text"
              id="event-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Concert"
              required
              className={`block w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition focus:outline-none ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#A78BFA] focus:bg-[#110B1F]'
                  : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:border-[#7C3AED] focus:bg-white shadow-xs'
              }`}
            />
          </div>

          {/* 3. DESCRIPTION */}
          <div className="space-y-2">
            <label
              htmlFor="event-desc-input"
              className={`block text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Description
            </label>
            <textarea
              id="event-desc-input"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people what to expect…"
              className={`block w-full rounded-2xl border p-4 text-sm font-semibold transition resize-none focus:outline-none ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#A78BFA] focus:bg-[#110B1F]'
                  : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/60 focus:border-[#7C3AED] focus:bg-white shadow-xs'
              }`}
            />
          </div>

          {/* 4. DATE & TIME */}
          <div className="space-y-2">
            <label
              htmlFor="event-datetime-input"
              className={`block text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Date &amp; Time
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 ${
                  isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'
                }`}
              >
                <Calendar className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="event-datetime-input"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="12 Aug 2026 7:00 PM"
                required
                className={`block w-full rounded-2xl border py-3.5 pl-11 pr-10 text-sm font-semibold transition focus:outline-none ${
                  isNight
                    ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] focus:border-[#A78BFA] focus:bg-[#110B1F]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] focus:border-[#7C3AED] focus:bg-white shadow-xs'
                }`}
              />
              <div
                className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 ${
                  isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                }`}
              >
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* 5. VENUE / LOCATION */}
          <div className="space-y-2">
            <label
              htmlFor="event-venue-input"
              className={`block text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
              }`}
            >
              Venue / Location
            </label>
            <div className="relative">
              <div
                className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 ${
                  isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'
                }`}
              >
                <MapPin className="h-4 w-4" />
              </div>
              <input
                type="text"
                id="event-venue-input"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Lagos Continental Hotel"
                required
                className={`block w-full rounded-2xl border py-3.5 pl-11 pr-4 text-sm font-semibold transition focus:outline-none ${
                  isNight
                    ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] focus:border-[#A78BFA] focus:bg-[#110B1F]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] focus:border-[#7C3AED] focus:bg-white shadow-xs'
                }`}
              />
            </div>
          </div>

          {/* 6. TWO FIELDS SIDE BY SIDE: PRICE (₦) & CAPACITY */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Price (₦) */}
            <div className="space-y-2">
              <label
                htmlFor="event-price-input"
                className={`block text-xs font-black uppercase tracking-wider ${
                  isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                }`}
              >
                Price (₦)
              </label>
              <div className="relative">
                <span
                  className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold ${
                    isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'
                  }`}
                >
                  ₦
                </span>
                <input
                  type="text"
                  id="event-price-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="20,000"
                  required
                  className={`block w-full rounded-2xl border py-3.5 pl-9 pr-4 text-sm font-semibold transition focus:outline-none ${
                    isNight
                      ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] focus:border-[#A78BFA] focus:bg-[#110B1F]'
                      : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] focus:border-[#7C3AED] focus:bg-white shadow-xs'
                  }`}
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="space-y-2">
              <label
                htmlFor="event-capacity-input"
                className={`block text-xs font-black uppercase tracking-wider ${
                  isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                }`}
              >
                Capacity
              </label>
              <input
                type="number"
                id="event-capacity-input"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="500"
                min="1"
                required
                className={`block w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition focus:outline-none ${
                  isNight
                    ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] focus:border-[#A78BFA] focus:bg-[#110B1F]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] focus:border-[#7C3AED] focus:bg-white shadow-xs'
                }`}
              />
            </div>
          </div>

          {/* 7. CREATOR REMINDER BOX */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-2">
            <div
              className={`rounded-2xl border p-5 space-y-4 ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714]/70'
                  : 'border-[#E8E2F3] bg-[#F7F5FB]/70'
              }`}
              id="creator-reminder-box"
            >
              <div
                className={`flex items-center justify-between border-b pb-3 ${
                  isNight ? 'border-[#2E2545]' : 'border-[#E8E2F3]'
                }`}
              >
                <div
                  className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  <Bell className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                  <span>Creator Reminder</span>
                </div>
              </div>

              {/* Checkbox: Reminder ON (checked) */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="reminder-toggle-checkbox"
                  checked={reminderOn}
                  onChange={(e) => setReminderOn(e.target.checked)}
                  className={`h-4 w-4 rounded cursor-pointer ${
                    isNight
                      ? 'border-[#2E2545] bg-[#161022] text-[#A78BFA] focus:ring-[#A78BFA] accent-[#A78BFA]'
                      : 'border-[#E8E2F3] text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED]'
                  }`}
                />
                <span className={`text-xs font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                  Reminder ON
                </span>
              </label>

              {/* Reminder Schedule Radio Options */}
              <div className={`space-y-2.5 pt-1 ${reminderOn ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider block ${
                    isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                  }`}
                >
                  Reminder Schedule
                </span>

                <div className="space-y-2">
                  {[
                    { id: '1_day', label: '1 day before' },
                    { id: '3_days', label: '3 days before' },
                    { id: '1_week', label: '1 week before' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 cursor-pointer text-xs font-semibold select-none ${
                        isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="creator-reminder-schedule"
                        value={opt.id}
                        checked={reminderSchedule === opt.id}
                        onChange={() => setReminderSchedule(opt.id as any)}
                        className={`h-4 w-4 ${
                          isNight
                            ? 'border-[#2E2545] text-[#A78BFA] focus:ring-[#A78BFA] accent-[#A78BFA]'
                            : 'border-[#E8E2F3] text-[#7C3AED] focus:ring-[#7C3AED] accent-[#7C3AED]'
                        }`}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side helper info note */}
            <div
              className={`flex flex-col justify-between rounded-2xl border border-dashed p-5 text-xs space-y-3 ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714]/40 text-[#B8A9D4]'
                  : 'border-[#E8E2F3] bg-white text-[#6B6280]'
              }`}
            >
              <div className="space-y-2">
                <div
                  className={`flex items-center gap-1.5 font-bold ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  <Info className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                  <span>Publishing Summary</span>
                </div>
                <p className="leading-relaxed">
                  Your event will instantly go live on the <strong>GoAfterDark Attendee Portal</strong>. Attendees can purchase tickets with <strong>Paystack</strong> and receive instant scannable QR passes.
                </p>
              </div>

              <div
                className={`rounded-xl p-3 text-[11px] font-medium border space-y-1 ${
                  isNight
                    ? 'bg-[#161022] border-[#2E2545] text-[#F5F0FF]'
                    : 'bg-[#F7F5FB] border-[#E8E2F3] text-[#1A1228]'
                }`}
              >
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Target Gross:</span>
                  <strong className={isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}>
                    ₦{(parseInt(price.replace(/,/g, '') || '0') * parseInt(capacity || '0')).toLocaleString()}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Payout Account:</span>
                  <span className={`font-bold ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
                    Access Bank • 0812•••41
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 8. ACTIONS (Bottom Right) */}
          <div
            className={`flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-6 border-t ${
              isNight ? 'border-[#2E2545]' : 'border-[#E8E2F3]'
            }`}
          >
            <button
              type="button"
              onClick={handleSaveDraft}
              id="btn-save-draft"
              className={`w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-xs font-bold transition shadow-xs active:scale-95 ${
                isNight
                  ? 'border-[#2E2545] bg-[#0B0714] text-[#F5F0FF] hover:border-[#A78BFA] hover:bg-[#110B1F]'
                  : 'border-[#E8E2F3] bg-white text-[#1A1228] hover:border-[#7C3AED] hover:bg-[#F7F5FB]'
              }`}
            >
              Save Draft
            </button>

            <button
              type="submit"
              id="btn-save-event"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3 text-xs font-bold text-white shadow-md transition active:scale-95 ${
                isNight
                  ? 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[#7C3AED]/30'
                  : 'bg-[#7C3AED] hover:bg-[#6D28D9] shadow-[#7C3AED]/25'
              }`}
            >
              <Ticket className="h-4 w-4" />
              <span>Save Event</span>
            </button>
          </div>
        </form>
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-12 w-full border-t py-6 text-xs font-semibold transition-colors duration-300 ${
          isNight
            ? 'border-[#2E2545] bg-[#0B0714] text-[#B8A9D4]'
            : 'border-[#E8E2F3] bg-white text-[#6B6280]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#FF1E83] text-white">
              <Flame className="h-3 w-3 fill-white" />
            </div>
            <span className={isNight ? 'font-bold text-[#FAF5FF]' : 'font-bold text-[#140E1E]'}>
              GoAfterDark
            </span>
            <span>• Create Event Form</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Auto-saving enabled</span>
            <span>•</span>
            <span className={isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}>Lagos, Nigeria</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateEventScreen;
