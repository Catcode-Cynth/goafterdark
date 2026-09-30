import React from 'react';
import { CheckCircle2, Heart, Info, X } from 'lucide-react';

export default function Toast({ notification, onClose, isNight = true }) {
  if (!notification) return null;

  const isFavorite = notification.type === 'favorite';
  const isSuccess = notification.type === 'success';

  return (
    <aside
      aria-label="Notification"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 max-w-md ${
        isNight
          ? 'border-[#2A1E38] bg-[#161022] text-[#FAF5FF]'
          : 'border-[#EBE4F0] bg-white text-[#140E1E]'
      }`}
    >
      <div className="flex shrink-0 items-center justify-center">
        {isFavorite ? (
          <Heart className="h-5 w-5 fill-[#FF5364] text-[#FF5364] animate-pulse" />
        ) : isSuccess ? (
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        ) : (
          <Info className="h-5 w-5 text-[#FF1E83]" />
        )}
      </div>

      <p className="text-xs sm:text-sm font-bold">
        {notification.message}
      </p>

      <button
        onClick={onClose}
        className={`ml-2 inline-flex h-6 w-6 items-center justify-center rounded-xl transition ${
          isNight
            ? 'text-[#C8BDD4] hover:text-white hover:bg-white/10'
            : 'text-[#8E7F9A] hover:text-black hover:bg-black/5'
        }`}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </aside>
  );
}
