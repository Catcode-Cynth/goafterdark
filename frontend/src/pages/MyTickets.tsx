import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Ticket,
  Search,
  Calendar,
  MapPin,
  QrCode,
  Flame,
  ChevronRight,
} from "lucide-react";

export interface TicketItem {
  id: string;
  event_id?: string;
  event_title: string;
  event_date: string;
  event_time?: string;
  event_location?: string;
  event_image_url?: string;
  event_image?: string;
  quantity: number;
  total_price: number;
  status: "active" | "used" | "cancelled" | "past";
  ticket_code: string;
  qr_value?: string;
  booked_on?: string;
  venue?: string;
  tier?: string;
  category?: string;
}

export interface MyTicketsProps {
  initialTickets?: TicketItem[];
  onBack?: () => void;
  onExploreEvents?: () => void;
  onSelectTicket?: (ticket: TicketItem) => void;
}

const DEFAULT_MOCK_TICKETS: TicketItem[] = [
  {
    id: "tkt-001",
    event_id: "evt-1",
    event_title: "Afrobeats Night 2026: Live in Lagos",
    event_date: "Fri, Aug 28, 2026",
    event_time: "8:00 PM WAT",
    event_location: "Eko Convention Centre, Victoria Island, Lagos",
    venue: "Eko Convention Centre",
    event_image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    quantity: 2,
    total_price: 50.0,
    status: "active",
    ticket_code: "GAD-8924",
    qr_value: "GAD-8924-VIP-PASS",
    booked_on: "Aug 20, 2026",
    tier: "VIP Access",
    category: "Concerts",
  },
  {
    id: "tkt-002",
    event_id: "evt-2",
    event_title: "Summer Beach Rave Lagos",
    event_date: "Sat, Sep 12, 2026",
    event_time: "6:30 PM WAT",
    event_location: "Landmark Beach Arena, Oniru, Lagos",
    venue: "Landmark Beach Arena",
    event_image_url:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    quantity: 1,
    total_price: 25.0,
    status: "active",
    ticket_code: "GAD-4109",
    qr_value: "GAD-4109-GA-PASS",
    booked_on: "Aug 22, 2026",
    tier: "General Admission",
    category: "Concerts",
  },
  {
    id: "tkt-003",
    event_id: "evt-past-1",
    event_title: "Afro-Fusion Rooftop Sunset DJ Party",
    event_date: "Sat, Jul 18, 2026",
    event_time: "5:00 PM WAT",
    event_location: "The View Lounge, Ikoyi, Lagos",
    venue: "The View Lounge",
    event_image_url:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    quantity: 1,
    total_price: 30.0,
    status: "past",
    ticket_code: "GAD-1120",
    qr_value: "GAD-1120-USED",
    booked_on: "Jul 10, 2026",
    tier: "Standard Pass",
    category: "Culture",
  },
];

interface TicketCardProps {
  ticket: TicketItem;
  onSelect?: () => void;
}

