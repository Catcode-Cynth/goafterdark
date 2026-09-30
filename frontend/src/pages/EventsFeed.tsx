import React, { useState, useEffect } from "react";
import {
  Search,
  Ticket,
  SlidersHorizontal,
  Calendar,
  MapPin,
  Flame,
  ArrowUpRight,
  Heart,
  Tag,
  Loader2,
  Sparkles
} from "lucide-react";
import { MOCK_EVENTS } from "../data/mockEvents.js";

const categories = ["All", "Music", "Tech", "Sports", "Art", "Food", "Business", "Comedy", "Festival"];

export interface EventItem {
  id: string;
  title: string;
  category?: string;
  categoryLabel?: string;
  date?: string;
  time?: string;
  location?: string;
  venue?: string;
  price?: number;
  formattedPrice?: string;
  image?: string;
  image_url?: string;
  organizer?: string;
  organizer_name?: string;
  featured?: boolean;
}

export interface EventsFeedProps {
  onSelectEvent?: (event: EventItem) => void;
  onViewMyTickets?: () => void;
  onNavigate?: (path: string) => void;
}

export default function EventsFeed({
  onSelectEvent,
  onViewMyTickets,
  onNavigate,
}: EventsFeedProps) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["evt-1"]);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      // Simulate network response
      setTimeout(() => {
        const list = (MOCK_EVENTS as any[]).map((e) => ({
          ...e,
          image_url: e.image,
          organizer_name: e.organizer,
        }));
        if (activeCategory === "All") {
          setEvents(list);
        } else {
          setEvents(
            list.filter(
              (item) =>
                item.category?.toLowerCase() === activeCategory.toLowerCase() ||
                item.categoryLabel?.toLowerCase() === activeCategory.toLowerCase()
            )
          );
        }
        setLoading(false);
      }, 350);
    };

    loadEvents();
  }, [activeCategory]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = events.filter(
    (e) =>
      e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-32 font-sans selection:bg-[#FF1E83] selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FF1E83]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-[#0B0714]/95 backdrop-blur-lg border-b border-[#2A1E38]/80">
        <div className="max-w-lg mx-auto px-5 pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
                <Flame className="h-3 w-3 fill-[#FF1E83]" />
                <span>GoAfterDark Feed</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-[#F5F0FF]">Discover</h1>
              <p className="text-xs text-[#C8BDD4] mt-0.5">Find amazing night events & concerts near you</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onViewMyTickets}
                className="w-10 h-10 rounded-2xl bg-[#161022] border border-[#2A1E38] flex items-center justify-center text-[#C8BDD4] hover:text-[#FF1E83] hover:border-[#FF1E83] transition-colors shadow-xs cursor-pointer"
                title="My Passes & Tickets"
              >
                <Ticket className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8BDD4]" />
            <input
              type="text"
              placeholder="Search events, locations, venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-2xl bg-[#161022] border border-[#2A1E38] text-xs font-semibold text-[#F5F0FF] placeholder:text-[#C8BDD4]/50 focus:outline-none focus:border-[#FF1E83] transition shadow-xs"
            />
          </div>

          {/* Horizontal Category Scroll */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 py-1">
            {categories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-[#FF1E83] to-[#FF5364] text-white shadow-md shadow-[#FF1E83]/30"
                      : "bg-[#161022] text-[#C8BDD4] border border-[#2A1E38] hover:border-[#FF1E83]/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-lg mx-auto px-5 pt-5 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-[#FF1E83] animate-spin" />
            <span className="text-xs text-[#C8BDD4]">Finding events...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3 bg-[#161022] rounded-3xl border border-[#2A1E38] p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#0B0714] border border-[#2A1E38] flex items-center justify-center mx-auto text-[#C8BDD4]">
              <Search className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-[#F5F0FF]">No events found</p>
            <p className="text-xs text-[#C8BDD4]">Try searching with different keywords or switch categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((event) => {
              const isFav = favorites.includes(event.id);
              return (
                <article
                  key={event.id}
                  onClick={() => onSelectEvent && onSelectEvent(event)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#2A1E38] bg-[#161022] hover:border-[#FF1E83] hover:shadow-xl hover:shadow-[#FF1E83]/15 transition-all duration-300 cursor-pointer shadow-md"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A070D]">
                    <img
                      src={event.image_url || event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80"}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161022] via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="inline-flex items-center gap-1 rounded-xl bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md border border-white/10">
                        <Tag className="h-2.5 w-2.5 text-[#FF1E83]" />
                        {event.categoryLabel || event.category || "Event"}
                      </span>
                    </div>

                    {/* Save / Favorite */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(e, event.id)}
                      className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/65 text-white shadow-md backdrop-blur-md hover:scale-110 active:scale-90 transition border border-white/10"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          isFav ? "fill-[#FF1E83] text-[#FF1E83]" : "text-white/80"
                        }`}
                      />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-2 right-2 rounded-xl bg-black/85 px-2.5 py-0.5 text-[11px] font-mono font-black text-[#F59E0B] backdrop-blur-md border border-white/15">
                      {event.formattedPrice || (event.price ? `$${event.price}` : "Free")}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FF1E83]">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date || "Upcoming"}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[#F5F0FF] line-clamp-2 leading-snug group-hover:text-[#FF1E83] transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-[#C8BDD4] line-clamp-1">
                        <MapPin className="h-3 w-3 text-[#F59E0B] shrink-0" />
                        <span>{event.venue || event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#2A1E38] text-xs">
                      <span className="text-[11px] text-[#C8BDD4] truncate max-w-[120px]">
                        {event.organizer_name || event.organizer || "Verified Organizer"}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[#FF1E83] font-bold group-hover:underline">
                        <span>Passes</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#161022]/95 backdrop-blur-lg border-t border-[#2A1E38] z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-4">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("/events")}
            className="flex flex-col items-center gap-1 py-1 px-6 text-[#FF1E83] cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-bold">Explore</span>
          </button>
          <button
            type="button"
            onClick={onViewMyTickets}
            className="flex flex-col items-center gap-1 py-1 px-6 text-[#C8BDD4] hover:text-white transition cursor-pointer"
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] font-medium">Tickets</span>
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
