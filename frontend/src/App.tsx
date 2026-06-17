import React, { useState } from 'react';
import { 
  Eye, ArrowRight, User, Mail, Lock, X, Globe, Apple,
  Calendar, Bell, SlidersHorizontal, Music, Cpu,
  ArrowLeft, ShieldCheck, ChevronRight, CreditCard, Wallet, Landmark,
  TrendingUp, Users, DollarSign, Edit3, Trash2
} from 'lucide-react';

// ====================== HELPER COMPONENTS ======================

const RoleCard = ({ active, onClick, icon, title, desc }: any) => (
  <button 
    onClick={onClick} 
    className={`p-6 rounded-3xl border-2 text-center flex flex-col items-center gap-3 transition-all ${active ? 'border-indigo-600 bg-indigo-50/50 shadow-lg shadow-indigo-100' : 'border-slate-100 bg-white'}`}
  >
    {icon}
    <div>
      <p className="font-bold text-slate-900 leading-tight">{title}</p>
      <p className="text-[10px] text-slate-400 font-medium">{desc}</p>
    </div>
  </button>
);

const InputField = ({ label, placeholder, type = "text", icon, trailingIcon }: any) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
      <input 
        type={type} 
        placeholder={placeholder} 
        className="w-full pl-14 pr-5 py-5 bg-indigo-50/30 border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all placeholder:text-slate-300 font-medium" 
      />
      {trailingIcon && <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400">{trailingIcon}</div>}
    </div>
  </div>
);

