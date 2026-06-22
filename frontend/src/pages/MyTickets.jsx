import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Ticket, Search } from "lucide-react";

import TicketCard from "@/components/events/TicketCard";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Ticket.list("-created_date", 50);
      setTickets(data);
      setLoading(false);
    };
    load();
  }, []);

  const activeTickets = tickets.filter((t) => t.status === "active");
  const pastTickets = tickets.filter((t) => t.status !== "active");

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-5 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/events")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">My Tickets</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto">
              <Ticket className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="font-heading font-semibold text-foreground">No tickets yet</p>
              <p className="text-sm text-muted-foreground">Browse events and grab your first ticket!</p>
            </div>
            <button
              onClick={() => navigate("/events")}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Explore events
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTickets.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Upcoming
                </h2>
                {activeTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
            {pastTickets.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Past
                </h2>
                {pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-4">
          {[
            { icon: Search, label: "Explore", path: "/events", active: false },
            { icon: Ticket, label: "Tickets", path: "/my-tickets", active: true },
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