import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Ticket, SlidersHorizontal } from "lucide-react";
import { eventsApi } from "@/lib/api";
import FilterChip from "@/components/ui/FilterChip";
import EventCard from "@/components/events/EventCard";
import InputField from "@/components/ui/InputField";

const categories = ["All", "Music", "Tech", "Sports", "Art", "Food", "Business", "Comedy"];

export default function EventsFeed() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await eventsApi.list(activeCategory);
      setEvents(data);
      setLoading(false);
    };
    loadEvents();
  }, [activeCategory]);

  const filtered = events.filter((e) =>
    e.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-lg mx-auto px-5 pt-6 pb-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">Discover</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Find amazing events near you</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/my-tickets")}
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Ticket className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm font-body placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-lg mx-auto px-5 pt-5">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
              <Search className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">No events found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Nav for Attendee */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-4">
          {[
            { icon: Search, label: "Explore", path: "/events", active: true },
            { icon: Ticket, label: "Tickets", path: "/my-tickets", active: false },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 py-1 px-6 ${item.active ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}