import React, { useState } from "react";
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  Edit,
  Trash2,
  ArrowLeft,
  Flame,
  Clock,
  MapPin,
  TrendingUp,
  Sparkles,
  BarChart3,
  Sun,
  Moon,
  CheckCircle2
} from "lucide-react";

export interface StudioEvent {
  id: string;
  title: string;
  category?: string;
  date: string;
  time?: string;
  location?: string;
  price: number;
  total_tickets: number;
  tickets_sold: number;
  image_url?: string;
  status: "published" | "draft" | "completed";
}

export interface CreatorStudioProps {
  initialEvents?: StudioEvent[];
  onBack?: () => void;
  onCreateEvent?: () => void;
  onEditEvent?: (event: StudioEvent) => void;
  onViewAttendees?: () => void;
  onExploreEvents?: () => void;
}

const DEFAULT_STUDIO_EVENTS: StudioEvent[] = [
  {
    id: "evt-1",
    title: "Afrobeats Night 2026: Live in Lagos",
    category: "Music & Concert",
    date: "2026-08-28",
    time: "8:00 PM",
    location: "Eko Convention Centre, Victoria Island, Lagos",
    price: 35,
    total_tickets: 250,
    tickets_sold: 186,
    image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    status: "published",
  },
  {
    id: "evt-2",
    title: "Summer Beach Rave Lagos",
    category: "Nightlife",
    date: "2026-09-12",
    time: "6:30 PM",
    location: "Landmark Beach Arena, Oniru, Lagos",
    price: 25,
    total_tickets: 150,
    tickets_sold: 84,
    image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    status: "published",
  },
  {
    id: "evt-3",
    title: "VIP Rooftop Lounge & DJ Session",
    category: "Exclusive VIP",
    date: "2026-09-25",
    time: "9:00 PM",
    location: "The View Lounge, Ikoyi, Lagos",
    price: 50,
    total_tickets: 60,
    tickets_sold: 54,
    image_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    status: "published",
  },
  {
    id: "evt-4",
    title: "Tech Founders After Dark Mixer",
    category: "Business & Networking",
    date: "2026-10-05",
    time: "7:00 PM",
    location: "Civic Centre, Victoria Island, Lagos",
    price: 40,
    total_tickets: 200,
    tickets_sold: 0,
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    status: "draft",
  },
];

export default function CreatorStudio({
  initialEvents = DEFAULT_STUDIO_EVENTS,
  onBack,
  onCreateEvent,
  onEditEvent,
  onViewAttendees,
  onExploreEvents,
}: CreatorStudioProps) {
  const [events, setEvents] = useState<StudioEvent[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  const totalRevenue = events.reduce((sum, e) => sum + (e.price || 0) * (e.tickets_sold || 0), 0);
  const totalTicketsSold = events.reduce((sum, e) => sum + (e.tickets_sold || 0), 0);

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-36 font-sans selection:bg-[#FF1E83] selection:text-white">
      {/* Background ambient light */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1E83]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto px-4 sm:px-5 pt-6 space-y-6">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="p-2.5 rounded-2xl border border-[#2A1E38] bg-[#161022] text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
                <Flame className="h-3 w-3 fill-[#FF1E83]" />
                <span>GoAfterDark Studio</span>
              </div>
              <h1 className="text-xl font-black tracking-tight text-[#F5F0FF]">Creator Studio</h1>
              <p className="text-xs text-[#C8BDD4]">
                Manage your events, tickets & revenue
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateEvent}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] py-2.5 px-3.5 text-xs font-bold text-white shadow-lg shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>New Event</span>
          </button>
        </div>

        {/* 3 Metric Cards: Events, Revenue ($), Sold */}
        <div className="grid grid-cols-3 gap-3">
          {/* Events Count */}
          <div className="bg-[#161022] rounded-2xl p-4 border border-[#2A1E38] text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FF1E83]/10 border border-[#FF1E83]/20 flex items-center justify-center mx-auto mb-2 text-[#FF1E83]">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="font-sans text-xl font-bold text-[#F5F0FF]">{events.length}</p>
            <p className="text-[10px] text-[#C8BDD4] mt-0.5 font-semibold uppercase tracking-wider">Events</p>
          </div>

          {/* Revenue */}
          <div className="bg-[#161022] rounded-2xl p-4 border border-[#2A1E38] text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="font-sans text-xl font-bold text-[#F5F0FF]">${totalRevenue.toFixed(0)}</p>
            <p className="text-[10px] text-[#C8BDD4] mt-0.5 font-semibold uppercase tracking-wider">Revenue</p>
          </div>

          {/* Sold */}
          <div className="bg-[#161022] rounded-2xl p-4 border border-[#2A1E38] text-center shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-800 text-blue-400 flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4" />
            </div>
            <p className="font-sans text-xl font-bold text-[#F5F0FF]">{totalTicketsSold}</p>
            <p className="text-[10px] text-[#C8BDD4] mt-0.5 font-semibold uppercase tracking-wider">Sold</p>
          </div>
        </div>

        {/* Shortcut to Attendees / Guest list */}
        {onViewAttendees && (
          <div
            onClick={onViewAttendees}
            className="flex items-center justify-between p-3.5 rounded-2xl border border-[#2A1E38] bg-[#161022] hover:border-[#FF1E83] cursor-pointer transition shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-[#FF1E83]/15 text-[#FF1E83] flex items-center justify-center font-bold">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#F5F0FF]">Attendee & Check-in Manager</h4>
                <p className="text-[10px] text-[#C8BDD4]">View confirmed bookings, QR codes & gate check-ins</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#FF1E83] hover:underline">Open →</span>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xs text-[#C8BDD4] uppercase tracking-wider">
              Your Events
            </h2>
            <span className="text-[11px] font-bold text-[#FF1E83]">
              {events.filter((e) => e.status === "published").length} Published
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-3 border-[#2A1E38] border-t-[#FF1E83] rounded-full animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-[#161022] rounded-3xl border border-[#2A1E38] p-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0B0714] border border-[#2A1E38] flex items-center justify-center mx-auto text-[#C8BDD4]">
                <Calendar className="w-7 h-7" />
              </div>
              <p className="text-sm text-[#C8BDD4]">No events yet. Create your first!</p>
              <button
                type="button"
                onClick={onCreateEvent}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#FF1E83] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#FF1E83]/30 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Event</span>
              </button>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-[#161022] rounded-2xl p-4 border border-[#2A1E38] flex gap-3 shadow-xs hover:border-[#FF1E83]/40 transition">
                <img
                  src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"}
                  alt={event.title}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#2A1E38]"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-[#F5F0FF] line-clamp-1">{event.title}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap uppercase tracking-wider ${
                        event.status === "published"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                          : event.status === "draft"
                          ? "bg-amber-950/80 text-amber-400 border border-amber-800"
                          : "bg-[#2A1E38] text-[#C8BDD4]"
                      }`}
                    >
                      {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-[#C8BDD4]">
                    {event.date} • {event.tickets_sold || 0} sold
                  </p>
                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => onEditEvent && onEditEvent(event)}
                      className="text-xs text-[#FF1E83] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(event.id)}
                      className="text-xs text-rose-400 font-medium flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
