import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Flame,
  Calendar,
  MapPin,
  Lock,
  Ticket,
  Sparkles,
  Wallet,
  Globe
} from "lucide-react";

export interface CheckoutEvent {
  id: string;
  title: string;
  date?: string;
  time?: string;
  location: string;
  venue?: string;
  image_url?: string;
  image?: string;
  price: number;
  tickets_sold?: number;
}

export type PaymentMethodType = "credit_card" | "mobile_money" | "paypal" | "paystack";

interface PaymentOptionProps {
  method: PaymentMethodType;
  selected: boolean;
  onClick: () => void;
}

function PaymentOption({ method, selected, onClick }: PaymentOptionProps) {
  const getMethodDetails = () => {
    switch (method) {
      case "credit_card":
        return {
          title: "Credit or Debit Card",
          subtitle: "Visa, Mastercard, American Express",
          icon: <CreditCard className="w-5 h-5 text-[#FF1E83]" />,
          badge: "Instant",
        };
      case "mobile_money":
        return {
          title: "Mobile Money / Transfer",
          subtitle: "M-Pesa, MTN MoMo, Instant Bank Transfer",
          icon: <Smartphone className="w-5 h-5 text-[#F59E0B]" />,
          badge: "Popular",
        };
      case "paypal":
        return {
          title: "PayPal",
          subtitle: "Safe, 1-click international checkout",
          icon: <Globe className="w-5 h-5 text-[#0BA4DB]" />,
          badge: "Global",
        };
      case "paystack":
        return {
          title: "Paystack Checkout",
          subtitle: "Cards, USSD, Bank Transfer & Apple Pay",
          icon: <Wallet className="w-5 h-5 text-emerald-400" />,
          badge: "Fast",
        };
    }
  };

  const details = getMethodDetails();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left cursor-pointer ${
        selected
          ? "border-[#FF1E83] bg-[#FF1E83]/10 shadow-md shadow-[#FF1E83]/15 ring-1 ring-[#FF1E83]"
          : "border-[#2A1E38] bg-[#161022] hover:border-[#FF1E83]/50 hover:bg-[#1f1730]"
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-[#2A1E38] flex items-center justify-center shrink-0">
          {details.icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold text-[#F5F0FF]">{details.title}</span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-[#2A1E38] text-[#C8BDD4] px-1.5 py-0.5 rounded">
              {details.badge}
            </span>
          </div>
          <p className="text-[11px] text-[#C8BDD4] mt-0.5">{details.subtitle}</p>
        </div>
      </div>
      <div
        className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition ${
          selected ? "border-[#FF1E83] bg-[#FF1E83]" : "border-[#2A1E38] bg-[#0B0714]"
        }`}
      >
        {selected && <div className="h-2 w-2 rounded-full bg-white" />}
      </div>
    </button>
  );
}

interface CheckoutPaymentProps {
  event?: CheckoutEvent;
  quantity?: number;
  onBack?: () => void;
  onSuccess?: (ticketData: any) => void;
  onViewMyTickets?: () => void;
  onBrowseEvents?: () => void;
}

const DEFAULT_CHECKOUT_EVENT: CheckoutEvent = {
  id: "evt-night-2026",
  title: "Afrobeats & Neon Night 2026",
  date: "Fri, 28 Aug 2026",
  time: "8:00 PM WAT",
  location: "Eko Convention Centre, Victoria Island, Lagos",
  venue: "Eko Convention Centre",
  image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
  price: 25.0,
  tickets_sold: 142,
};

export default function CheckoutPayment({
  event = DEFAULT_CHECKOUT_EVENT,
  quantity = 1,
  onBack,
  onSuccess,
  onViewMyTickets,
  onBrowseEvents,
}: CheckoutPaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("credit_card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<any>(null);

  const pricePerTicket = event?.price || 25;
  const subtotal = pricePerTicket * quantity;
  const serviceFee = 0.0;
  const total = subtotal + serviceFee;

  const handlePurchase = () => {
    if (!event) return;
    setProcessing(true);

    setTimeout(() => {
      const ticketCode = "GAD-" + Math.floor(1000 + Math.random() * 9000);
      const newTicket = {
        id: "tkt-" + Date.now(),
        event_id: event.id,
        event_title: event.title,
        event_date: event.date || "Upcoming",
        event_time: event.time || "Night",
        event_location: event.location || event.venue,
        event_image_url: event.image_url || event.image,
        quantity,
        total_price: total,
        payment_method:
          paymentMethod === "credit_card"
            ? "Credit / Debit Card"
            : paymentMethod === "mobile_money"
            ? "Mobile Money"
            : paymentMethod === "paypal"
            ? "PayPal"
            : "Paystack",
        status: "active",
        ticket_code: ticketCode,
        qr_value: `GAD-${ticketCode}-PASS`,
        booked_on: "28 Aug 2026",
      };

      setTicketDetails(newTicket);
      setProcessing(false);
      setSuccess(true);

      if (onSuccess) {
        onSuccess(newTicket);
      }
    }, 1100);
  };

  // SUCCESS CONFIRMATION SCREEN
  if (success) {
    return (
      <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] flex flex-col items-center justify-start px-4 sm:px-6 pt-8 sm:pt-14 pb-36 relative overflow-y-auto font-sans selection:bg-[#FF1E83] selection:text-white">
        {/* Glow Background */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#FF1E83]/20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl border border-[#2A1E38] bg-[#161022] p-6 sm:p-8 text-center space-y-6 shadow-2xl relative z-10 my-auto">
          {/* Animated Success Badge */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-950/80 border-2 border-emerald-500/50 shadow-lg shadow-emerald-900/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FF1E83]/15 border border-[#FF1E83]/30 px-3 py-1 text-xs font-bold text-[#FF1E83]">
              <Flame className="h-3.5 w-3.5 fill-[#FF1E83]" />
              <span>GoAfterDark Confirmed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F5F0FF] tracking-tight">
              You're all set for the night!
            </h1>
            <p className="text-xs sm:text-sm text-[#C8BDD4] max-w-sm mx-auto leading-relaxed">
              Your {quantity} pass{quantity > 1 ? "es" : ""} for{" "}
              <span className="font-bold text-[#F5F0FF]">{event?.title}</span>{" "}
              {quantity > 1 ? "have" : "has"} been confirmed and generated.
            </p>
          </div>

          {/* Ticket Pass Preview Card */}
          {ticketDetails && (
            <div className="rounded-2xl border border-[#2A1E38] bg-[#0B0714] p-4 text-left space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8BDD4] font-medium">Pass Code:</span>
                <span className="font-mono font-black text-[#FF1E83]">{ticketDetails.ticket_code}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#C8BDD4] font-medium">Payment Status:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Paid via {ticketDetails.payment_method}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-[#2A1E38] pt-2">
                <span className="text-[#C8BDD4] font-medium">Total Paid:</span>
                <span className="font-black text-[#F59E0B] text-sm">${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={onViewMyTickets || onBrowseEvents}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] py-3.5 px-5 text-xs font-bold text-white shadow-lg shadow-[#FF1E83]/30 transition hover:brightness-110 active:scale-95 cursor-pointer"
            >
              <Ticket className="h-4 w-4" />
              <span>View My Tickets & QR Passes</span>
            </button>

            <button
              type="button"
              onClick={onBrowseEvents || onBack}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2A1E38] bg-[#0B0714] py-3 px-5 text-xs font-bold text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition cursor-pointer"
            >
              <span>Back to Discover Events</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0714] text-[#F5F0FF] pb-36 font-sans selection:bg-[#FF1E83] selection:text-white">
      <div className="max-w-lg mx-auto px-4 sm:px-5 pt-6 space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-2.5 rounded-2xl bg-[#161022] border border-[#2A1E38] text-[#C8BDD4] hover:text-white hover:border-[#FF1E83] transition shadow-xs cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FF1E83]">
                <Flame className="h-3 w-3 fill-[#FF1E83]" />
                <span>GoAfterDark Checkout</span>
              </div>
              <h1 className="text-xl font-black text-[#F5F0FF] tracking-tight">Checkout</h1>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2.5 py-1 rounded-xl">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>256-bit Encrypted</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-[#161022] rounded-3xl p-5 border border-[#2A1E38] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#C8BDD4]">Order Summary</h2>
            <span className="text-[11px] font-bold text-[#FF1E83] bg-[#FF1E83]/10 px-2.5 py-0.5 rounded-xl border border-[#FF1E83]/20">
              {quantity} ticket{quantity > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex gap-3.5 items-center">
            <img
              src={event.image_url || event.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"}
              alt={event.title}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#2A1E38] shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <p className="font-black text-sm text-[#F5F0FF] line-clamp-1">{event.title}</p>
              <div className="flex items-center gap-1 text-xs text-[#C8BDD4]">
                <MapPin className="h-3 w-3 text-[#FF1E83] shrink-0" />
                <span className="line-clamp-1">{event.location || event.venue}</span>
              </div>
              <p className="text-xs text-[#C8BDD4]">
                {quantity} ticket{quantity > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="border-t border-dashed border-[#2A1E38] pt-3.5 space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#C8BDD4]">Subtotal</span>
              <span className="text-[#F5F0FF] font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-[#C8BDD4]">Service fee</span>
              <span className="text-emerald-400 font-semibold">$0.00</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-black pt-2 border-t border-[#2A1E38]">
              <span className="text-[#F5F0FF]">Total</span>
              <span className="text-[#FF1E83]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h2 className="font-bold text-xs uppercase tracking-wider text-[#C8BDD4]">Payment Method</h2>
          <PaymentOption
            method="credit_card"
            selected={paymentMethod === "credit_card"}
            onClick={() => setPaymentMethod("credit_card")}
          />
          <PaymentOption
            method="mobile_money"
            selected={paymentMethod === "mobile_money"}
            onClick={() => setPaymentMethod("mobile_money")}
          />
          <PaymentOption
            method="paypal"
            selected={paymentMethod === "paypal"}
            onClick={() => setPaymentMethod("paypal")}
          />
        </div>

        {/* Security badge note */}
        <div className="flex items-center justify-center gap-2 text-center text-xs text-[#C8BDD4] pt-2">
          <Lock className="h-3.5 w-3.5 text-[#FF1E83]" />
          <span>Guaranteed secure & instant digital ticket issuance</span>
        </div>
      </div>

      {/* Bottom Pay Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#161022]/95 backdrop-blur-lg border-t border-[#2A1E38] z-50 shadow-2xl">
        <div className="max-w-lg mx-auto px-5 py-4">
          <button
            type="button"
            onClick={handlePurchase}
            disabled={processing}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#FF1E83] to-[#FF5364] hover:from-[#FF0070] hover:to-[#FF1E83] text-white font-black text-sm shadow-xl shadow-[#FF1E83]/30 flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-95 disabled:opacity-60 cursor-pointer"
          >
            {processing ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing Payment...
              </span>
            ) : (
              `Pay $${total.toFixed(2)}`
            )}
          </button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