function TicketCard({ ticket, onSelect }: TicketCardProps) {
  const [showQR, setShowQR] = useState(false);
  const isActive = ticket.status === "active";

  return (
    <div className="bg-[#161022] rounded-3xl p-4 sm:p-5 border border-[#2A1E38] shadow-md hover:border-[#FF1E83]/40 transition space-y-4">
      <div className="flex gap-3.5 items-start">
        <img
          src={
            ticket.event_image_url ||
            ticket.event_image ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"
          }
          alt={ticket.event_title}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#2A1E38] shrink-0"
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-sm text-[#F5F0FF] line-clamp-1">
              {ticket.event_title}
            </h3>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${
                isActive
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                  : "bg-[#2A1E38] text-[#C8BDD4]"
              }`}
            >
              {isActive ? "Active" : "Past"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#FF1E83] font-semibold">
            <Calendar className="h-3 w-3 shrink-0" />
            <span>{ticket.event_date}</span>
            {ticket.event_time && <span>• {ticket.event_time}</span>}
          </div>

          <div className="flex items-center gap-1 text-xs text-[#C8BDD4] line-clamp-1">
            <MapPin className="h-3 w-3 text-[#F59E0B] shrink-0" />
            <span>{ticket.event_location || ticket.venue}</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0B0714] p-3.5 border border-[#2A1E38] flex items-center justify-between text-xs">
        <div>
          <span className="text-[#C8BDD4] block text-[10px] uppercase font-bold tracking-wider">
            Pass Code
          </span>
          <span className="font-mono font-black text-[#FF1E83] text-sm">
            {ticket.ticket_code}
          </span>
        </div>
        <div>
          <span className="text-[#C8BDD4] block text-[10px] uppercase font-bold tracking-wider">
            Quantity
          </span>
          <span className="font-bold text-[#F5F0FF]">
            {ticket.quantity} Pass{ticket.quantity > 1 ? "es" : ""}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[#C8BDD4] block text-[10px] uppercase font-bold tracking-wider">
            Total
          </span>
          <span className="font-black text-[#F59E0B] text-sm">
            ${(ticket.total_price || 0).toFixed(2)}
          </span>
        </div>
      </div>

      {showQR && (
        <div className="rounded-2xl bg-white p-4 text-center space-y-2 animate-in fade-in zoom-in-95">
          <div className="mx-auto w-36 h-36 bg-white border-2 border-black/10 rounded-xl flex flex-col items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              <rect width="100" height="100" fill="white" />
              <path
                d="M10 10h30v30h-30z M15 15v20h20v-20z M20 20h10v10h-10z M60 10h30v30h-30z M65 15v20h20v-20z M70 20h10v10h-10z M10 60h30v30h-30z M15 65v20h20v-20z M20 70h10v10h-10z M50 15h5v5h-5z M50 25h10v5h-10z M45 35h5v10h-5z M60 50h5v10h-5z M70 50h15v5h-15z M55 65h10v10h-10z M75 65h10v5h-10z M50 80h25v5h-25z M85 80h5v10h-5z"
                fill="black"
              />
            </svg>
          </div>
          <p className="text-[11px] font-bold text-gray-800">Scan at entrance gate</p>
          <p className="text-[10px] font-mono text-gray-500">
            {ticket.qr_value || ticket.ticket_code}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-1 gap-2">
        <button
          type="button"
          onClick={() => setShowQR(!showQR)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0714] border border-[#2A1E38] text-xs font-bold text-[#C8BDD4] hover:text-[#FF1E83] hover:border-[#FF1E83] transition cursor-pointer"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>{showQR ? "Hide QR Code" : "Show Gate Pass"}</span>
        </button>

        {onSelect && (
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#FF1E83] hover:underline cursor-pointer"
          >
            <span>Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default function MyTickets({
  initialTickets = DEFAULT_MOCK_TICKETS,
  onBack,
  onExploreEvents,
  onSelectTicket,
}: MyTicketsProps) {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setTickets(initialTickets);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [initialTickets]);

  const activeTickets = tickets.filter((t) => t.status === "active");
  const pastTickets = tickets.filter((t) => t.status !== "active");

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-24 font-sans selection:bg-[#FF1E83] selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#FF1E83]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg mx-auto px-5 pt-6 space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack || onExploreEvents}
                className="p-2.5 rounded-2xl border border-[#2A1E38] bg-[#161022] text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-xs cursor-pointer"
                title="Back to Explore"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
                <Flame className="h-3 w-3 fill-[#FF1E83]" />
                <span>GoAfterDark Passes</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#F5F0FF] tracking-tight">
                My Tickets
              </h1>
            </div>
          </div>

          <span className="text-xs font-bold text-[#FF1E83] bg-[#FF1E83]/10 border border-[#FF1E83]/20 px-2.5 py-1 rounded-xl">
            {activeTickets.length} Active
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-3 border-[#2A1E38] border-t-[#FF1E83] rounded-full animate-spin" />
            <span className="text-xs text-[#C8BDD4]">Loading your tickets...</span>
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 space-y-4 bg-[#161022] rounded-3xl border border-[#2A1E38] p-8">
            <div className="w-20 h-20 rounded-2xl bg-[#0B0714] border border-[#2A1E38] flex items-center justify-center mx-auto text-[#C8BDD4]">
              <Ticket className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-base text-[#F5F0FF]">No tickets yet</p>
              <p className="text-xs text-[#C8BDD4]">
                Browse events and grab your first pass for the night!
              </p>
            </div>
            <button
              type="button"
              onClick={onExploreEvents || onBack}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-[#FF1E83]/30 hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <span>Explore Events</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTickets.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-xs text-[#C8BDD4] uppercase tracking-wider">
                    Upcoming Passes
                  </h2>
                  <span className="text-[10px] font-bold text-emerald-400">
                    Ready to Scan
                  </span>
                </div>
                {activeTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onSelect={() => onSelectTicket && onSelectTicket(ticket)}
                  />
                ))}
              </div>
            )}

            {pastTickets.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-semibold text-xs text-[#C8BDD4] uppercase tracking-wider">
                  Past Events
                </h2>
                {pastTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onSelect={() => onSelectTicket && onSelectTicket(ticket)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#161022]/95 backdrop-blur-lg border-t border-[#2A1E38] z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2.5 px-4">
          <button
            type="button"
            onClick={onExploreEvents || onBack}
            className="flex flex-col items-center gap-1 py-1 px-6 text-[#C8BDD4] hover:text-white transition cursor-pointer"
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">Explore</span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center gap-1 py-1 px-6 text-[#FF1E83] cursor-pointer"
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] font-bold">Tickets</span>
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}