const FilterChip = ({ 
  icon, 
  label, 
  active = false, 
  onClick 
}: { 
  icon?: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all whitespace-nowrap ${
      active 
        ? 'bg-indigo-600 text-white shadow-md' 
        : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
    }`}
  >
    {icon && <span className="text-lg">{icon}</span>}
    <span>{label}</span>
  </button>
);

const NavItem = ({ icon, label, active = false }: any) => (
  <button className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
    <div className={`${active ? 'bg-indigo-50 p-1.5 rounded-lg' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

// ====================== PLACEHOLDER SCREENS ======================

const EventsFeed = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { label: 'All Events', icon: <Calendar size={18} /> },
    { label: 'Music', icon: <Music size={18} /> },
    { label: 'Tech', icon: <Cpu size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] pb-20">
      <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 z-50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-slate-900">Discover</h1>
          <button className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
            <SlidersHorizontal size={22} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar">
          {filters.map((f, i) => (
            <FilterChip
              key={i}
              icon={f.icon}
              label={f.label}
              active={activeFilter === f.label.toLowerCase()}
              onClick={() => setActiveFilter(f.label.toLowerCase())}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pt-6">
        <h2 className="text-lg font-bold mb-4">Featured Events</h2>
        <p className="text-slate-500">Your events feed will go here...</p>
      </div>
    </div>
  );
};

const MyTickets = () => (
  <div className="min-h-screen bg-[#f8f9ff] p-6">
    <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
    <p className="text-slate-500">Your purchased tickets will appear here.</p>
  </div>
);

// ====================== CHECKOUT & CREATOR SCREENS ======================

const CheckoutPayment = () => {
  const [method, setMethod] = useState('card');

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-12 font-sans">
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-4 py-3 border-b border-indigo-50">
        <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-indigo-600" />
        </button>
        <h1 className="text-xl font-extrabold text-indigo-600 tracking-tight">EventPulse</h1>
        <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors relative">
          <Lock className="w-6 h-6 text-indigo-600" />
        </button>
      </header>

      <main className="pt-20 px-6 space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">1</div>
          <div className="h-px w-8 bg-indigo-200"></div>
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-200">2</div>
          <div className="h-px w-8 bg-indigo-100"></div>
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-sm">3</div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Payment Method</h2>
          <div className="space-y-3">
            <PaymentOption id="card" active={method === 'card'} onClick={() => setMethod('card')} icon={<CreditCard className="w-6 h-6" />} title="Credit / Debit Card" desc="Visa, Mastercard, Amex" />
            <PaymentOption id="paystack" active={method === 'paystack'} onClick={() => setMethod('paystack')} icon={<Wallet className="w-6 h-6" />} title="Paystack" desc="Fast, secure local payment" />
            <PaymentOption id="bank" active={method === 'bank'} onClick={() => setMethod('bank')} icon={<Landmark className="w-6 h-6" />} title="Bank Transfer" desc="Manual confirmation required" />
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
            <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
            <div className="relative">
              <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-300" />
              <CreditCard className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
              <input type="text" placeholder="MM/YY" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
              <input type="password" placeholder="***" className="w-full px-5 py-4 bg-white border border-indigo-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
        </section>

        <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex gap-4 items-start">
          <ShieldCheck className="w-6 h-6 text-indigo-600 shrink-0" />
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Your transaction is secured with 256-bit SSL encryption. We never store your CVV.
          </p>
        </div>

        <section className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-50 space-y-6">
          <h3 className="text-xl font-black text-slate-900">Order Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">2x VIP Front Row</span>
              <span className="font-bold">₦150,000.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Service Fee</span>
              <span className="font-bold">₦4,500.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">VAT (7.5%)</span>
              <span className="font-bold">₦11,250.00</span>
            </div>
            <div className="h-px bg-slate-100"></div>
            <div className="flex justify-between items-end pt-2">
              <span className="text-lg font-black">Total</span>
              <span className="text-3xl font-black text-indigo-600">₦165,750.00</span>
            </div>
          </div>

          <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-transform">
            Pay ₦165,750.00 Now <ChevronRight className="w-5 h-5" />
          </button>
        </section>
      </main>
    </div>
  );
};

const PaymentOption = ({ active, onClick, icon, title, desc }: any) => (
  <button 
    onClick={onClick}
    className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between gap-4 transition-all ${active ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-100 bg-white'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${active ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
        {icon}
      </div>
      <div className="text-left">
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{desc}</p>
      </div>
    </div>
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'border-indigo-600' : 'border-slate-200'}`}>
      {active && <div className="w-3 h-3 rounded-full bg-indigo-600"></div>}
    </div>
  </button>
);

const CreatorStudio = () => {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 pb-28 font-sans">
      <header className="px-6 pt-12 pb-6 space-y-2">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Creator Studio</h1>
          <button className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
            <Bell className="w-6 h-6" />
          </button>
        </div>
        <p className="text-slate-500 font-medium">Manage your events and track performance.</p>
      </header>

      <main className="px-6 space-y-8">
        <button className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <Plus className="w-6 h-6" /> Create New Event
        </button>

        {/* Add the rest of your CreatorStudio content here (MetricCard, EventCard, etc.) */}
        <p className="text-slate-500">Creator Studio content goes here...</p>
      </main>

      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 px-6 py-3 flex justify-around items-center z-50">
        <NavItem icon={<Calendar />} label="Events" />
        <NavItem icon={<DollarSign />} label="Sales" />
        <NavItem icon={<TrendingUp />} label="Studio" active />
        <NavItem icon={<Users />} label="Team" />
      </nav>
    </div>
  );
};

// ====================== LOGIN & REGISTER (shortened for space) ======================
// Paste your full Login and Register here if needed, or keep them as before.

const Login = ({ onLogin, onSwitchToRegister }: { onLogin: () => void; onSwitchToRegister: () => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Login successful! (Demo)");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 flex flex-col items-center px-6 py-12 font-sans">
      <div className="mb-16">
        <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight text-center">EventPulse</h1>
      </div>
      {/* ... rest of your Login UI ... */}
      <p className="text-sm font-medium text-slate-500 mt-auto">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="text-indigo-600 font-bold hover:underline">Join the Pulse</button>
      </p>
    </div>
  );
};

const Register = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [role, setRole] = useState<'attendee' | 'creator'>('attendee');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Account created successfully! (Demo mode)");
    onSwitchToLogin();
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900 px-6 py-8 font-sans">
      {/* ... your full Register content ... */}
      <p className="text-center text-sm font-medium text-slate-500 mt-12">
        Already have an account? <button onClick={onSwitchToLogin} className="text-indigo-600 font-bold">Sign In</button>
      </p>
    </div>
  );
};

// ====================== MAIN APP ======================
function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'events' | 'tickets' | 'checkout' | 'creator'>('login');

  const navigate = (screen: 'login' | 'register' | 'events' | 'tickets' | 'checkout' | 'creator') => 
    setCurrentScreen(screen);

  return (
    <>
      {currentScreen === 'login' && <Login onLogin={() => navigate('events')} onSwitchToRegister={() => navigate('register')} />}
      {currentScreen === 'register' && <Register onSwitchToLogin={() => navigate('login')} />}
      {currentScreen === 'events' && <EventsFeed />}
      {currentScreen === 'tickets' && <MyTickets />}
      {currentScreen === 'checkout' && <CheckoutPayment />}
      {currentScreen === 'creator' && <CreatorStudio />}
    </>
  );
}

export default App;