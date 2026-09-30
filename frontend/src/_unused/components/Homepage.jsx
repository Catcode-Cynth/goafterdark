import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import FeaturedEvent from './components/FeaturedEvent';
import CategoryFilter from './components/CategoryFilter';
import EventList from './components/EventList';
import BookingCTA from './components/BookingCTA';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import EventDetailModal from './components/EventDetailModal';
import AuthModal from './components/AuthModal';
import { MOCK_EVENTS, MOCK_CATEGORIES } from './data/mockEvents';

export default function Homepage() {
  // Theme state: dark/light mode with persistence
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('eventful_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('eventful_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('eventful_theme', 'light');
    }
  }, [darkMode]);

  // Categories & Filtering
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Search state
  const [locationQuery, setLocationQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Favourites state with LocalStorage persistence
  const [favourites, setFavourites] = useState(() => {
    try {
      const savedFavs = localStorage.getItem('eventful_favourites');
      return savedFavs ? JSON.parse(savedFavs) : ['evt-1'];
    } catch {
      return ['evt-1'];
    }
  });

  // Filter mode to view only saved favourites
  const [showingFavouritesOnly, setShowingFavouritesOnly] = useState(false);

  // Save favourites whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('eventful_favourites', JSON.stringify(favourites));
    } catch (e) {
      console.error('Failed to save favourites to localStorage', e);
    }
  }, [favourites]);

  // Modals state
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState({ isOpen: false, mode: 'login' });
  const [currentUser, setCurrentUser] = useState(null);

  // Toast / notification banner
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle favourite
  const handleToggleFavourite = (eventId) => {
    setFavourites((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Removed from favourites');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Saved to favourites! ❤️');
        return [...prev, eventId];
      }
    });
  };

  // Open Event detail modal
  const handleSelectEvent = (event) => {
    setSelectedEventForModal(event);
    setIsDetailModalOpen(true);
  };

  // Open Auth modal
  const handleOpenAuth = (mode = 'login') => {
    setAuthModalState({ isOpen: true, mode });
  };

  // Smooth scroll to explore / all events section
  const handleExploreClick = () => {
    const el = document.getElementById('all-events-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setLocationQuery('');
    setSearchQuery('');
    setShowingFavouritesOnly(false);
  };

  // Execute explicit search
  const handleSearch = (location, query) => {
    setLocationQuery(location);
    setSearchQuery(query);
    handleExploreClick();
  };

  // The featured event (first featured item or first item)
  const featuredEvent = useMemo(() => {
    return MOCK_EVENTS.find((e) => e.featured) || MOCK_EVENTS[0];
  }, []);

  // Filtered Events logic (Category + Location + Search Query + Favourites Filter)
  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      // 1. Favourites filter if toggled
      if (showingFavouritesOnly && !favourites.includes(event.id)) {
        return false;
      }

      // 2. Category match
      if (
        selectedCategory !== 'all' &&
        event.categoryId.toLowerCase() !== selectedCategory.toLowerCase() &&
        event.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // 3. Location match
      if (locationQuery.trim()) {
        const loc = locationQuery.toLowerCase().trim();
        const matchesCity = event.city?.toLowerCase().includes(loc);
        const matchesVenue = event.venue?.toLowerCase().includes(loc);
        const matchesCountry = event.country?.toLowerCase().includes(loc);
        if (!matchesCity && !matchesVenue && !matchesCountry) {
          return false;
        }
      }

      // 4. Search query (title, description, organizer, category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesDesc = event.description?.toLowerCase().includes(q);
        const matchesCat = event.category.toLowerCase().includes(q);
        const matchesOrg = event.organizer?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesOrg) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, locationQuery, searchQuery, showingFavouritesOnly, favourites]);

  const currentCategoryObj = MOCK_CATEGORIES.find((c) => c.id === selectedCategory);
  const currentCategoryName = currentCategoryObj ? currentCategoryObj.name : 'All';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col antialiased font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold shadow-xl animate-in slide-in-from-bottom-4 duration-200 border border-slate-700 dark:border-slate-200">
          {toastMessage}
        </div>
      )}

      {/* User Greeting Bar (if logged in) */}
      {currentUser && (
        <div className="bg-indigo-600 text-white text-xs py-1.5 px-4 text-center font-medium">
          Logged in as <strong>{currentUser.name}</strong> ({currentUser.email}) •{' '}
          <button
            onClick={() => {
              setCurrentUser(null);
              showToast('Logged out');
            }}
            className="underline hover:text-indigo-100 ml-1 font-bold cursor-pointer"
          >
            Log Out
          </button>
        </div>
      )}

      {/* 1. HEADER / NAVIGATION */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAuth={handleOpenAuth}
        onExploreClick={handleExploreClick}
        favouriteCount={favourites.length}
        showingFavouritesOnly={showingFavouritesOnly}
        onShowFavouritesOnly={() => setShowingFavouritesOnly(!showingFavouritesOnly)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full space-y-3 sm:space-y-4 pb-8">
        
        {/* 2. FEATURED EVENTS SECTION */}
        <FeaturedEvent
          event={featuredEvent}
          onGetTickets={handleSelectEvent}
        />

        {/* 3. CATEGORIES */}
        <CategoryFilter
          categories={MOCK_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => {
            setSelectedCategory(catId);
            setShowingFavouritesOnly(false);
          }}
        />

        {/* 4. ALL EVENTS */}
        <EventList
          events={filteredEvents}
          favourites={favourites}
          onToggleFavourite={handleToggleFavourite}
          onSelectEvent={handleSelectEvent}
          selectedCategoryName={currentCategoryName}
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          showingFavouritesOnly={showingFavouritesOnly}
          onResetFilters={handleResetFilters}
        />

        {/* 5. READY TO BOOK SECTION */}
        <BookingCTA
          onOpenAuth={handleOpenAuth}
        />

        {/* 6. SEARCH SECTION (Near bottom as in wireframe) */}
        <SearchBar
          locationQuery={locationQuery}
          setLocationQuery={setLocationQuery}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          onReset={handleResetFilters}
        />

      </main>

      {/* 7. FOOTER */}
      <Footer />

      {/* MODALS */}
      {/* Event Details & Ticket Purchasing Modal */}
      <EventDetailModal
        event={selectedEventForModal}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isFavourite={selectedEventForModal ? favourites.includes(selectedEventForModal.id) : false}
        onToggleFavourite={handleToggleFavourite}
      />

      {/* Auth Modal (Sign In / Create Account) */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
        onSuccess={(userData) => {
          setCurrentUser(userData);
          showToast(`Welcome ${userData.name}!`);
        }}
      />

    </div>
  );
}
