import React from 'react';
import { Calendar, MapPin, Heart, ArrowUpRight, Tag, Clock, Ticket } from 'lucide-react';

export default function EventCard({
  event,
  isFavorite = false,
  onToggleFavorite,
  onSelectEvent,
  isNight = true,
}) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(event.id);
  };

  return (
    <article
      onClick={() => onSelectEvent(event)}
      id={`event-card-${event.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-sm ${
        isNight
          ? 'border-[#2A1E38] bg-[#161022] hover:border-[#FF1E83] hover:shadow-xl hover:shadow-[#FF1E83]/15 text-[#FAF5FF]'
          : 'border-[#EBE4F0] bg-white hover:border-[#FF1E83] hover:shadow-xl hover:shadow-[#FF1E83]/10 text-[#140E1E]'
      }`}
    >
      {/* Top Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A070D]">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Category & Featured Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-xl bg-black/75 px-2.5 py-1 text-xs font-bold text-white/95 shadow-sm backdrop-blur-md border border-white/10">
            <Tag className="h-3 w-3 text-[#FF1E83]" />
            {event.categoryLabel}
          </span>
          {event.featured && (
            <span className="rounded-xl bg-[#F59E0B] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-black shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Heart / Favourite Icon Button (Soft Red / Coral #FF5364) */}
        <button
          onClick={handleFavoriteClick}
          id={`fav-btn-${event.id}`}
          type="button"
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white shadow-md backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-90 border border-white/10"
          aria-label={isFavorite ? `Remove ${event.title} from saved` : `Save ${event.title}`}
          title={isFavorite ? 'Remove from saved' : 'Save event'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? 'fill-[#FF5364] text-[#FF5364] scale-110'
                : 'text-white/80 hover:text-[#FF5364]'
            }`}
          />
        </button>

        {/* Price Pill in Mustard/Gold */}
        <div className="absolute bottom-3 right-3 rounded-xl bg-black/85 px-3 py-1 text-xs font-black font-mono text-[#F59E0B] shadow-md backdrop-blur-md border border-white/15">
          From {event.formattedPrice || `₦${event.price?.toLocaleString()}`}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          {/* Date & Time */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF1E83]">
            <Calendar className="h-3.5 w-3.5" />
            <span>{event.date} • {event.time}</span>
          </div>

          {/* Title */}
          <h3
            className={`font-black text-base sm:text-lg leading-snug line-clamp-2 transition-colors group-hover:text-[#FF1E83] ${
              isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
            }`}
          >
            {event.title}
          </h3>

          {/* Venue & Location */}
          <div
            className={`flex items-center gap-1.5 text-xs font-medium line-clamp-1 ${
              isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
            }`}
          >
            <MapPin className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Footer info: Organizer & Get Tickets link */}
        <div
          className={`flex items-center justify-between pt-3 border-t text-xs font-bold ${
            isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'
          }`}
        >
          <span
            className={`truncate max-w-[150px] ${
              isNight ? 'text-[#C8BDD4]/70' : 'text-[#8E7F9A]'
            }`}
          >
            {event.organizer}
          </span>

          <span className="inline-flex items-center gap-1 text-[#FF1E83] group-hover:underline">
            <span>Tickets</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
