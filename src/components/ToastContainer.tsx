import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border transition-all transform translate-y-0 ${
              isSuccess
                ? 'bg-[#07111F] text-white border-[#C9A227]/40'
                : isError
                ? 'bg-[#1A0B0B] text-white border-[#D64545]/40'
                : 'bg-[#111827] text-white border-white/10'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#C9A227]" />}
              {isError && <AlertCircle className="w-5 h-5 text-[#D64545]" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1 text-sm font-medium pr-1">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
