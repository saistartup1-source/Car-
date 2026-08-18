import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentView, setCurrentView, favorites, currentUser } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'home' ? 'text-[#E4C766]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setCurrentView('marketplace')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'marketplace' ? 'text-[#E4C766]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-medium">Search</span>
        </button>

        {/* Emphasized Sell CTA */}
        <button
          onClick={() => setCurrentView('sell')}
          className="flex flex-col items-center -mt-5 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C9A227] to-[#E4C766] p-0.5 shadow-lg shadow-[#C9A227]/30 group-active:scale-95 transition-transform flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#07111F] flex items-center justify-center">
              <PlusCircle className="w-6 h-6 text-[#E4C766]" />
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#E4C766] mt-1">Sell</span>
        </button>

        {/* Favorites */}
        <button
          onClick={() => setCurrentView('buyer_dashboard')}
          className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'buyer_dashboard' ? 'text-[#E4C766]' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Heart className="w-5 h-5" />
          {favorites.length > 0 && (
            <span className="absolute top-0 right-2 w-4 h-4 bg-[#C9A227] text-[#07111F] text-[9px] font-extrabold rounded-full flex items-center justify-center">
              {favorites.length}
            </span>
          )}
          <span className="text-[10px] font-medium">Saved</span>
        </button>

        {/* Profile / Dashboard */}
        <button
          onClick={() => {
            if (currentUser.role === 'admin') setCurrentView('admin');
            else if (currentUser.role === 'buyer') setCurrentView('buyer_dashboard');
            else setCurrentView('seller_dashboard');
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
            currentView === 'seller_dashboard' || currentView === 'admin'
              ? 'text-[#E4C766]'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>

      </div>
    </div>
  );
};
