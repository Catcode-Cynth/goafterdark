import React from 'react';
import { 
  Sparkles, 
  Music, 
  Trophy, 
  Drama, 
  PartyPopper, 
  Presentation, 
  MoreHorizontal,
  Flame,
  Laugh
} from 'lucide-react';

const CATEGORY_ICONS = {
  all: Flame,
  music: Music,
  sports: Trophy,
  theatre: Drama,
  festival: PartyPopper,
  conference: Presentation,
  more: MoreHorizontal,
};

export default function CategoryFilter({
  categories = [],
  activeCategory = 'all',
  onSelectCategory,
  categoryCounts = {},
  isNight = true,
}) {
  return (
    <section
      className={`w-full border-y transition-colors duration-200 py-4 sm:py-5 shadow-xs ${
        isNight
          ? 'border-[#2A1E38] bg-[#0E0A16]'
          : 'border-[#EBE4F0] bg-[#F7F2FA]'
      }`}
      id="categories-section"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF1E83]" />
            <h3
              className={`text-xs font-black uppercase tracking-wider ${
                isNight ? 'text-[#C8BDD4]' : 'text-[#6B5E78]'
              }`}
            >
              Browse by Category
            </h3>
          </div>
          <span
            className={`hidden sm:inline text-xs font-semibold ${
              isNight ? 'text-[#C8BDD4]/70' : 'text-[#8E7F9A]'
            }`}
          >
            Select a vibe to filter live night events
          </span>
        </div>

        {/* Category Buttons Container */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
            const count = categoryCounts[cat.id];

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                id={`category-btn-${cat.id}`}
                type="button"
                className={`group inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF1E83]/40 ${
                  isActive
                    ? 'bg-[#FF1E83] text-white shadow-md shadow-[#FF1E83]/30 border border-[#FF1E83]'
                    : isNight
                    ? 'border border-[#2A1E38] bg-[#161022] text-[#FAF5FF] hover:border-[#FF1E83]/60 hover:bg-[#2A1E38]/50'
                    : 'border border-[#EBE4F0] bg-white text-[#140E1E] hover:border-[#FF1E83]/50 hover:bg-white'
                }`}
                aria-pressed={isActive}
              >
                <Icon
                  className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : isNight ? 'text-[#FF1E83]' : 'text-[#FF1E83]'
                  }`}
                />
                <span>{cat.label}</span>

                {count !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isNight
                        ? 'bg-[#2A1E38] text-[#C8BDD4]'
                        : 'bg-[#EBE4F0] text-[#6B5E78]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
