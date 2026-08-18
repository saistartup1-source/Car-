import React from 'react';
import { useApp } from '../context/AppContext';
import { Car, ShieldCheck, Award, PhoneCall, Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setFilters } = useApp();

  const handleCityClick = (city: string) => {
    setFilters((prev) => ({ ...prev, location: city }));
    setCurrentView('marketplace');
  };

  const handleBrandClick = (brand: string) => {
    setFilters((prev) => ({ ...prev, make: brand }));
    setCurrentView('marketplace');
  };

  return (
    <footer className="bg-[#07111F] text-gray-400 border-t border-white/10 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Callout Banner */}
        <div className="bg-gradient-to-r from-[#0E1E38] via-[#112445] to-[#0A1628] rounded-2xl p-6 sm:p-8 border border-[#C9A227]/30 shadow-xl mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#E4C766] font-bold bg-[#C9A227]/20 px-3 py-1 rounded-full border border-[#C9A227]/40">
              <Award className="w-3.5 h-3.5" />
              Maximum Resale Value Guarantee
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to sell your car directly to serious buyers?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl">
              List in under 3 minutes. Zero middleman margins. Single listing for ₹1,200 or unlimited for ₹7,000/yr.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('sell')}
            className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all"
          >
            <span>Start Listing Free Preview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-sm">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1E293B] to-[#07111F] border border-[#C9A227]/40 flex items-center justify-center">
                <Car className="w-5 h-5 text-[#E4C766]" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                CarFor<span className="text-[#E4C766]">Sell</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              CarForSell is India’s premier luxury and verified vehicle marketplace. We eliminate predatory broker commissions and connect verified vehicle owners with genuine high-intent buyers.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#C9A227]" />
                <span>Headquarters: Bandra Kurla Complex, Mumbai & College Rd, Nashik</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <PhoneCall className="w-4 h-4 text-[#C9A227]" />
                <span>Priority Concierge: +91 1800 209 4488 (Mon-Sat, 9AM-8PM)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-[#C9A227]" />
                <span>support@carforsell.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Explore Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentView('marketplace')} className="hover:text-white transition-colors">
                  Explore Pre-Owned Cars
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('sell')} className="hover:text-white transition-colors">
                  Sell Your Car
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('pricing')} className="hover:text-white transition-colors">
                  Seller Pricing & Plans
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('how_it_works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, verifiedOnly: true }));
                    setCurrentView('marketplace');
                  }} 
                  className="hover:text-[#E4C766] transition-colors"
                >
                  150-Point Verified Cars
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seller_dashboard')} className="hover:text-white transition-colors">
                  Seller Portal & CRM
                </button>
              </li>
            </ul>
          </div>

          {/* Top Brands */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Popular Brands</h4>
            <ul className="space-y-2 text-xs">
              {['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Toyota', 'Mahindra', 'Tata'].map((brand) => (
                <li key={brand}>
                  <button onClick={() => handleBrandClick(brand)} className="hover:text-white transition-colors">
                    Used {brand} in India
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Cities */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Top Locations</h4>
            <ul className="space-y-2 text-xs">
              {['Nashik', 'Mumbai', 'Pune', 'Bengaluru', 'Delhi NCR', 'Hyderabad'].map((city) => (
                <li key={city}>
                  <button onClick={() => handleCityClick(city)} className="hover:text-white transition-colors">
                    Cars for sale in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-medium text-gray-400">
          <div>
            © 2026 CarForSell. All rights reserved. <span className="text-gray-500 ml-4">Privacy • Terms • Cookies</span>
          </div>
          <div className="flex gap-6 uppercase tracking-widest text-[#E4C766] text-[11px] font-bold">
            <span>Mumbai</span>
            <span>Nashik</span>
            <span>Pune</span>
            <span>Bangalore</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
