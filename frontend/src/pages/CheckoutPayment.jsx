import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import PaymentOption from "@/components/ui/PaymentOption";
import { useToast } from "@/components/ui/use-toast";

export default function CheckoutPayment() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const quantity = parseInt(urlParams.get("qty")) || 1;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Event.filter({ id: eventId });
      setEvent(data[0] || null);
      setLoading(false);
    };
    load();
  }, [eventId]);

  const handlePurchase = async () => {
    if (!event) return;
    setProcessing(true);

    const ticketCode = "EVT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    await base44.entities.Ticket.create({
      event_id: event.id,
      event_title: event.title,
      event_date: event.date,
      event_time: event.time,
      event_location: event.location,
      event_image_url: event.image_url,
      quantity,
      total_price: event.price * quantity,
      payment_method: paymentMethod,
      status: "active",
      ticket_code: ticketCode,
    });

    await base44.entities.Event.update(event.id, {
      tickets_sold: (event.tickets_sold || 0) + quantity,
    });

    setProcessing(false);
    setSuccess(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="font-display text-2xl font-bold text-foreground">You're all set!</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Your ticket{quantity > 1 ? "s" : ""} for <span className="font-medium text-foreground">{event?.title}</span> {quantity > 1 ? "have" : "has"} been confirmed.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button onClick={() => navigate("/my-tickets")} className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/25">
            View My Tickets
          </Button>
          <Button variant="outline" onClick={() => navigate("/events")} className="w-full h-12 rounded-xl font-semibold">
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 space-y-4">
        <p className="text-muted-foreground">Event not found</p>
        <Button variant="outline" onClick={() => navigate("/events")}>Back to events</Button>
      </div>
    );
  }

  const total = event.price * quantity;

  return (
    <div className="min-h-screen bg-background pb-28">
      <div className="max-w-lg mx-auto px-5 pt-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Order Summary */}
        <div className="bg-card rounded-2xl p-4 border border-border/50 space-y-4">
          <h2 className="font-heading font-semibold text-sm text-card-foreground">Order Summary</h2>
          <div className="flex gap-3">
            <img
              src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"}
              alt={event.title}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-card-foreground line-clamp-1">{event.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{event.location}</p>
              <p className="text-xs text-muted-foreground">{quantity} ticket{quantity > 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="border-t border-dashed border-border pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-card-foreground">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service fee</span>
              <span className="text-card-foreground">$0.00</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border">
              <span className="text-card-foreground">Total</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          <h2 className="font-heading font-semibold text-sm text-foreground">Payment Method</h2>
          <PaymentOption method="credit_card" selected={paymentMethod === "credit_card"} onClick={() => setPaymentMethod("credit_card")} />
          <PaymentOption method="mobile_money" selected={paymentMethod === "mobile_money"} onClick={() => setPaymentMethod("mobile_money")} />
          <PaymentOption method="paypal" selected={paymentMethod === "paypal"} onClick={() => setPaymentMethod("paypal")} />
        </div>
      </div>

      {/* Bottom Pay Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-lg mx-auto px-5 py-4">
          <Button
            onClick={handlePurchase}
            disabled={processing}
            className="w-full h-12 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25"
          >
            {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}