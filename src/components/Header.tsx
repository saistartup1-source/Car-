import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Car, 
  Heart, 
  Bell, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  ChevronDown, 
  Search,
  Check
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    favorites,
    unreadNotificationsCount,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    currentUser,
    setCurrentUserRole,
    setIsAuthModalOpen,
    setAuthModalMode,
    setFilters
  } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickKeyword, setQuickKeyword] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const roleMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickKeyword.trim()) {
      setFilters((prev) => ({ ...prev, searchQuery: quickKeyword.trim() }));
      setCurrentView('marketplace');
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Buy Cars', view: 'marketplace', action: () => setCurrentView('marketplace') },
    { 
      label: 'Verified Cars', 
      view: 'marketplace', 
      action: () => {
        setFilters((prev) => ({ ...prev, verifiedOnly: true }));
        setCurrentView('marketplace');
      } 
    },
    { label: 'Pricing Plans', view: 'pricing', action: () => setCurrentView('pricing') },
    { label: 'How It Works', view: 'how_it_works', action: () => setCurrentView('how_it_works') }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#07111F] border-b border-white/10 shadow-lg">
      {/* Top micro-bar with trust guarantee and quick role demo */}
      <div className="bg-[#040A12] border-b border-white/5 px-3 sm:px-8 py-1.5 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1.5 text-[#C9A227] font-semibold text-[11px] whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E4C766] shrink-0" />
              100% Verified Pre-Owned Marketplace
            </span>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="hidden md:inline text-gray-400 text-[11px]">Zero Commission on Buyer Enquiries</span>
          </div>

          {/* Interactive Role Switcher Pill */}
          <div className="relative shrink-0" ref={roleMenuRef}>
            <button
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full border border-white/10 transition-colors text-[11px] whitespace-nowrap"
              title="Switch demo persona to test seller, dealer, buyer or admin views"
            >
              <span className="text-[#C9A227] font-semibold">Demo Role:</span>
              <span className="capitalize text-white font-medium">{currentUser.role}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isRoleMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-[#0F172A] border border-[#C9A227]/30 rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-gray-400">
                  Switch Active Persona
                </div>
                <button
                  onClick={() => {
                    setCurrentUserRole('seller');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/5 ${
                    currentUser.role === 'seller' ? 'text-[#C9A227] font-semibold' : 'text-gray-200'
                  }`}
                >
                  <span>Individual Seller (Yashraj)</span>
                  {currentUser.role === 'seller' && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentUserRole('dealer');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/5 ${
                    currentUser.role === 'dealer' ? 'text-[#C9A227] font-semibold' : 'text-gray-200'
                  }`}
                >
                  <span>Pro Dealer (Royal Heritage)</span>
                  {currentUser.role === 'dealer' && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentUserRole('buyer');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/5 ${
                    currentUser.role === 'buyer' ? 'text-[#C9A227] font-semibold' : 'text-gray-200'
                  }`}
                >
                  <span>Verified Buyer (Priya)</span>
                  {currentUser.role === 'buyer' && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentUserRole('admin');
                    setIsRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/5 ${
                    currentUser.role === 'admin' ? 'text-[#C9A227] font-semibold' : 'text-gray-200'
                  }`}
                >
                  <span>Platform Admin (Vikram)</span>
                  {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-[#C9A227]" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5 sm:gap-2">
            <span className="bg-gradient-to-br from-[#E4C766] to-[#C9A227] bg-clip-text text-transparent">CarForSell</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest bg-[#C9A227]/20 text-[#E4C766] border border-[#C9A227]/40 font-bold px-1.5 py-0.5 rounded shrink-0">
            PRO
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
          <button
            onClick={() => setCurrentView('marketplace')}
            className={`transition-colors ${currentView === 'marketplace' ? 'text-[#E4C766] font-semibold border-b border-[#E4C766] pb-0.5' : 'hover:text-[#E4C766]'}`}
          >
            Buy Cars
          </button>

          <button
            onClick={() => setCurrentView('sell')}
            className={`transition-colors ${currentView === 'sell' ? 'text-[#E4C766] font-semibold border-b border-[#E4C766] pb-0.5' : 'hover:text-[#E4C766]'}`}
          >
            Sell Your Car
          </button>

          <button
            onClick={() => setCurrentView('pricing')}
            className={`transition-colors ${currentView === 'pricing' ? 'text-[#E4C766] font-semibold border-b border-[#E4C766] pb-0.5' : 'hover:text-[#E4C766]'}`}
          >
            Pricing
          </button>

          <button
            onClick={() => {
              setFilters((prev) => ({ ...prev, verifiedOnly: true }));
              setCurrentView('marketplace');
            }}
            className="hover:text-[#E4C766] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span className="w-1.5 h-1.5 bg-[#16845B] rounded-full animate-pulse"></span>
            <span>Verified Cars</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Quick Search Button (Desktop) */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs border border-white/10 transition-colors shrink-0"
            title="Search make or model"
          >
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span>Search cars...</span>
            <kbd className="bg-white/10 text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono">⌘K</kbd>
          </button>

          {/* Saved / Favorites */}
          <button
            onClick={() => setCurrentView('buyer_dashboard')}
            className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors shrink-0"
            title="My Saved Cars"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C9A227] text-[#07111F] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative shrink-0" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#E4C766] rounded-full ring-2 ring-[#07111F] animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0F172A] border border-[#C9A227]/30 rounded-2xl shadow-2xl py-3 z-50">
                <div className="px-4 pb-2.5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white">Notifications</h4>
                    {unreadNotificationsCount > 0 && (
                      <span className="bg-[#C9A227]/20 text-[#E4C766] text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-gray-400 hover:text-[#E4C766] transition-colors"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-gray-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markNotificationAsRead(notif.id)}
                        className={`p-3.5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 ${
                          !notif.read ? 'bg-white/[0.03]' : ''
                        }`}
                      >
                        <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#C9A227]" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">{notif.title}</span>
                            <span className="text-[10px] text-gray-400">{notif.time}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-0.5 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-2 px-4 border-t border-white/10 text-center">
                  <button
                    onClick={() => {
                      setIsNotifOpen(false);
                      setCurrentView(currentUser.role === 'buyer' ? 'buyer_dashboard' : 'seller_dashboard');
                    }}
                    className="text-xs text-[#E4C766] font-medium hover:underline"
                  >
                    View All Activity in Dashboard →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative shrink-0" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C9A227]"
              />
              <span className="hidden md:inline text-xs font-semibold text-white max-w-[90px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3 h-3 text-gray-400 hidden md:inline" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0F172A] border border-[#C9A227]/30 rounded-2xl shadow-2xl py-2 z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C9A227]/20 text-[#E4C766] border border-[#C9A227]/40 uppercase tracking-wider">
                      {currentUser.membershipPlan === 'annual_pro' ? 'Annual Pro Seller' : 'Verified Member'}
                    </span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setCurrentView('seller_dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <Car className="w-4 h-4 text-[#C9A227]" />
                    <span>Seller Dashboard & Listings</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setCurrentView('buyer_dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Buyer Watchlist & Enquiries</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setCurrentView('admin_dashboard');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Admin Moderation Suite</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsAuthModalOpen(true);
                      setAuthModalMode('login');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 flex items-center gap-2.5"
                  >
                    <LogOut className="w-4 h-4 text-gray-400" />
                    <span>Switch / Login with another account</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block h-5 w-px bg-white/10 mx-0.5 shrink-0" />

          {/* Primary CTA: Sell My Car */}
          <button
            onClick={() => setCurrentView('sell')}
            className="whitespace-nowrap shrink-0 bg-gradient-to-r from-[#C9A227] to-[#E4C766] text-[#07111F] text-xs sm:text-sm font-bold px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-xl shadow-md hover:brightness-105 active:scale-98 transition-all inline-flex items-center justify-center gap-1.5"
            title="Sell Your Car"
          >
            <Car className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#07111F] shrink-0" />
            <span className="whitespace-nowrap">Sell My Car</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Quick Search Bar Drawer (Desktop/Mobile toggle) */}
      {isSearchOpen && (
        <div className="bg-[#0A1320] border-b border-white/10 px-4 py-3 animate-fadeIn">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleQuickSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="text"
                value={quickKeyword}
                onChange={(e) => setQuickKeyword(e.target.value)}
                placeholder="Search BMW 3 Series, Fortuner, Scorpio-N, Mercedes, Audi..."
                className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white text-sm rounded-xl pl-10 pr-24 py-2.5 outline-none placeholder:text-gray-500"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 px-3 py-1.5 bg-[#C9A227] text-[#07111F] text-xs font-bold rounded-lg hover:bg-[#E4C766] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0A1320] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <form onSubmit={handleQuickSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={quickKeyword}
              onChange={(e) => setQuickKeyword(e.target.value)}
              placeholder="Search make or model..."
              className="w-full bg-[#111C2D] border border-white/10 text-white text-sm rounded-xl pl-9 pr-4 py-2.5 outline-none placeholder:text-gray-500"
            />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentView('marketplace');
                setIsMenuOpen(false);
              }}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-left text-sm font-semibold text-white border border-white/5"
            >
              Explore Cars
            </button>
            <button
              onClick={() => {
                setCurrentView('sell');
                setIsMenuOpen(false);
              }}
              className="p-3 bg-[#C9A227]/20 border border-[#C9A227]/40 rounded-xl text-left text-sm font-bold text-[#E4C766]"
            >
              + Sell My Car
            </button>
          </div>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  link.action();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentView('seller_dashboard');
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-[#C9A227] hover:bg-white/5 font-semibold"
            >
              Seller Dashboard & Analytics
            </button>

            <button
              onClick={() => {
                setCurrentView('admin_dashboard');
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-emerald-400 hover:bg-white/5 font-semibold"
            >
              Admin Moderation Center
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
