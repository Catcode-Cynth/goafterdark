import React, { useState, useEffect } from 'react';
import { Search, MapPin, X, ArrowRight, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function SearchBar({
  searchQuery = '',
  locationQuery = '',
  onSearch,
  onReset,
  totalEventsCount = 0,
  isNight = true,
}) {
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [localLocation, setLocalLocation] = useState(locationQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalLocation(locationQuery);
  }, [locationQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      search: localSearch,
      location: localLocation,
    });
  };

  const handleClear = () => {
    setLocalSearch('');
    setLocalLocation('');
    onReset();
  };

  const hasInputs = localSearch.trim() !== '' || localLocation.trim() !== '';

  return (
    <section
      className={`w-full py-10 sm:py-14 border-b transition-colors duration-200 ${
        isNight
          ? 'border-[#2A1E38] bg-[#0A070D]'
          : 'border-[#EBE4F0] bg-[#FAF8FC]'
      }`}
      id="search-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-black uppercase tracking-wider mb-3 shadow-xs border ${
              isNight
                ? 'border-[#2A1E38] bg-[#161022] text-[#FF1E83]'
                : 'border-[#EBE4F0] bg-white text-[#FF1E83]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 fill-[#FF1E83]" />
            <span>Find Tonight's Plan</span>
          </div>

          <h2
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
            }`}
          >
            Discover Events & Concerts
          </h2>
          <p
            className={`mt-2 text-xs sm:text-sm max-w-xl mx-auto ${
              isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
            }`}
          >
            Search by keyword, artist, venue, or neighborhood in Lagos and beyond.
          </p>
        </div>

        {/* Search Box Form */}
        <form
          onSubmit={handleSubmit}
          id="homepage-search-form"
          className={`mx-auto max-w-4xl rounded-2xl border p-2.5 sm:p-3.5 shadow-xl transition-colors duration-200 ${
            isNight
              ? 'border-[#2A1E38] bg-[#161022]'
              : 'border-[#EBE4F0] bg-white'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
            {/* Field 1: Event Name / Details */}
            <div className="md:col-span-6 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search className={`h-4 w-4 ${isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'}`} />
              </div>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Event name, artist, or music vibe…"
                id="search-event-input"
                className={`block w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E] placeholder:text-[#8E7F9A]/70 focus:border-[#FF1E83] focus:bg-white'
                }`}
              />
            </div>

            {/* Field 2: Location */}
            <div className="md:col-span-4 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <MapPin className="h-4 w-4 text-[#F59E0B]" />
              </div>
              <input
                type="text"
                value={localLocation}
                onChange={(e) => setLocalLocation(e.target.value)}
                placeholder="City, venue, or area (e.g. Lagos, VI)…"
                id="search-location-input"
                className={`block w-full rounded-xl border py-3 pl-10 pr-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FAF5FF] placeholder:text-[#C8BDD4]/50 focus:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E] placeholder:text-[#8E7F9A]/70 focus:border-[#FF1E83] focus:bg-white'
                }`}
              />
            </div>

            {/* Action Buttons: Hot Pink Search + Optional Reset */}
            <div className="md:col-span-2 flex items-center gap-2">
              <button
                type="submit"
                id="search-submit-btn"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF1E83] hover:bg-[#E6006E] py-3 px-4 text-sm font-black text-white shadow-md shadow-[#FF1E83]/30 transition-all duration-150 active:scale-95"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>

              {hasInputs && (
                <button
                  type="button"
                  onClick={handleClear}
                  id="search-clear-btn"
                  title="Clear search"
                  className={`p-3 rounded-xl border transition ${
                    isNight
                      ? 'border-[#2A1E38] bg-[#0E0A16] text-[#C8BDD4] hover:text-white'
                      : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#6B5E78] hover:text-[#140E1E]'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
