import React from 'react';
import EventCard from './EventCard.jsx';
import { SlidersHorizontal, SearchX, RotateCcw } from 'lucide-react';

export default function EventList({
  events = [],
  activeCategory = 'all',
  categoryLabel = 'All',
  searchQuery = '',
  locationQuery = '',
  sortBy = 'date',
  onSortChange,
  isFavorite,
  onToggleFavorite,
  onSelectEvent,
  onResetFilters,
  isFavoritesFilterActive = false,
  onClearFavoritesFilter,
  isNight = true,
}) {
  const hasActiveFilters = 
    activeCategory !== 'all' || 
    searchQuery.trim() !== '' || 
    locationQuery.trim() !== '' || 
    isFavoritesFilterActive;

  return (
    <section className="w-full py-8 sm:py-12" id="all-events">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with Title, Count & Sort Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
                }`}
              >
                {isFavoritesFilterActive
                  ? 'Your Saved Events'
                  : activeCategory === 'all'
                  ? 'All Events'
                  : `${categoryLabel} Events`}
              </h2>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-black font-mono border ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#161022] text-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-white text-[#FF1E83]'
                }`}
              >
                {events.length} {events.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            <p
              className={`mt-1 text-xs sm:text-sm ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              {isFavoritesFilterActive
                ? 'Events you have saved for tonight & upcoming weekends'
                : 'Browse live concerts, nightlife raves, theatre, and comedy in Lagos'}
            </p>
          </div>

          {/* Sort & Filter Badge Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className={`h-4 w-4 ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`} />
              <label htmlFor="sort-events-select" className="text-xs font-bold sr-only">
                Sort by:
              </label>
              <select
                id="sort-events-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className={`rounded-2xl border px-3.5 py-2 text-xs font-bold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 cursor-pointer ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF] hover:border-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-white text-[#140E1E] hover:border-[#FF1E83]'
                }`}
              >
                <option value="featured">Featured First</option>
                <option value="date">Date: Upcoming</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips bar */}
        {hasActiveFilters && (
          <div
            className={`mb-6 flex flex-wrap items-center gap-2 rounded-2xl p-3.5 text-xs border shadow-sm transition-colors ${
              isNight
                ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
                : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
          >
            <span className={`font-bold ${isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'}`}>
              Active Filters:
            </span>

            {isFavoritesFilterActive && (
              <span className="inline-flex items-center gap-1 rounded-xl bg-[#FF5364]/15 px-3 py-1 text-[#FF5364] border border-[#FF5364]/30 font-bold">
                <span>Saved Events Only</span>
                <button
                  onClick={onClearFavoritesFilter}
                  className="ml-1 hover:text-white font-black"
                  aria-label="Remove favorites filter"
                >
                  ×
                </button>
              </span>
            )}

            {activeCategory !== 'all' && (
              <span
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 border font-bold ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0E0A16] text-[#FF1E83]'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#FF1E83]'
                }`}
              >
                <span>Category: {categoryLabel}</span>
              </span>
            )}

            {searchQuery && (
              <span
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 border font-bold ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0E0A16] text-white'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#140E1E]'
                }`}
              >
                <span>Keyword: "{searchQuery}"</span>
              </span>
            )}

            {locationQuery && (
              <span
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1 border font-bold ${
                  isNight
                    ? 'border-[#2A1E38] bg-[#0E0A16] text-[#F59E0B]'
                    : 'border-[#EBE4F0] bg-[#F7F2FA] text-[#F59E0B]'
                }`}
              >
                <span>Location: "{locationQuery}"</span>
              </span>
            )}

            <button
              onClick={onResetFilters}
              id="btn-reset-filters-chip"
              type="button"
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#FF1E83] hover:underline"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}

        {/* Event Cards Grid or Empty State */}
        {events.length === 0 ? (
          <div
            className={`rounded-2xl border p-12 text-center shadow-sm transition-colors ${
              isNight
                ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
                : 'border-[#EBE4F0] bg-white text-[#140E1E]'
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF1E83]/15 text-[#FF1E83] mb-4">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-black">No events match your criteria</h3>
            <p
              className={`mt-1 text-xs sm:text-sm max-w-md mx-auto ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              Try adjusting your search terms, location, or browse all categories to explore upcoming live shows.
            </p>
            <button
              onClick={onResetFilters}
              id="empty-state-reset-btn"
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#FF1E83] hover:bg-[#E6006E] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#FF1E83]/30 transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isFavorite={isFavorite(event.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectEvent={onSelectEvent}
                isNight={isNight}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
