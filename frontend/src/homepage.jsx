import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import FeaturedEvent from './components/FeaturedEvent.jsx';
import CategoryFilter from './components/CategoryFilter.jsx';
import EventList from './components/EventList.jsx';
import BookingCTA from './components/BookingCTA.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import TicketModal from './components/TicketModal.jsx';
import Toast from './components/Toast.jsx';
import { CATEGORIES, MOCK_EVENTS } from './data/mockEvents.js';

export default function Homepage({ onOpenMobileLogin, onOpenMobileSignup, currentUser }) {
  // Theme State: 'night' by default (as strictly requested)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('goafterdark_theme');
        return savedTheme === 'day' ? 'day' : 'night';
      } catch {
        return 'night';
      }
    }
    return 'night';
  });

  const isNight = theme === 'night';

  const handleThemeToggle = (newTheme) => {
    setTheme(newTheme);
    try {
      localStorage.setItem('goafterdark_theme', newTheme);
    } catch {}
  };

  // Category Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Sorting State
  const [sortBy, setSortBy] = useState('featured');

  // Favourites state with localStorage persistence
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('goafterdark_favorites');
        return saved ? JSON.parse(saved) : ['evt-1', 'evt-2'];
      } catch (err) {
        return ['evt-1', 'evt-2'];
      }
    }
    return ['evt-1', 'evt-2'];
  });

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('goafterdark_favorites', JSON.stringify(favorites));
    } catch (err) {}
  }, [favorites]);

  // Saved / Favorites filter mode
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Modal States
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'login' });
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  // Notification Toast state
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Toggle favorite helper
  const handleToggleFavorite = (eventId) => {
    setFavorites((prev) => {
      const isFav = prev.includes(eventId);
      const targetEvent = MOCK_EVENTS.find((e) => e.id === eventId);
      const title = targetEvent ? targetEvent.title : 'Event';

      if (isFav) {
        showNotification(`Removed "${title}" from your saved passes`, 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        showNotification(`Saved "${title}" to your favourites!`, 'favorite');
        return [...prev, eventId];
      }
    });
  };

  const isFavorite = (eventId) => favorites.includes(eventId);

  // Open Auth Modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };

  const handleCloseAuth = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: false }));
  };

  // Open Ticket / Event details modal
  const handleSelectEvent = (event) => {
    setSelectedEventForModal(event);
  };

  const handleCloseTicketModal = () => {
    setSelectedEventForModal(null);
  };

  // Smooth scroll to Explore / All Events
  const handleExploreClick = () => {
    const el = document.getElementById('all-events');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category change handler
  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setShowFavoritesOnly(false);
  };

  // Search handler from SearchBar
  const handleSearch = ({ search, location }) => {
    setSearchQuery(search || '');
    setLocationQuery(location || '');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setLocationQuery('');
    setShowFavoritesOnly(false);
    setSortBy('featured');
    showNotification('All search and category filters have been reset', 'info');
  };

  // Toggle favorites-only filter
  const handleToggleFavoritesFilter = () => {
    setShowFavoritesOnly((prev) => !prev);
    if (!showFavoritesOnly) {
      handleExploreClick();
    }
  };

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts = { all: MOCK_EVENTS.length };
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = MOCK_EVENTS.filter((e) => e.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered & Sorted Events list
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      // 1. Favorites filter if active
      if (showFavoritesOnly && !favorites.includes(event.id)) {
        return false;
      }

      // 2. Category filter
      if (activeCategory !== 'all' && event.category !== activeCategory) {
        return false;
      }

      // 3. Search query filter (matches title, description, tags, organizer)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesDesc = event.description.toLowerCase().includes(query);
        const matchesOrganizer = event.organizer?.toLowerCase().includes(query);
        const matchesTags = event.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = event.categoryLabel?.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesOrganizer && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      // 4. Location query filter (matches venue, location, city)
      if (locationQuery.trim()) {
        const locQuery = locationQuery.toLowerCase().trim();
        const matchesVenue = event.venue.toLowerCase().includes(locQuery);
        const matchesLocation = event.location.toLowerCase().includes(locQuery);
        const matchesCity = event.city?.toLowerCase().includes(locQuery);

        if (!matchesVenue && !matchesLocation && !matchesCity) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.id.localeCompare(b.id);
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [activeCategory, searchQuery, locationQuery, sortBy, showFavoritesOnly, favorites]);

  // Featured events list for the Featured section
  const featuredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((e) => e.featured);
  }, []);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryLabel = activeCategoryObj ? activeCategoryObj.label : 'All';

  return (
    <div
      className={`min-h-screen transition-colors duration-200 selection:bg-[#FF1E83] selection:text-white flex flex-col justify-between ${
        isNight
          ? 'bg-[#0A070D] text-[#FAF5FF]'
          : 'bg-[#FAF8FC] text-[#140E1E]'
      }`}
    >
      {/* 1. HEADER / NAVIGATION (GoAfterDark logo, Explore Events, Top Right: Sun/Moon toggle, Login, Sign Up) */}
      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onOpenAuth={onOpenMobileLogin || handleOpenAuth}
        onOpenMobileLogin={onOpenMobileLogin}
        onOpenMobileSignup={onOpenMobileSignup}
        currentUser={currentUser}
        onExploreClick={handleExploreClick}
        favoriteCount={favorites.length}
        onShowFavoritesOnly={handleToggleFavoritesFilter}
        isFavoritesFilterActive={showFavoritesOnly}
      />

      <main className="flex-1">
        {/* 2. FEATURED EVENTS / HERO SECTION */}
        <FeaturedEvent
          featuredEvents={featuredEvents}
          onGetTickets={handleSelectEvent}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          isNight={isNight}
        />

        {/* 3. CATEGORIES SECTION */}
        <CategoryFilter
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
          categoryCounts={categoryCounts}
          isNight={isNight}
        />

        {/* 4. ALL EVENTS SECTION (6-8 cards, Naira price, category, coral heart) */}
        <EventList
          events={filteredEvents}
          activeCategory={activeCategory}
          categoryLabel={activeCategoryLabel}
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onSelectEvent={handleSelectEvent}
          onResetFilters={handleResetFilters}
          isFavoritesFilterActive={showFavoritesOnly}
          onClearFavoritesFilter={() => setShowFavoritesOnly(false)}
          isNight={isNight}
        />

        {/* 5. READY TO BOOK CTA SECTION */}
        <BookingCTA onOpenAuth={handleOpenAuth} isNight={isNight} />

        {/* 6. SEARCH SECTION */}
        <SearchBar
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          onSearch={handleSearch}
          onReset={handleResetFilters}
          totalEventsCount={MOCK_EVENTS.length}
          isNight={isNight}
        />
      </main>

      {/* 7. FOOTER */}
      <Footer
        onExploreClick={handleExploreClick}
        onOpenAuth={handleOpenAuth}
        isNight={isNight}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={handleCloseAuth}
        isNight={isNight}
        onSuccess={(userName) => {
          showNotification(`Signed in successfully as ${userName}!`, 'success');
        }}
      />

      {/* Ticket Details & Booking Modal */}
      <TicketModal
        event={selectedEventForModal}
        isOpen={Boolean(selectedEventForModal)}
        onClose={handleCloseTicketModal}
        isFavorite={selectedEventForModal ? isFavorite(selectedEventForModal.id) : false}
        onToggleFavorite={handleToggleFavorite}
        isNight={isNight}
        onBookingComplete={(booking) => {
          showNotification(`Reserved ${booking.quantity}x ${booking.tier} for ${booking.eventTitle}!`, 'success');
        }}
      />

      {/* Feedback Toast Notification */}
      <Toast
        notification={notification}
        onClose={() => setNotification(null)}
        isNight={isNight}
      />
    </div>
  );
}
