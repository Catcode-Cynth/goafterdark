// src/components/EventDetail.tsx
import React from 'react';
import { ArrowLeft, Share2, Heart, Calendar, MapPin, Clock, Users, Send, Mail, ChevronRight } from 'lucide-react';

const InfoCard = ({ icon, title, value, subValue }: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subValue: string;
}) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-5">
    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
    </div>
    <div className="space-y-1">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <p className="font-bold text-slate-900">{value}</p>
      <p className="text-[10px] text-slate-500 font-medium">{subValue}</p>
    </div>
  </div>
);

const EventDetail = () => {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-24 font-sans">
      {/* Hero Header */}
      <div className="relative h-[45vh] w-full">
        <img 
          src="https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&q=80" 
          alt="Neon Horizon 2024" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent"></div>

        {/* Navigation Actions */}
        <div className="relative z-10 flex justify-between items-center px-4 py-6">
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-transform active:scale-90">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-3">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-transform active:scale-90">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 transition-transform active:scale-90">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
          <span className="inline-block px-3 py-1 bg-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded mb-3">
            Live Music Festival
          </span>
          <h1 className="text-3xl font-black mb-3">Neon Horizon 2024</h1>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-white/90">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Aug 15-17, 2024</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-6 py-8 space-y-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 gap-4">
          <InfoCard 
            icon={<Clock className="text-indigo-600" />} 
            title="Time & Duration" 
            value="8:00 PM - 2:00 AM" 
            subValue="Doors open at 7:30 PM nightly" 
          />
          <InfoCard 
            icon={<Users className="text-pink-600" />} 
            title="Capacity" 
            value="50,000+ Attendees" 
            subValue="All-ages welcome with VIP areas" 
          />
        </div>

        {/* About Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">About the Festival</h3>
          <div className="text-slate-600 text-sm leading-relaxed space-y-4">
            <p>Neon Horizon returns to the heart of Los Angeles for its most ambitious year yet. Experience three nights of unparalleled audiovisual immersion as we transform the urban landscape into a futuristic sanctuary of sound and light.</p>
            <p>Featuring a curated lineup of global headliners and emerging underground talent, Neon Horizon 2024 pushes the boundaries of live entertainment.</p>
          </div>
        </section>

        {/* Lineup Section */}
        <section className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-950/20">
          <h3 className="text-lg font-bold mb-6">Confirmed Lineup</h3>
          <div className="flex flex-wrap gap-2">
            {['Cyber Pulse', 'Velocity X', 'Echo Droid', 'Midnight Core'].map((artist) => (
              <span 
                key={artist} 
                className="px-4 py-2 bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-indigo-200"
              >
                {artist}
              </span>
            ))}
            <span className="px-4 py-2 bg-indigo-600/30 border border-indigo-500/30 rounded-lg text-xs font-bold uppercase tracking-wider text-indigo-300">
              + 20 More
            </span>
          </div>
        </section>

        {/* Location Map Placeholder */}
        <section className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-indigo-50 border border-indigo-100 group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80" 
              alt="Map Location" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Downtown Plaza</p>
              <p className="text-xs text-slate-500">1200 S Figueroa St, Los Angeles, CA 90015</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors">
              <Send className="w-4 h-4" /> Get Directions
            </button>
          </div>
        </section>

        {/* Organizer */}
        <section className="bg-indigo-50 rounded-2xl p-4 flex items-center justify-between border border-indigo-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" 
                alt="Organizer" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Organized by</p>
              <p className="font-bold text-slate-900 leading-tight">Pulse Entertainment</p>
            </div>
          </div>
          <button className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm hover:shadow-md transition-shadow active:scale-95">
            <Mail className="w-5 h-5" />
          </button>
        </section>
      </main>

      {/* Persistent Booking Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starts from</p>
          <p className="text-2xl font-black text-slate-900">$89 <span className="text-sm font-medium text-slate-400">/ person</span></p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center gap-3 active:scale-[0.98] transition-transform">
          Get Tickets <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default EventDetail;