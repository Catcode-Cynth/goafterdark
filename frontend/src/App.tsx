/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Homepage from './homepage.jsx';
import MobileLoginScreen from './components/MobileLoginScreen';
import CreatorDashboard from './components/CreatorDashboard';
import CreatorAttendees from './components/CreatorAttendees';
import CreatorBookings from './components/CreatorBookings';
import AttendeeDashboard from './components/AttendeeDashboard';
import CreateEventScreen from './pages/CreateEvent';
import CreatorProfile from './components/CreatorProfile';
import CheckoutPayment from './pages/CheckoutPayment';
import CreatorStudio from './pages/CreatorStudio';
import EventDetail from './pages/EventDetail';
import EventsFeed from './pages/EventsFeed';
import MyTickets from './pages/MyTickets';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SigninPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import type { EventItem, User as UserModel } from './entities';
import { getToken, getStoredUser, clearToken, setStoredUser } from './lib/api';

function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: 'CREATOR' | 'EVENTEE';
}) {
  const token = getToken();
  const user = getStoredUser();
  if (!token) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) {
    return (
      <Navigate
        to={user?.role === 'CREATOR' ? '/creator/dashboard' : '/dashboard'}
        replace
      />
    );
  }
  return <>{children}</>;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  void location;

  const [selectedCheckoutEvent, setSelectedCheckoutEvent] = useState<EventItem | null>(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState<EventItem | null>(null);
  const [checkoutQuantity, setCheckoutQuantity] = useState<number>(1);

  const [currentUser, setCurrentUser] = useState<Partial<UserModel> | null>({
    email: 'cynthia@goafterdark.live',
    name: 'Cynthia Okechukwu',
  });

  const handleLoginSuccess = (user: {
    email: string;
    name?: string;
    role?: 'CREATOR' | 'EVENTEE';
  }) => {
    setCurrentUser(user);
    setTimeout(() => {
      navigate(user.role === 'CREATOR' ? '/creator/dashboard' : '/dashboard');
    }, 800);
  };

  const goToLogin = () => navigate('/login');

  const handleLogout = () => {
    clearToken();
    setStoredUser(null);
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen bg-[#0B0714] text-[#F5F0FF] font-sans selection:bg-[#FF1E83] selection:text-white">
      <Routes>
        <Route
          path="/tickets"
          element={
            <RequireAuth>
              <MyTickets
                onBack={() => navigate('/events')}
                onExploreEvents={() => navigate('/events')}
                onSelectTicket={(ticket) => {
                  setSelectedEventDetail({
                    id: ticket.event_id || ticket.id,
                    title: ticket.event_title,
                    date: ticket.event_date,
                    time: ticket.event_time,
                    location: ticket.event_location,
                    venue: ticket.venue,
                    price: ticket.total_price / (ticket.quantity || 1),
                    image_url: ticket.event_image_url,
                    category: ticket.category || 'General',
                  } as EventItem);
                  navigate('/event');
                }}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/events"
          element={
            <EventsFeed
              onSelectEvent={(eventData) => {
                setSelectedEventDetail(eventData as EventItem);
                navigate('/event');
              }}
              onViewMyTickets={() => navigate('/tickets')}
              onNavigate={(nextPath) => {
                navigate(nextPath.includes('tickets') ? '/tickets' : '/events');
              }}
            />
          }
        />
        <Route
          path="/event"
          element={
            <EventDetail
              event={selectedEventDetail}
              onBack={() => navigate('/dashboard')}
              onProceedToCheckout={(eventData, qty) => {
                setSelectedCheckoutEvent(eventData as EventItem);
                setCheckoutQuantity(qty);
                navigate('/checkout');
              }}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPayment
                event={selectedCheckoutEvent ?? undefined}
                quantity={checkoutQuantity}
                onBack={() => navigate('/event')}
                onViewMyTickets={() => navigate('/dashboard')}
                onBrowseEvents={() => navigate('/dashboard')}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <Homepage
              onOpenMobileLogin={goToLogin}
              onOpenMobileSignup={() => navigate('/signup')}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/creator/bookings"
          element={
            <RequireAuth role="CREATOR">
              <CreatorBookings
                onExploreClick={() => navigate('/')}
                onOpenDashboard={() => navigate('/creator/dashboard')}
                onOpenProfile={() => navigate('/creator/profile')}
                onLogout={handleLogout}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/creator/profile"
          element={
            <RequireAuth role="CREATOR">
              <CreatorProfile
                onExploreClick={() => navigate('/')}
                onOpenDashboard={() => navigate('/creator/dashboard')}
                onLogout={handleLogout}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/creator/events/new"
          element={
            <RequireAuth role="CREATOR">
              <CreateEventScreen
                onExploreClick={() => navigate('/')}
                onOpenDashboard={() => navigate('/creator/dashboard')}
                onLogout={handleLogout}
                onSaveSuccess={() => navigate('/creator/dashboard')}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <AttendeeDashboard
                onLogout={handleLogout}
                onOpenCreatorView={() => navigate('/creator/dashboard')}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/creator/studio"
          element={
            <RequireAuth role="CREATOR">
              <CreatorStudio
                onBack={() => navigate('/creator/dashboard')}
                onCreateEvent={() => navigate('/creator/events/new')}
                onViewAttendees={() => navigate('/creator/attendees')}
                onExploreEvents={() => navigate('/dashboard')}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/creator/attendees"
          element={
            <RequireAuth role="CREATOR">
              <CreatorAttendees
                onExploreClick={() => navigate('/')}
                onOpenDashboard={() => navigate('/creator/dashboard')}
                onOpenProfile={() => navigate('/creator/profile')}
                onLogout={handleLogout}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/login"
          element={
            <SignInPage
              onBack={() => navigate('/')}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={() => navigate('/forgot-password')}
              onSignUp={() => navigate('/signup')}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpPage
              onBack={goToLogin}
              onSignIn={goToLogin}
              onRegisterSuccess={handleLoginSuccess}
              onNavigate={(nextPath) => {
                if (nextPath === '/events' || nextPath === '/attendee-dashboard') {
                  navigate('/dashboard');
                } else {
                  navigate('/login');
                }
              }}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ForgotPassword
              onBackToLogin={goToLogin}
              onNavigateToReset={() => navigate('/reset-password')}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPassword
              onBackToLogin={goToLogin}
              onRequestNewLink={() => navigate('/forgot-password')}
              onResetSuccess={goToLogin}
            />
          }
        />
        <Route
          path="/creator/dashboard"
          element={
            <RequireAuth role="CREATOR">
              <CreatorDashboard
                onExploreClick={() => navigate('/')}
                onLogout={handleLogout}
                onViewAttendees={() => navigate('/creator/attendees')}
                onCreateEventClick={() => navigate('/creator/events/new')}
                onOpenProfile={() => navigate('/creator/profile')}
              />
            </RequireAuth>
          }
        />
        <Route
          path="/preview/mobile-login"
          element={
            <MobileLoginScreen
              initialMode="login"
              onBackToHome={() => navigate('/')}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={() => navigate('/forgot-password')}
              standalone={true}
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
