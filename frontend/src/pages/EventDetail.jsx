import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Minus, Plus, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Event.filter({ id });
      setEvent(data[0] || null);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-3 border-muted border-t-primary rounded-full animate-spin" />
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

  const remaining = (event.total_tickets || 100) - (event.tickets_sold || 0);
  const formattedDate = event.date ? format(new Date(event.date), "EEEE, MMMM dd, yyyy") : "";

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hero Image */}
      <div className="relative">
        <img
          src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"}
          alt={event.title}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center text-card-foreground shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-card/80 backdrop-blur-sm flex items-center justify-center text-card-foreground shadow-sm">
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-5 -mt-8 relative z-10 space-y-6">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            {event.category || "Event"}
          </span>
          <h1 className="font-display text-2xl font-bold text-foreground leading-tight">
            {event.title}
          </h1>
          {event.organizer_name && (
            <p className="text-sm text-muted-foreground">by {event.organizer_name}</p>
          )}
        </div>

        <div className="bg-card rounded-2xl p-4 space-y-3 border border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">{formattedDate}</p>
              {event.time && <p className="text-xs text-muted-foreground">{event.time}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-medium text-card-foreground">{event.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <p className="text-sm font-medium text-card-foreground">
              {remaining} tickets remaining
            </p>
          </div>
        </div>

        {event.description && (
          <div className="space-y-2">
            <h2 className="font-heading font-semibold text-base text-foreground">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-card-foreground">Tickets</p>
              <p className="text-xs text-muted-foreground">${event.price?.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-heading font-bold text-lg w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(remaining, quantity + 1))}
                className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buy Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-display text-xl font-bold text-foreground">
              ${(event.price * quantity).toFixed(2)}
            </p>
          </div>
          <Button
            onClick={() => navigate(`/checkout/${event.id}?qty=${quantity}`)}
            className="h-12 px-8 rounded-xl font-semibold text-sm shadow-lg shadow-primary/25"
          >
            Buy Ticket{quantity > 1 ? "s" : ""}
          </Button>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}