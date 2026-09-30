import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, ChevronLeft, ChevronRight, Heart, ArrowRight, Ticket, Clock, ShieldCheck } from 'lucide-react';
import ConfettiParticles from './ConfettiParticles.jsx';

export default function FeaturedEvent({
  featuredEvents = [],
  onGetTickets,
  isFavorite,
  onToggleFavorite,
  isNight = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!featuredEvents || featuredEvents.length === 0) {
    return null;
  }

  const currentEvent = featuredEvents[currentIndex] || featuredEvents[0];
  const isFav = isFavorite ? isFavorite(currentEvent.id) : false;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <section className="relative w-full py-6 sm:py-8 lg:py-10" id="featured-events-section">
      {/* Sparse Pink + Mustard Confetti accents near hero */}
      <ConfettiParticles count={10} className="z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Carousel Controls */}
        <div className="mb-5 sm:mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#FF1E83] animate-ping" />
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
                }`}
              >
                Featured Night
              </h2>
            </div>
            <p className={`mt-1 text-xs sm:text-sm ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
              Premier midnight tours, beach raves, and arena concerts in Lagos.
            </p>
          </div>

          {/* Carousel controls if more than 1 featured event */}
          {featuredEvents.length > 1 && (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className={`text-xs font-bold mr-1 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                {currentIndex + 1} of {featuredEvents.length}
              </span>
              <button
                onClick={handlePrev}
                id="featured-prev-btn"
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl border shadow-sm transition ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF] hover:bg-[#2A1E38] hover:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-white text-[#140E1E] hover:bg-[#F7F2FA] hover:border-[#FF1E83]'
                }`}
                aria-label="Previous featured event"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                id="featured-next-btn"
                type="button"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl border shadow-sm transition ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF] hover:bg-[#2A1E38] hover:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-white text-[#140E1E] hover:bg-[#F7F2FA] hover:border-[#FF1E83]'
                }`}
                aria-label="Next featured event"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Cinematic Featured Hero Banner Card */}
        <div
          className={`group relative overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 ${
            isNight
              ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
              : 'border-[#EBE4F0] bg-white text-[#140E1E]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] sm:min-h-[440px]">
            {/* Banner Image Container */}
            <div className="relative lg:col-span-7 overflow-hidden bg-[#0A070D] min-h-[280px] sm:min-h-[340px] lg:min-h-full">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/40 lg:to-black/90" />

              {/* Badges: Featured (Mustard/Gold) + Category */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-md shadow-[#F59E0B]/30">
                  <Sparkles className="h-3.5 w-3.5 fill-black" />
                  Featured
                </span>
                <span className="rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white/95 backdrop-blur-md border border-white/15">
                  {currentEvent.categoryLabel}
                </span>
              </div>

              {/* Heart / Favourite Button on Banner */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(currentEvent.id);
                }}
                id={`featured-fav-btn-${currentEvent.id}`}
                type="button"
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/65 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-95 border border-white/20"
                aria-label={isFav ? 'Remove from saved' : 'Save event'}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFav
                      ? 'fill-[#FF5364] text-[#FF5364] scale-110'
                      : 'text-white/80 hover:text-[#FF5364]'
                  }`}
                />
              </button>

              {/* Price Tag Overlay on mobile image bottom */}
              <div className="absolute bottom-4 left-4 lg:hidden rounded-xl bg-black/80 backdrop-blur-md border border-white/20 px-3 py-1.5 text-xs font-black text-[#F59E0B]">
                Tickets from {currentEvent.formattedPrice || `₦${currentEvent.price?.toLocaleString()}`}
              </div>
            </div>

            {/* Content Details Container */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Event Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-[#FF1E83]/15 text-[#FF1E83] border border-[#FF1E83]/30">
                    <Clock className="h-3 w-3" /> Live Night Show
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Instant Pass
                  </span>
                </div>

                {/* Event Title */}
                <h3
                  className={`text-2xl sm:text-3xl font-black tracking-tight leading-tight ${
                    isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
                  }`}
                >
                  {currentEvent.title}
                </h3>

                {/* Date, Time & Venue */}
                <div className="space-y-2.5 pt-1 text-sm font-semibold">
                  <div className={`flex items-center gap-2.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    <Calendar className="h-4 w-4 text-[#FF1E83] shrink-0" />
                    <span>{currentEvent.date} • {currentEvent.time}</span>
                  </div>

                  <div className={`flex items-center gap-2.5 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
                    <MapPin className="h-4 w-4 text-[#F59E0B] shrink-0" />
                    <span>{currentEvent.venue}, {currentEvent.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed line-clamp-3 ${
                    isNight ? 'text-[#C8BDD4]/90' : 'text-[#6B5E78]'
                  }`}
                >
                  {currentEvent.description}
                </p>
              </div>

              {/* Price & Hot Pink CTA Button */}
              <div className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isNight ? 'border-[#2A1E38]' : 'border-[#EBE4F0]'
              }`}>
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'}`}>
                    Starting from
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-[#F59E0B]">
                    {currentEvent.formattedPrice || `₦${currentEvent.price?.toLocaleString()}`}
                  </div>
                </div>

                {/* Hot Pink CTA: Get Tickets */}
                <button
                  onClick={() => onGetTickets(currentEvent)}
                  id="featured-get-tickets-btn"
                  type="button"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-7 py-3.5 text-base font-black text-white shadow-lg shadow-[#FF1E83]/30 transition-all duration-200 active:scale-95 group/btn"
                >
                  <Ticket className="h-5 w-5" />
                  <span>Get Tickets</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
