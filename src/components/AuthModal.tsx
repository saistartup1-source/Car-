import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockUserProfiles } from '../data/mockData';
import { 
  X, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Car
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalMode, 
    setAuthModalMode, 
    setCurrentUserRole,
    showToast 
  } = useApp();

  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [authType, setAuthType] = useState<'mobile' | 'email'>('mobile');
  const [emailInput, setEmailInput] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authType === 'mobile' && mobileNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (authType === 'email' && !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setStep('otp');
    showToast('Verification OTP sent: Use demo code 1 2 3 4', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Authentication verified successfully! Welcome to CarForSell.', 'success');
    setIsAuthModalOpen(false);
    setStep('input');
  };

  const handleQuickPersona = (role: 'seller' | 'dealer' | 'buyer' | 'admin') => {
    setCurrentUserRole(role);
    setIsAuthModalOpen(false);
    setStep('input');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#07111F] border border-[#C9A227]/40 text-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsAuthModalOpen(false);
            setStep('input');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-7 border-b border-white/10 text-center relative bg-gradient-to-b from-[#0F1D32] to-[#07111F]">
          <div className="w-12 h-12 rounded-xl bg-[#111827] border border-[#C9A227]/50 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Car className="w-6 h-6 text-[#E4C766]" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {authModalMode === 'login' ? 'Welcome to CarForSell' : 'Create Seller / Buyer Account'}
          </h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
            Direct access to verified vehicle listings, high-intent enquiries and dealer tools.
          </p>
        </div>

        {/* Fast 1-Click Demo Profiles */}
        <div className="p-4 bg-[#0A1628] border-b border-white/10">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[#E4C766] mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Instant 1-Click Demo Switcher:</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={() => handleQuickPersona('seller')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A227]/50 text-left transition-all"
            >
              <span className="font-bold text-white block">Yashraj</span>
              <span className="text-[10px] text-gray-400">Individual Seller</span>
            </button>
            <button
              onClick={() => handleQuickPersona('dealer')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A227]/50 text-left transition-all"
            >
              <span className="font-bold text-white block">Royal Motors</span>
              <span className="text-[10px] text-[#E4C766]">Annual Pro Dealer</span>
            </button>
            <button
              onClick={() => handleQuickPersona('buyer')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#C9A227]/50 text-left transition-all"
            >
              <span className="font-bold text-white block">Priya Sharma</span>
              <span className="text-[10px] text-gray-400">Verified Buyer</span>
            </button>
            <button
              onClick={() => handleQuickPersona('admin')}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 text-left transition-all"
            >
              <span className="font-bold text-white block">Vikram</span>
              <span className="text-[10px] text-emerald-400">Platform Admin</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-4">
          
          {step === 'input' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthType('mobile')}
                  className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    authType === 'mobile' ? 'bg-[#C9A227] text-[#07111F]' : 'text-gray-400'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mobile OTP</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthType('email')}
                  className={`flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    authType === 'email' ? 'bg-[#C9A227] text-[#07111F]' : 'text-gray-400'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </button>
              </div>

              {authType === 'mobile' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Enter 10-Digit Mobile Number
                  </label>
                  <div className="flex items-center bg-[#111C2D] border border-white/15 focus-within:border-[#C9A227] rounded-xl px-3 py-2.5">
                    <span className="text-xs font-bold text-gray-400 pr-2 border-r border-white/15">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="98230 00000"
                      className="bg-transparent flex-1 text-white text-sm pl-3 outline-none placeholder:text-gray-600 font-medium tracking-wider"
                      autoFocus
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Enter Email Address
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white text-sm rounded-xl px-3.5 py-2.5 outline-none placeholder:text-gray-600"
                    autoFocus
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Google 1-Tap */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleQuickPersona('seller')}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
              <p className="text-xs text-gray-300">
                Enter the 4-digit verification code sent to your {authType}.
              </p>

              <div className="flex justify-center gap-3 my-4">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx]}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...otp];
                      next[idx] = val;
                      setOtp(next);
                      // Auto focus next input
                      if (val && idx < 3) {
                        const nextInput = document.getElementById(`otp-${idx + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    id={`otp-${idx}`}
                    className="w-12 h-12 bg-[#111C2D] border border-white/20 focus:border-[#C9A227] text-white text-lg font-bold text-center rounded-xl outline-none"
                    placeholder="•"
                  />
                ))}
              </div>

              <div className="text-[11px] text-gray-400">
                Did not receive OTP? <span className="text-[#C9A227] font-semibold cursor-pointer">Resend OTP (24s)</span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all text-sm"
              >
                Verify & Enter Dashboard
              </button>

              <button
                type="button"
                onClick={() => setStep('input')}
                className="text-xs text-gray-400 hover:text-white"
              >
                ← Back to Mobile Number
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="pt-2 text-center text-[10px] text-gray-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#C9A227]" />
            <span>256-Bit Encrypted Secure Automotive Marketplace</span>
          </div>

        </div>

      </div>
    </div>
  );
};
