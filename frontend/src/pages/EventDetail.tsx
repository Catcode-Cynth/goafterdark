import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  Minus,
  Plus,
  Share2,
  Flame,
  Check,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";

export interface EventDetailItem {
  id: string;
  title: string;
  category?: string;
  organizer_name?: string;
  date?: string;
  time?: string;
  location?: string;
  venue?: string;
  price: number;
  total_tickets?: number;
  tickets_sold?: number;
  image_url?: string;
  image?: string;
  description?: string;
}

export interface EventDetailProps {
  event?: EventDetailItem | null;
  onBack?: () => void;
  onProceedToCheckout?: (event: EventDetailItem, quantity: number) => void;
  onShare?: (event: EventDetailItem) => void;
}

const DEFAULT_EVENT: EventDetailItem = {
  id: "evt-afrobeats-2026",
  title: "Afrobeats Night 2026: Live in Lagos",
  category: "Music & Concert",
  organizer_name: "Flytime Live & GoAfterDark",
  date: "2026-08-28",
  time: "8:00 PM WAT",
  location: "Eko Convention Centre, Victoria Island, Lagos",
  price: 25.0,
  total_tickets: 300,
  tickets_sold: 198,
  image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
  description:
    "Experience the highest-voltage Afrobeats celebration in Lagos. Featuring superstar headline sets, curated DJ soundclashes, immersive laser visuals, outdoor chill lounges, and premium VIP hospitality.",
};

export default function EventDetail({
  event = DEFAULT_EVENT,
  onBack,
  onProceedToCheckout,
  onShare,
}: EventDetailProps) {
  const currentEvent = event || DEFAULT_EVENT;
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);

  const totalTickets = currentEvent.total_tickets || 200;
  const soldTickets = currentEvent.tickets_sold || 0;
  const remaining = Math.max(1, totalTickets - soldTickets);
  const formattedDate = currentEvent.date || "Fri, 28 Aug 2026";
  const totalPrice = (currentEvent.price || 0) * quantity;

  const handleShare = () => {
    if (onShare) {
      onShare(currentEvent);
    } else {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout(currentEvent, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-36 font-sans selection:bg-[#FF1E83] selection:text-white">
      {/* Hero Banner Header with Cover Image */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] max-h-[380px] overflow-hidden">
        <img
          src={
            currentEvent.image_url ||
            currentEvent.image ||
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80"
          }
          alt={currentEvent.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Soft dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0714] via-[#0B0714]/40 to-black/60" />

        {/* Top Floating Actions Bar */}
        <div className="absolute top-4 left-0 right-0 px-4 sm:px-6 flex items-center justify-between z-20">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-[#161022]/80 backdrop-blur-md border border-[#2A1E38] flex items-center justify-center text-[#F5F0FF] hover:text-[#FF1E83] hover:border-[#FF1E83] transition shadow-lg cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-10 h-10 rounded-2xl bg-[#161022]/80 backdrop-blur-md border border-[#2A1E38] flex items-center justify-center text-[#F5F0FF] hover:text-[#FF1E83] hover:border-[#FF1E83] transition shadow-lg cursor-pointer"
            aria-label="Share event"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-lg mx-auto px-5 -mt-8 relative z-10 space-y-6">
        {/* Category Pill, Title & Organizer */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-[#FF1E83]/15 border border-[#FF1E83]/30 text-[#FF1E83] text-xs font-bold uppercase tracking-wider">
            {currentEvent.category || "Event"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F0FF] leading-tight tracking-tight">
            {currentEvent.title}
          </h1>
          {currentEvent.organizer_name && (
            <p className="text-sm text-[#C8BDD4]">
              by <span className="font-semibold text-[#F5F0FF]">{currentEvent.organizer_name}</span>
            </p>
          )}
        </div>

        {/* Date, Location, Tickets Card */}
        <div className="bg-[#161022] rounded-3xl p-4 sm:p-5 space-y-3.5 border border-[#2A1E38] shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF1E83]/10 border border-[#FF1E83]/20 flex items-center justify-center text-[#FF1E83] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F5F0FF]">{formattedDate}</p>
              {currentEvent.time && (
                <p className="text-xs text-[#C8BDD4]">{currentEvent.time}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF1E83]/10 border border-[#FF1E83]/20 flex items-center justify-center text-[#FF1E83] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-[#F5F0FF]">{currentEvent.location || currentEvent.venue}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF1E83]/10 border border-[#FF1E83]/20 flex items-center justify-center text-[#FF1E83] shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-sm font-medium text-[#F5F0FF]">
              {remaining} tickets remaining
            </p>
          </div>
        </div>

        {/* Description / About */}
        {currentEvent.description && (
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#C8BDD4]">About</h2>
            <p className="text-sm text-[#C8BDD4] leading-relaxed bg-[#161022]/60 rounded-3xl p-4 border border-[#2A1E38]">
              {currentEvent.description}
            </p>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="bg-[#161022] rounded-3xl p-4 sm:p-5 border border-[#2A1E38] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#F5F0FF]">Tickets</p>
              <p className="text-xs text-[#C8BDD4]">${(currentEvent.price || 0).toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-3 bg-[#0B0714] p-1.5 rounded-2xl border border-[#2A1E38]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-[#161022] hover:bg-[#2A1E38] flex items-center justify-center text-[#F5F0FF] transition cursor-pointer disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-mono font-black text-lg w-6 text-center text-[#F5F0FF]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(remaining, quantity + 1))}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:brightness-110 flex items-center justify-center text-white transition cursor-pointer shadow-md shadow-[#FF1E83]/30 disabled:opacity-40"
                disabled={quantity >= remaining}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Buy Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#161022]/95 backdrop-blur-xl border-t border-[#2A1E38] z-50 shadow-2xl">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#C8BDD4]">Total</p>
            <p className="text-xl font-black text-[#FF1E83]">
              ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleCheckout}
            className="h-12 px-8 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] font-black text-sm text-white shadow-xl shadow-[#FF1E83]/30 flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <span>Buy Ticket{quantity > 1 ? "s" : ""}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
