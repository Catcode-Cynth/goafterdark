import React from "react";
import {baseURL} from  'https://eventful-backend-n21b.onrender.com'
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function EventCard({ event }) {
  const formattedDate = event.date ? format(new Date(event.date), "MMM dd, yyyy") : "";

  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80"}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold backdrop-blur-sm">
              {event.category || "Event"}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full bg-card/90 text-card-foreground text-xs font-bold backdrop-blur-sm">
              ${event.price?.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2.5">
          <h3 className="font-heading font-semibold text-base text-card-foreground line-clamp-1">
            {event.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-xs">{formattedDate}{event.time ? ` • ${event.time}` : ""}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" />
            <span className="text-xs line-clamp-1">{event.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}