import React, { useState, useRef } from 'react';
import {
  Ticket,
  Sparkles,
  LayoutDashboard,
  User,
  Sun,
  Moon,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  Trash2,
  Save,
  KeyRound,
  ShieldCheck,
  X,
  Mail,
  UserCheck,
  Check,
  RefreshCw,
  LogOut,
  Info,
  Flame
} from 'lucide-react';

interface CreatorProfileProps {
  onExploreClick?: () => void;
  onOpenDashboard?: () => void;
  onLogout?: () => void;
}

export default function CreatorProfile({
  onExploreClick,
  onOpenDashboard,
  onLogout,
}: CreatorProfileProps) {
  // 1. DAY / NIGHT THEME STATE (Default to Night mode as required)
  const [theme, setTheme] = useState<'night' | 'day'>('night');
  const isNight = theme === 'night';

  // 2. PROFILE PHOTO STATE
  // High-fidelity photo of Cynthia Okechukwu
  const [avatarUrl, setAvatarUrl] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  );
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 3. ACCOUNT DETAILS STATE
  const [displayName, setDisplayName] = useState('Cynthia Okechukwu');
  const [email, setEmail] = useState('cynthia@goafterdark.live');
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [isSavingAccount, setIsSavingAccount] = useState(false);

  // 4. CHANGE PASSWORD STATE
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // 5. DANGER ZONE STATE
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // 6. TOAST NOTIFICATIONS
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Avatar presets for quick switching
  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80',
  ];

  // Handle local file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size exceeds 5MB limit. Please choose a smaller image.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
          setIsPhotoModalOpen(false);
          showToast('Profile photo updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Account Details Save
  const handleSaveAccountDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      showToast('Display Name cannot be empty.', 'error');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }

    setIsSavingAccount(true);
    setTimeout(() => {
      setIsSavingAccount(false);
      showToast('Account details saved successfully!');
    }, 600);
  };

  // Handle Password Update
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      showToast('Please enter your current password.', 'error');
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      showToast('New password must be at least 8 characters long.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match. Please re-check.', 'error');
      return;
    }

    setIsUpdatingPassword(true);
    setTimeout(() => {
      setIsUpdatingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password updated successfully! Your account is secured.');
    }, 700);
  };

  // Handle Account Deletion
  const handleDeleteAccount = () => {
    if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
      showToast('Please type DELETE in capital letters to confirm.', 'error');
      return;
    }

    setIsDeletingAccount(true);
    setTimeout(() => {
      setIsDeletingAccount(false);
      setIsDeleteModalOpen(false);
      showToast('Account deletion initiated. Redirecting to login...', 'info');
      if (onLogout) {
        setTimeout(onLogout, 1200);
      }
    }, 1000);
  };

  // Password strength helper
  const getPasswordStrength = () => {
    if (!newPassword) return 0;
    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/[0-9]/.test(newPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div
      className={`min-h-screen selection:bg-[#7C3AED] selection:text-white flex flex-col justify-between font-sans transition-colors duration-200 ${
        isNight
          ? 'bg-[#0B0714] text-[#F5F0FF]'
          : 'bg-[#F7F5FB] text-[#1A1228]'
      }`}
    >
      {/* 1. HEADER (Required exact layout & order) */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
          isNight
            ? 'bg-[#0B0714]/95 border-[#2E2545] text-[#F5F0FF]'
            : 'bg-white/95 border-[#E8E2F3] text-[#1A1228] shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: GoAfterDark logo + Next: "Explore Events" */}
          <div className="flex items-center gap-4 sm:gap-8">
            {/* GoAfterDark Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={onOpenDashboard}
              id="goafterdark-header-logo"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF1E83] to-[#C9005A] text-white shadow-md shadow-[#FF1E83]/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
                <Flame className="h-5 w-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-xl font-black tracking-tight leading-none ${
                    isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'
                  }`}
                >
                  Go<span className="text-[#FF1E83]">AfterDark</span>
                </span>
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${
                    isNight ? 'text-[#C8BDD4]' : 'text-[#8E7F9A]'
                  }`}
                >
                  Creator Studio
                </span>
              </div>
            </div>

            {/* Next: "Explore Events" */}
            <button
              type="button"
              onClick={onExploreClick}
              id="header-explore-events-btn"
              className={`hidden md:inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022] border border-transparent hover:border-[#2E2545]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB] border border-transparent hover:border-[#E8E2F3]'
              }`}
            >
              <Sparkles className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
              <span>Explore Events</span>
            </button>
          </div>

          {/* Right cluster, in this exact order:
              1. “Profile” (this page, look selected)
              2. “Creator Dashboard”
              3. Day / night theme toggle (far right) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 1. "Profile" (look selected) */}
            <button
              type="button"
              id="header-nav-profile-active"
              className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30 ring-1 ring-white/20'
                  : 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>

            {/* 2. "Creator Dashboard" */}
            <button
              type="button"
              onClick={onOpenDashboard}
              id="header-nav-creator-dashboard"
              className={`inline-flex items-center gap-2 rounded-2xl px-3.5 sm:px-4 py-2 text-sm font-bold transition-all duration-150 ${
                isNight
                  ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#161022] border border-[#2E2545]'
                  : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-[#F7F5FB] border border-[#E8E2F3]'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Creator Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </button>

            {/* 3. Day / night theme toggle (TOP RIGHT: far right of header) */}
            <div
              className={`flex items-center rounded-2xl p-1 shadow-sm border transition-all ${
                isNight
                  ? 'border-[#2E2545] bg-[#161022]'
                  : 'border-[#E8E2F3] bg-[#F7F5FB]'
              }`}
              role="radiogroup"
              aria-label="Theme mode selector"
              id="theme-mode-toggle"
            >
              {/* Day button with Sunshine / Sun icon */}
              <button
                type="button"
                onClick={() => setTheme('day')}
                id="btn-theme-day"
                role="radio"
                aria-checked={!isNight}
                aria-label="Day mode"
                className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  !isNight
                    ? 'bg-white text-[#7C3AED] shadow-sm ring-1 ring-[#E8E2F3]'
                    : 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#2E2545]/40'
                }`}
              >
                <Sun className={`h-4 w-4 ${!isNight ? 'text-amber-500 fill-amber-400' : 'text-[#B8A9D4]'}`} />
                <span className="text-[11px] font-extrabold tracking-wide hidden sm:inline">Day</span>
              </button>

              {/* Night button with Moon icon (Default active) */}
              <button
                type="button"
                onClick={() => setTheme('night')}
                id="btn-theme-night"
                role="radio"
                aria-checked={isNight}
                aria-label="Night mode"
                className={`flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isNight
                    ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/30 ring-1 ring-white/20'
                    : 'text-[#6B6280] hover:text-[#7C3AED] hover:bg-white/60'
                }`}
              >
                <Moon className={`h-4 w-4 ${isNight ? 'text-white fill-white' : 'text-[#6B6280]'}`} />
                <span className="text-[11px] font-extrabold tracking-wide hidden sm:inline">Night</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT WRAPPER */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* PAGE TITLE */}
        <div className="space-y-1" id="creator-profile-title-block">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
            <span className={`text-xs font-black uppercase tracking-widest ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
              Verified Event Organizer
            </span>
          </div>
          <h1
            className={`text-3xl sm:text-4xl font-black tracking-tight ${
              isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
            }`}
            id="page-main-heading"
          >
            Creator Profile
          </h1>
          <p className={`text-sm ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
            Manage your personal creator identity, public branding, and security credentials.
          </p>
        </div>

        {/* SECTION 1: PROFILE PHOTO */}
        <section
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-colors duration-200 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022]'
              : 'border-[#E8E2F3] bg-white'
          }`}
          id="section-profile-photo"
        >
          <div className="space-y-6">
            <div className="border-b pb-4 flex items-center justify-between border-inherit">
              <div>
                <h2
                  className={`text-xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  Profile
                </h2>
                <p className={`text-xs mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Your public creator portrait displayed on event pages, tickets, and organizer profiles.
                </p>
              </div>
              <span className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                isNight
                  ? 'border-emerald-800/60 bg-emerald-950/40 text-emerald-300'
                  : 'border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Verified Badge Active
              </span>
            </div>

            {/* Circular Avatar + Change Photo Action */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pt-2">
              {/* Circular Avatar with glow and badge */}
              <div className="relative group shrink-0">
                <div className={`h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden border-4 shadow-xl ring-2 transition-transform duration-200 group-hover:scale-105 ${
                  isNight
                    ? 'border-[#2E2545] ring-[#7C3AED]/40 bg-[#1D162B]'
                    : 'border-white ring-[#7C3AED]/30 bg-[#F7F5FB]'
                }`}>
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Cynthia Okechukwu"
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center font-black text-2xl text-white bg-gradient-to-br from-[#7C3AED] to-indigo-600">
                      CO
                    </div>
                  )}
                </div>

                {/* Verified Shield Icon */}
                <div
                  className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shadow-lg ring-2 ring-white border border-[#2E2545]"
                  title="Verified Creator"
                >
                  <ShieldCheck className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Details & Button: "Change Photo" */}
              <div className="space-y-4 text-center sm:text-left flex-1">
                <div>
                  <h3 className={`text-lg font-black ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                    {displayName || 'Cynthia Okechukwu'}
                  </h3>
                  <p className={`text-xs font-mono mt-0.5 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
                    @{displayName.toLowerCase().replace(/\s+/g, '')} • Organizer ID: EVT-9042
                  </p>
                  <p className={`text-xs mt-1.5 leading-relaxed max-w-md ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                    Recommended: Square JPG, PNG or WEBP. Minimum 400×400px. Maximum 5MB.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  {/* Button: "Change Photo" */}
                  <button
                    type="button"
                    onClick={() => setIsPhotoModalOpen(true)}
                    id="btn-change-photo"
                    className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all duration-150 shadow-sm ${
                      isNight
                        ? 'border border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545] hover:border-[#7C3AED]'
                        : 'border border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:bg-white hover:border-[#7C3AED] hover:text-[#7C3AED]'
                    }`}
                  >
                    <Camera className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                    <span>Change Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAvatarUrl('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
                      showToast('Photo reset to default portrait.');
                    }}
                    id="btn-reset-photo"
                    className={`inline-flex items-center gap-1.5 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all duration-150 ${
                      isNight
                        ? 'text-[#B8A9D4] hover:text-[#F5F0FF] hover:bg-[#1D162B]'
                        : 'text-[#6B6280] hover:text-[#1A1228] hover:bg-[#F7F5FB]'
                    }`}
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: ACCOUNT DETAILS */}
        <section
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-colors duration-200 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022]'
              : 'border-[#E8E2F3] bg-white'
          }`}
          id="section-account-details"
        >
          <form onSubmit={handleSaveAccountDetails} className="space-y-6">
            <div className="border-b pb-4 flex items-center justify-between border-inherit">
              <div>
                <h2
                  className={`text-xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  Account Details
                </h2>
                <p className={`text-xs mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Update your official display name and contact email for event payouts and notifications.
                </p>
              </div>
              <span className={`text-xs font-mono font-bold ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`}>
                Stage 1 / 2
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Display Name: "Cynthia Okechukwu" */}
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="input-display-name"
                  className={`block text-xs font-bold uppercase tracking-wider ${
                    isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                  }`}
                >
                  Display Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <UserCheck className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                  </div>
                  <input
                    type="text"
                    id="input-display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter full display name"
                    required
                    className={`block w-full rounded-2xl border py-3 pl-10 pr-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                      isNight
                        ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#7C3AED]'
                        : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/50 focus:border-[#7C3AED] focus:bg-white'
                    }`}
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-1.5 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="input-email-address"
                    className={`block text-xs font-bold uppercase tracking-wider ${
                      isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                    }`}
                  >
                    Email Address
                  </label>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified Primary Email
                  </span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <Mail className={`h-4 w-4 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                  </div>
                  <input
                    type="email"
                    id="input-email-address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cynthia@goafterdark.live"
                    required
                    className={`block w-full rounded-2xl border py-3 pl-10 pr-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                      isNight
                        ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#7C3AED]'
                        : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/50 focus:border-[#7C3AED] focus:bg-white'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Button: "Save Changes" (Purple) */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-inherit">
              <button
                type="submit"
                id="btn-save-account-changes"
                disabled={isSavingAccount}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 text-sm font-black text-white shadow-md shadow-[#7C3AED]/25 transition-all duration-150 hover:shadow-lg hover:shadow-[#7C3AED]/40 active:scale-[0.98] disabled:opacity-60"
              >
                {isSavingAccount ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* SECTION 3: CHANGE PASSWORD */}
        <section
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-colors duration-200 ${
            isNight
              ? 'border-[#2E2545] bg-[#161022]'
              : 'border-[#E8E2F3] bg-white'
          }`}
          id="section-change-password"
        >
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="border-b pb-4 flex items-center justify-between border-inherit">
              <div>
                <h2
                  className={`text-xl font-black tracking-tight ${
                    isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'
                  }`}
                >
                  Change Password
                </h2>
                <p className={`text-xs mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Ensure your organizer account is protected by choosing a strong, unique password.
                </p>
              </div>
              <KeyRound className={`h-5 w-5 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
            </div>

            <div className="space-y-4">
              {/* Current Password with eye icon */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input-current-password"
                  className={`block text-xs font-bold uppercase tracking-wider ${
                    isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                  }`}
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    id="input-current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className={`block w-full rounded-2xl border py-3 pl-4 pr-11 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                      isNight
                        ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#7C3AED]'
                        : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/50 focus:border-[#7C3AED] focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    id="toggle-current-password"
                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3.5 transition ${
                      isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'
                    }`}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* New Password with eye icon */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input-new-password"
                  className={`block text-xs font-bold uppercase tracking-wider ${
                    isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                  }`}
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    id="input-new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a new strong password"
                    className={`block w-full rounded-2xl border py-3 pl-4 pr-11 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                      isNight
                        ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#7C3AED]'
                        : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/50 focus:border-[#7C3AED] focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    id="toggle-new-password"
                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3.5 transition ${
                      isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'
                    }`}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password strength meter */}
                {newPassword && (
                  <div className="pt-1.5 space-y-1 animate-in fade-in">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className={isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}>Security Level</span>
                      <span
                        className={
                          passwordStrength >= 75
                            ? 'text-emerald-400'
                            : passwordStrength >= 50
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }
                      >
                        {passwordStrength >= 75 ? 'Strong' : passwordStrength >= 50 ? 'Moderate' : 'Weak'}
                      </span>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isNight ? 'bg-[#2E2545]' : 'bg-[#E8E2F3]'}`}>
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength >= 75
                            ? 'bg-emerald-500 w-full'
                            : passwordStrength >= 50
                            ? 'bg-amber-500 w-2/3'
                            : 'bg-rose-500 w-1/3'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password with eye icon */}
              <div className="space-y-1.5">
                <label
                  htmlFor="input-confirm-password"
                  className={`block text-xs font-bold uppercase tracking-wider ${
                    isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="input-confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your new password"
                    className={`block w-full rounded-2xl border py-3 pl-4 pr-11 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 ${
                      isNight
                        ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] placeholder:text-[#B8A9D4]/40 focus:border-[#7C3AED]'
                        : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] placeholder:text-[#6B6280]/50 focus:border-[#7C3AED] focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    id="toggle-confirm-password"
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3.5 transition ${
                      isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'
                    }`}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && newPassword && (
                  <p
                    className={`text-[11px] font-semibold flex items-center gap-1 mt-1 ${
                      newPassword === confirmPassword ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {newPassword === confirmPassword ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Passwords match
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5" /> Passwords do not match yet
                      </>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Button: "Update Password" */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-inherit">
              <button
                type="submit"
                id="btn-update-password"
                disabled={isUpdatingPassword || !newPassword || !currentPassword}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] px-6 py-3 text-sm font-black text-white shadow-md shadow-[#7C3AED]/25 transition-all duration-150 hover:shadow-lg hover:shadow-[#7C3AED]/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdatingPassword ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* SECTION 4: DANGER ZONE */}
        <section
          className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-colors duration-200 ${
            isNight
              ? 'border-rose-900/40 bg-[#161022]'
              : 'border-rose-200 bg-white'
          }`}
          id="section-danger-zone"
        >
          <div className="space-y-6">
            <div className={`border-b pb-4 flex items-center justify-between ${
              isNight ? 'border-rose-900/30' : 'border-rose-100'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight text-rose-500">
                    Danger Zone
                  </h2>
                  <p className={`text-xs mt-0.5 ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                    Irreversible actions that affect your creator account and events.
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-rose-500/10 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-rose-500 border border-rose-500/20">
                Permanent
              </span>
            </div>

            {/* Warning line and Delete Account action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <span className={`text-sm font-bold block ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>
                  Delete Account
                </span>
                <p className={`text-xs leading-relaxed ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Deleting your creator account is permanent and cannot be undone. All hosted events, sales analytics, attendee databases, and issued tickets will be permanently removed.
                </p>
              </div>

              {/* Button: "Delete Account" (clear red / outlined red) */}
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                id="btn-delete-account"
                className="shrink-0 inline-flex items-center gap-2 rounded-2xl border border-rose-500/60 bg-rose-500/10 hover:bg-rose-600 hover:text-white px-5 py-2.5 text-xs sm:text-sm font-black text-rose-500 shadow-sm transition-all duration-150 active:scale-95"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-12 w-full border-t py-8 text-xs font-semibold transition-colors duration-200 ${
          isNight
            ? 'border-[#2E2545] bg-[#0B0714] text-[#B8A9D4]'
            : 'border-[#E8E2F3] bg-white text-[#6B6280]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF1E83] text-white">
              <Flame className="h-3.5 w-3.5 fill-white" />
            </div>
            <span className={`font-bold ${isNight ? 'text-[#FAF5FF]' : 'text-[#140E1E]'}`}>GoAfterDark</span>
            <span>— Creator Profile & Security Portal</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>256-Bit Encrypted</span>
            <span>Active Creator: Cynthia Okechukwu</span>
            <span className={`font-bold ${isNight ? 'text-[#F5F0FF]' : 'text-[#1A1228]'}`}>Lagos, Nigeria</span>
          </div>
        </div>
      </footer>

      {/* CHANGE PHOTO MODAL */}
      {isPhotoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsPhotoModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight
                ? 'border-[#2E2545] bg-[#161022] text-[#F5F0FF]'
                : 'border-[#E8E2F3] bg-white text-[#1A1228]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 border-inherit">
              <div className="flex items-center gap-2">
                <Camera className={`h-5 w-5 ${isNight ? 'text-[#A78BFA]' : 'text-[#7C3AED]'}`} />
                <h3 className="text-lg font-black">Change Profile Photo</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className={`transition ${isNight ? 'text-[#B8A9D4] hover:text-[#F5F0FF]' : 'text-[#6B6280] hover:text-[#1A1228]'}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Current preview */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-[#7C3AED] shadow-md ring-2 ring-[#7C3AED]/40">
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className={`text-xs font-bold ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Current Creator Avatar
              </span>
            </div>

            {/* Upload trigger */}
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] py-3 px-4 text-sm font-bold text-white shadow-md shadow-[#7C3AED]/30 transition"
              >
                <Upload className="h-4 w-4" />
                <span>Upload From Computer</span>
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-2 pt-2">
              <span className={`text-xs font-bold block ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                Or select a preset avatar:
              </span>
              <div className="grid grid-cols-4 gap-3">
                {presetAvatars.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAvatarUrl(url);
                      setIsPhotoModalOpen(false);
                      showToast('Preset avatar applied successfully!');
                    }}
                    className={`h-14 w-14 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                      avatarUrl === url ? 'border-[#7C3AED] ring-2 ring-[#7C3AED]' : 'border-transparent'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                className={`rounded-2xl border px-4 py-2 text-xs font-bold transition ${
                  isNight
                    ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:bg-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsDeleteModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 ${
              isNight
                ? 'border-rose-900/50 bg-[#161022] text-[#F5F0FF]'
                : 'border-rose-200 bg-white text-[#1A1228]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-rose-500 border-b pb-3 border-inherit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <h3 className="text-lg font-black text-rose-500">Confirm Account Deletion</h3>
                <p className={`text-xs ${isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'}`}>
                  Action cannot be undone
                </p>
              </div>
            </div>

            <div className={`rounded-xl p-3.5 border text-xs leading-relaxed space-y-1.5 ${
              isNight
                ? 'border-rose-900/40 bg-rose-950/20 text-rose-200'
                : 'border-rose-200 bg-rose-50 text-rose-900'
            }`}>
              <p className="font-bold">You are about to delete Cynthia Okechukwu's organizer account.</p>
              <p>All your 5 published events, 396 attendee bookings, ticket sales history, and Paystack integration keys will be deleted immediately.</p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="delete-confirm-input"
                className={`block text-xs font-bold uppercase tracking-wider ${
                  isNight ? 'text-[#B8A9D4]' : 'text-[#6B6280]'
                }`}
              >
                Type <strong className="text-rose-500">DELETE</strong> to confirm:
              </label>
              <input
                type="text"
                id="delete-confirm-input"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className={`block w-full rounded-2xl border py-2.5 px-3.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  isNight
                    ? 'border-rose-900/60 bg-[#1D162B] text-rose-300 placeholder:text-rose-900/60'
                    : 'border-rose-300 bg-rose-50/50 text-rose-900 placeholder:text-rose-300'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteConfirmText('');
                }}
                className={`rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                  isNight
                    ? 'border-[#2E2545] bg-[#1D162B] text-[#F5F0FF] hover:bg-[#2E2545]'
                    : 'border-[#E8E2F3] bg-[#F7F5FB] text-[#1A1228] hover:bg-white'
                }`}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText.trim().toUpperCase() !== 'DELETE' || isDeletingAccount}
                id="btn-confirm-permanent-delete"
                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-2.5 text-xs font-black text-white shadow-md shadow-rose-600/30 transition active:scale-95"
              >
                {isDeletingAccount ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete My Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <aside
          aria-label="Notification"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border px-5 py-3.5 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 max-w-md ${
            toastMessage.type === 'error'
              ? 'border-rose-500/40 bg-rose-950/90 text-rose-200'
              : toastMessage.type === 'info'
              ? 'border-blue-500/40 bg-blue-950/90 text-blue-200'
              : isNight
              ? 'border-[#2E2545] bg-[#161022] text-[#F5F0FF] shadow-purple-950/50'
              : 'border-[#E8E2F3] bg-white text-[#1A1228]'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0" />
          ) : toastMessage.type === 'info' ? (
            <Info className="h-5 w-5 text-blue-400 shrink-0" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          )}
          <p className="text-xs font-bold">{toastMessage.text}</p>
        </aside>
      )}
    </div>
  );
}
