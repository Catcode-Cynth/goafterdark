import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Tag, 
  Heart, 
  CheckCircle2, 
  Ticket as TicketIcon, 
  Plus, 
  Minus, 
  ShieldCheck, 
  QrCode,
  Flame,
  Sparkles
} from 'lucide-react';

export default function TicketModal({
  event,
  isOpen = false,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  onBookingComplete,
  isNight = true,
}) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  useEffect(() => {
    if (event) {
      setSelectedTierIndex(0);
      setQuantity(1);
      setBookingConfirmed(false);
    }
  }, [event]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const tiers = event.ticketTiers || [
    { id: 't-default', name: 'General Admission', price: event.price || 25000, perks: 'Standard event entry pass' },
    { id: 't-vip', name: 'VIP Pass', price: (event.price || 25000) * 2, perks: 'Priority entry + lounge access' },
  ];

  const currentTier = tiers[selectedTierIndex] || tiers[0];
  const totalPrice = (currentTier.price * quantity);

  const handleCheckout = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      const code = 'GAD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setConfirmationCode(code);
      setBookingConfirmed(true);
      if (onBookingComplete) {
        onBookingComplete({
          eventTitle: event.title,
          quantity,
          tier: currentTier.name,
          totalPrice,
          confirmationCode: code,
        });
      }
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      id="ticket-modal"
    >
      <div
        className={`relative w-full max-w-2xl my-6 overflow-hidden rounded-2xl border shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col ${
          isNight
            ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
            : 'border-[#EBE4F0] bg-white text-[#140E1E]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="ticket-modal-close-btn"
          type="button"
          className="absolute top-4 right-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black border border-white/20 transition"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-[#0A070D] shrink-0">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161022] via-black/40 to-transparent" />

          {/* Badges on Modal Image */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-xl bg-black/80 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10">
              <Tag className="h-3 w-3 text-[#FF1E83]" />
              {event.categoryLabel}
            </span>
            <span className="rounded-xl bg-[#F59E0B] px-2.5 py-0.5 text-xs font-black text-black">
              From ₦{event.price?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Confirmed State */}
          {bookingConfirmed ? (
            <div className="text-center py-6 space-y-5 animate-in fade-in duration-300">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF1E83]">
                  Booking Confirmed!
                </span>
                <h3 className="text-2xl font-black mt-1">
                  You're going to {event.title}!
                </h3>
                <p className={`text-xs mt-1 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                  Your pass has been secured. Show this QR pass at the entrance gate.
                </p>
              </div>

              {/* Digital Pass Ticket stub */}
              <div className={`p-5 rounded-2xl border text-left max-w-md mx-auto space-y-4 ${
                isNight ? 'border-[#2A1E38] bg-[#0E0A16]' : 'border-[#EBE4F0] bg-[#F7F2FA]'
              }`}>
                <div className="flex items-center justify-between border-b pb-3 border-inherit">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
                      Pass Holder Code
                    </div>
                    <div className="font-mono font-black text-lg text-[#F59E0B]">
                      {confirmationCode}
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm">
                    <QrCode className="h-10 w-10 text-black" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Tier:</span>
                    <p className="font-bold">{currentTier.name} (×{quantity})</p>
                  </div>
                  <div>
                    <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Total Paid:</span>
                    <p className="font-black text-[#F59E0B]">₦{totalPrice.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2">
                    <span className={isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}>Venue:</span>
                    <p className="font-bold">{event.venue}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-[#FF1E83]/30 transition"
              >
                <span>Done & Return to Events</span>
              </button>
            </div>
          ) : (
            <>
              {/* Event Info Header */}
              <div>
                <h3 className="text-xl sm:text-2xl font-black leading-snug">
                  {event.title}
                </h3>
                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <div className={`flex items-center gap-1.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    <Calendar className="h-4 w-4 text-[#FF1E83]" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    <MapPin className="h-4 w-4 text-[#F59E0B]" />
                    <span>{event.venue}, {event.location}</span>
                  </div>
                </div>
              </div>

              {/* Tier Selection */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider block">
                  Select Ticket Tier:
                </label>
                <div className="space-y-2.5">
                  {tiers.map((tier, idx) => {
                    const isSelected = selectedTierIndex === idx;
                    return (
                      <div
                        key={tier.id || idx}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? isNight
                              ? 'border-[#FF1E83] bg-[#FF1E83]/10 ring-1 ring-[#FF1E83]'
                              : 'border-[#FF1E83] bg-[#FF1E83]/5 ring-1 ring-[#FF1E83]'
                            : isNight
                            ? 'border-[#2A1E38] bg-[#0E0A16] hover:border-[#FF1E83]/50'
                            : 'border-[#EBE4F0] bg-[#F7F2FA] hover:border-[#FF1E83]/50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm flex items-center gap-2">
                            <span>{tier.name}</span>
                            {isSelected && <span className="h-2 w-2 rounded-full bg-[#FF1E83]" />}
                          </div>
                          <p className={`text-xs mt-0.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                            {tier.perks}
                          </p>
                        </div>
                        <div className="text-right pl-3 shrink-0">
                          <span className="font-mono font-black text-sm sm:text-base text-[#F59E0B]">
                            ₦{tier.price?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isNight ? 'border-[#2A1E38] bg-[#0E0A16]' : 'border-[#EBE4F0] bg-[#F7F2FA]'
              }`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider block">Quantity</span>
                  <span className={`text-[11px] ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>Max 6 per booking</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className={`h-8 w-8 rounded-lg border flex items-center justify-center font-bold disabled:opacity-30 ${
                      isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
                    }`}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono font-black text-base w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(6, q + 1))}
                    disabled={quantity >= 6}
                    className={`h-8 w-8 rounded-lg border flex items-center justify-center font-bold disabled:opacity-30 ${
                      isNight ? 'border-[#2A1E38] bg-[#161022]' : 'border-[#EBE4F0] bg-white'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Checkout Bar */}
              <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'
              }`}>
                <div>
                  <span className={`text-[11px] uppercase tracking-wider font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'}`}>
                    Total Amount
                  </span>
                  <div className="font-mono font-black text-2xl text-[#F59E0B]">
                    ₦{totalPrice.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isBooking}
                  id="modal-confirm-checkout-btn"
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-8 py-3.5 text-sm font-black text-white shadow-lg shadow-[#FF1E83]/30 transition disabled:opacity-60"
                >
                  <TicketIcon className="h-4 w-4" />
                  <span>{isBooking ? 'Processing Pass…' : `Pay ₦${totalPrice.toLocaleString()} Now`}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
