import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function TicketCard({ ticket }) {
  const formattedDate = ticket.event_date ? format(new Date(ticket.event_date), "MMM dd, yyyy") : "";
  const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    used: "bg-muted text-muted-foreground",
    cancelled: "bg-red-100 text-red-700",
    expired: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50">
      <div className="flex">
        <div className="w-24 sm:w-28 flex-shrink-0">
          <img
            src={ticket.event_image_url || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&q=80"}
            alt={ticket.event_title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-3.5 space-y-2 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-sm text-card-foreground line-clamp-1">
              {ticket.event_title}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${statusColors[ticket.status] || statusColors.active}`}>
              {ticket.status?.charAt(0).toUpperCase() + ticket.status?.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span className="text-xs">{formattedDate}{ticket.event_time ? ` • ${ticket.event_time}` : ""}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-xs line-clamp-1">{ticket.event_location}</span>
          </div>
          <div className="pt-1 border-t border-dashed border-border">
            <p className="text-[10px] text-muted-foreground font-mono tracking-wider">
              {ticket.ticket_code || "TKT-" + ticket.id?.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}