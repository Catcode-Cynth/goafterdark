import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Flame,
  CheckCircle2,
  DollarSign,
  Users,
  Image as ImageIcon,
  Tag,
  ChevronDown,
  User,
  FileText
} from "lucide-react";

export const eventCategories = [
  "Music",
  "Concerts",
  "Nightlife",
  "Festivals",
  "Theatre & Arts",
  "Sports",
  "Food & Drinks",
  "Tech & Networking",
  "Comedy",
  "Parties & Raves",
  "Other"
];

export interface CreateEventFormState {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  total_tickets: string;
  image_url: string;
  organizer_name: string;
}

export interface CreateEventProps {
  onBack?: () => void;
  onOpenDashboard?: () => void;
  onExploreClick?: () => void;
  onLogout?: () => void;
  onSaveSuccess?: () => void;
  onEventCreated?: (event: any) => void;
}

export default function CreateEvent({
  onBack,
  onOpenDashboard,
  onExploreClick,
  onLogout,
  onSaveSuccess,
  onEventCreated,
}: CreateEventProps) {
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState<CreateEventFormState>({
    title: "",
    description: "",
    category: "Music",
    date: "",
    time: "",
    location: "",
    price: "",
    total_tickets: "100",
    image_url: "",
    organizer_name: "",
  });

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const update = (field: keyof CreateEventFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    update("image_url", previewUrl);
    showToast("Event banner uploaded successfully!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast("Please enter an event title");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const newEvent = {
        id: "evt-" + Date.now(),
        ...form,
        price: parseFloat(form.price) || 0,
        total_tickets: parseInt(form.total_tickets) || 100,
        tickets_sold: 0,
        created_at: new Date().toISOString(),
      };

      showToast("🎉 Event published successfully to GoAfterDark!");

      if (onEventCreated) {
        onEventCreated(newEvent);
      }

      setTimeout(() => {
        if (onSaveSuccess) onSaveSuccess();
        else if (onOpenDashboard) onOpenDashboard();
        else if (onBack) onBack();
      }, 900);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-36 font-sans selection:bg-[#FF1E83] selection:text-white">
      {/* Background ambient light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1E83]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-[#161022] border border-[#FF1E83] px-4 py-2.5 text-xs font-bold text-white shadow-2xl shadow-[#FF1E83]/30 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-[#FF1E83]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-[#2A1E38] bg-[#161022]/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack || onOpenDashboard}
              className="p-2 rounded-2xl border border-[#2A1E38] bg-[#0B0714] text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-xs cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF1E83] to-[#FF5364] text-white shadow-sm shadow-[#FF1E83]/30">
                <Flame className="h-4 w-4 fill-white" />
              </div>
              <div>
                <h1 className="text-base font-black tracking-tight leading-none text-[#F5F0FF]">
                  Create <span className="text-[#FF1E83]">Event</span>
                </h1>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#C8BDD4]">
                  Creator Studio
                </span>
              </div>
            </div>
          </div>

          {onOpenDashboard && (
            <button
              type="button"
              onClick={onOpenDashboard}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#2A1E38] bg-[#0B0714] px-3 py-1.5 text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition cursor-pointer"
            >
              <span>Dashboard</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Form Body */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Image Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#C8BDD4] flex items-center justify-between">
              <span>Event Image / Cover</span>
              <span className="text-[10px] font-normal text-[#C8BDD4]/60">16:9 Recommended</span>
            </label>
            <label className="block w-full aspect-[16/9] rounded-2xl border-2 border-dashed border-[#2A1E38] hover:border-[#FF1E83]/60 transition-colors cursor-pointer overflow-hidden bg-[#161022] relative group shadow-sm">
              {form.image_url ? (
                <div className="relative h-full w-full">
                  <img src={form.image_url} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-bold backdrop-blur-xs">
                    <Upload className="w-4 h-4 text-[#FF1E83]" />
                    <span>Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#C8BDD4] p-4 text-center">
                  <div className="h-12 w-12 rounded-2xl bg-[#FF1E83]/10 border border-[#FF1E83]/30 flex items-center justify-center text-[#FF1E83]">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#F5F0FF]">Click to upload event banner</span>
                  <span className="text-[11px] text-[#C8BDD4]/70">PNG, JPG, WEBP up to 10MB</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>

          {/* 2. Event Title */}
          <div className="space-y-1.5">
            <label htmlFor="event-title" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
              Event Title <span className="text-[#FF1E83]">*</span>
            </label>
            <div className="relative">
              <input
                id="event-title"
                type="text"
                placeholder="e.g. Summer Music Festival"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
                className="w-full rounded-2xl border border-[#2A1E38] bg-[#161022] py-3.5 px-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          {/* 3. Description */}
          <div className="space-y-1.5">
            <label htmlFor="event-description" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
              Description
            </label>
            <textarea
              id="event-description"
              rows={4}
              placeholder="Tell people about your event..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full min-h-24 rounded-2xl border border-[#2A1E38] bg-[#161022] p-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition resize-none shadow-xs"
            />
          </div>

          {/* 4. Category */}
          <div className="space-y-1.5">
            <label htmlFor="event-category" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
              Category
            </label>
            <div className="relative">
              <select
                id="event-category"
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className="w-full h-12 rounded-2xl border border-[#2A1E38] bg-[#161022] px-4 text-xs font-bold text-[#F5F0FF] focus:border-[#FF1E83] focus:outline-none transition appearance-none shadow-xs cursor-pointer"
              >
                {eventCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#161022] text-[#F5F0FF]">
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown className="h-4 w-4 text-[#C8BDD4]" />
              </div>
            </div>
          </div>

          {/* 5. Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="event-date" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Date <span className="text-[#FF1E83]">*</span>
              </label>
              <div className="relative">
                <input
                  id="event-date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  required
                  className="w-full h-12 rounded-2xl border border-[#2A1E38] bg-[#161022] px-4 text-xs font-semibold text-[#F5F0FF] focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="event-time" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Time
              </label>
              <div className="relative">
                <input
                  id="event-time"
                  type="time"
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  className="w-full h-12 rounded-2xl border border-[#2A1E38] bg-[#161022] px-4 text-xs font-semibold text-[#F5F0FF] focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* 6. Location */}
          <div className="space-y-1.5">
            <label htmlFor="event-location" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
              Location <span className="text-[#FF1E83]">*</span>
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <MapPin className="h-4 w-4 text-[#FF1E83]" />
              </div>
              <input
                id="event-location"
                type="text"
                placeholder="e.g. Convention Center, NYC"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                required
                className="w-full rounded-2xl border border-[#2A1E38] bg-[#161022] py-3.5 pl-11 pr-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          {/* 7. Price & Total Tickets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="event-price" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Price ($) <span className="text-[#FF1E83]">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <DollarSign className="h-4 w-4 text-[#F59E0B]" />
                </div>
                <input
                  id="event-price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#161022] py-3.5 pl-11 pr-4 text-xs font-bold text-[#F59E0B] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="event-tickets" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
                Total Tickets
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Users className="h-4 w-4 text-[#C8BDD4]" />
                </div>
                <input
                  id="event-tickets"
                  type="number"
                  min="1"
                  placeholder="100"
                  value={form.total_tickets}
                  onChange={(e) => update("total_tickets", e.target.value)}
                  className="w-full rounded-2xl border border-[#2A1E38] bg-[#161022] py-3.5 pl-11 pr-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* 8. Organizer Name */}
          <div className="space-y-1.5">
            <label htmlFor="event-organizer" className="block text-xs font-bold uppercase tracking-wider text-[#C8BDD4]">
              Organizer Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <User className="h-4 w-4 text-[#C8BDD4]" />
              </div>
              <input
                id="event-organizer"
                type="text"
                placeholder="Your name or brand"
                value={form.organizer_name}
                onChange={(e) => update("organizer_name", e.target.value)}
                className="w-full rounded-2xl border border-[#2A1E38] bg-[#161022] py-3.5 pl-11 pr-4 text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          {/* 9. Publish Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] font-black text-sm text-white shadow-xl shadow-[#FF1E83]/30 flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Publish Event</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
