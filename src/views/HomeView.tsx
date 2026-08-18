import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleBrands, sampleCities } from '../data/mockData';
import { VehicleCard } from '../components/VehicleCard';
import { calculateMarketEstimate, formatPrice } from '../utils/formatters';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Car, 
  Award, 
  TrendingUp, 
  Users, 
  Lock, 
  Gauge, 
  Zap, 
  Crown,
  ChevronRight,
  Calculator
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentView, vehicles, setFilters } = useApp();

  // Floating Hero search state
  const [heroMake, setHeroMake] = useState('All');
  const [heroCity, setHeroCity] = useState('All');
  const [heroBudget, setHeroBudget] = useState('All');

  // Interactive valuation preview state
  const [valBrand, setValBrand] = useState('BMW');
  const [valYear, setValYear] = useState(2022);
  const [valKm, setValKm] = useState(30000);
  const [valEstimate, setValEstimate] = useState<{ min: number; max: number; fair: number }>(() => 
    calculateMarketEstimate(5000000, 2022, 30000, 'BMW')
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      make: heroMake,
      location: heroCity,
      maxPrice: heroBudget === 'under25' ? 2500000 : heroBudget === 'under50' ? 5000000 : heroBudget === 'under1cr' ? 10000000 : 15000000
    }));
    setCurrentView('marketplace');
  };

  const calculateInstantValuation = () => {
    const originalRef = valBrand === 'Porsche' ? 11000000 : ['BMW', 'Mercedes-Benz'].includes(valBrand) ? 6000000 : valBrand === 'Audi' ? 5000000 : 3000000;
    const est = calculateMarketEstimate(originalRef, valYear, valKm, valBrand);
    setValEstimate(est);
  };

  const featuredCars = vehicles.filter((v) => v.status === 'Active').slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#07111F] text-white overflow-hidden border-b border-white/10">
        
        {/* Background Subtle Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/90 to-[#07111F]/70 z-10" />
          <img
            src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1600"
            alt="Luxury Automotive"
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          {/* Subtle gold atmospheric radial light */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A227] rounded-full blur-[140px] opacity-20 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <span className="inline-block text-[#C9A227] text-xs font-bold uppercase tracking-[0.2em]">
                Premium Marketplace
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Sell Your Car.<br />
                At the <span className="text-[#E4C766]">Right Price.</span>
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed">
                List your vehicle, connect with serious buyers and sell with confidence on India's most trusted luxury automotive platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentView('sell')}
                  className="w-full sm:w-auto bg-[#C9A227] text-white px-8 py-3.5 rounded-lg font-bold text-base hover:brightness-110 shadow-xl transition-all"
                >
                  Start Selling
                </button>

                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-lg font-bold text-base backdrop-blur-sm hover:bg-white/15 transition-all"
                >
                  Explore Cars
                </button>
              </div>

              {/* Micro stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">₹142 Cr+</div>
                  <div className="text-[11px] text-gray-400">Inventory Listed</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#E4C766]">150-Point</div>
                  <div className="text-[11px] text-gray-400">Verified Checks</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">4.9/5 ★</div>
                  <div className="text-[11px] text-gray-400">Seller Rating</div>
                </div>
              </div>

            </div>

            {/* Right Hero Floating Search Card */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-2xl border border-gray-100 text-[#101828] space-y-4">
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-[#07111F] flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#C9A227]" />
                    <span>Find your next car</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Live Hub</span>
                </div>

                <form onSubmit={handleHeroSearch} className="space-y-3 text-xs">
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Make */}
                    <div>
                      <label className="block text-gray-500 font-semibold mb-1 text-[11px]">Make / Brand</label>
                      <select
                        value={heroMake}
                        onChange={(e) => setHeroMake(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700 outline-none focus:border-[#C9A227] cursor-pointer"
                      >
                        <option value="All">All Brands</option>
                        {sampleBrands.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-gray-500 font-semibold mb-1 text-[11px]">Budget</label>
                      <select
                        value={heroBudget}
                        onChange={(e) => setHeroBudget(e.target.value)}
                        className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700 outline-none focus:border-[#C9A227] cursor-pointer"
                      >
                        <option value="All">Any Budget</option>
                        <option value="under25">Under ₹25L</option>
                        <option value="under50">₹35L - ₹50L</option>
                        <option value="under1cr">₹50L - ₹1Cr</option>
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-gray-500 font-semibold mb-1 text-[11px]">City / Location</label>
                    <select
                      value={heroCity}
                      onChange={(e) => setHeroCity(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-xs font-semibold text-gray-700 outline-none focus:border-[#C9A227] cursor-pointer"
                    >
                      <option value="All">All Indian Cities (Nashik, Mumbai, Pune...)</option>
                      {sampleCities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#07111F] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#111827] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Search className="w-4 h-4 text-[#E4C766]" />
                    <span>Search Inventory</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span>BMW 3 Series</span>
                    <span>Porsche 911</span>
                    <span>Fortuner 4x4</span>
                  </div>

                </form>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 2. HIGH-DENSITY TRUST STRIP */}
      <section className="h-16 bg-white border-b border-gray-100 flex items-center justify-around px-4 sm:px-12 -mt-16 sm:-mt-24 relative z-20 shadow-sm rounded-xl max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold text-[#667085] uppercase tracking-widest">
          <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#C9A227] font-serif">
            ✓
          </div>
          <span className="hidden sm:inline">Verified Listings</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#667085] uppercase tracking-widest">
          <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#C9A227]">
            ★
          </div>
          <span className="hidden sm:inline">Trusted Sellers</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#667085] uppercase tracking-widest">
          <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#C9A227]">
            🛡
          </div>
          <span className="hidden sm:inline">Secure Enquiries</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#667085] uppercase tracking-widest">
          <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#C9A227]">
            ₹
          </div>
          <span className="hidden sm:inline">Transparent Pricing</span>
        </div>
      </section>

      {/* 3. FEATURED VERIFIED CARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-[#07111F]">
            Featured <span className="text-[#C9A227]">Premium</span> Vehicles
          </h2>
          <button
            onClick={() => setCurrentView('marketplace')}
            className="text-[#07111F] font-bold text-sm flex items-center gap-1 underline underline-offset-4 decoration-[#C9A227] decoration-2 hover:text-[#C9A227] transition-colors"
          >
            <span>View All Inventory ({vehicles.length})</span>
          </button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
          ))}
        </div>
      </section>

      {/* 4. SMART VALUATION CALCULATOR TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07111F] rounded-3xl p-6 sm:p-10 text-white border border-[#C9A227]/30 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#E4C766] bg-white/5 border border-[#C9A227]/40 px-3 py-1 rounded-full">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Market Price Guidance</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Wondering what your vehicle is worth today?
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                CarForSell’s depreciation algorithm analyzes current market transactions, brand retention curves, and odometer readings across Indian metros to give you a fair selling window.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400">Estimated Fair Market Range:</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#E4C766]">
                    {formatPrice(valEstimate.min)} — {formatPrice(valEstimate.max)}
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('sell')}
                  className="bg-[#C9A227] hover:bg-[#E4C766] text-[#07111F] font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
                >
                  List at This Price
                </button>
              </div>
            </div>

            {/* Interactive Calculator Inputs */}
            <div className="lg:col-span-6 bg-[#0E1E35] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
              
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Make</label>
                  <select
                    value={valBrand}
                    onChange={(e) => setValBrand(e.target.value)}
                    className="w-full bg-[#111C2D] border border-white/15 text-white rounded-xl p-2.5 outline-none"
                  >
                    {sampleBrands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Registration Year</label>
                  <select
                    value={valYear}
                    onChange={(e) => setValYear(Number(e.target.value))}
                    className="w-full bg-[#111C2D] border border-white/15 text-white rounded-xl p-2.5 outline-none"
                  >
                    {[2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Kilometers Driven</span>
                  <span className="font-bold text-[#E4C766]">{valKm.toLocaleString('en-IN')} km</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={120000}
                  step={5000}
                  value={valKm}
                  onChange={(e) => setValKm(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />
              </div>

              <button
                type="button"
                onClick={calculateInstantValuation}
                className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-2.5 rounded-xl border border-white/20 text-xs transition-colors"
              >
                Recalculate Estimate
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* 5. PRICING PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold text-[#C9A227] tracking-wider mb-1">
            Transparent Seller Pricing
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07111F]">
            Choose Your Selling Plan
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            No hidden brokerage fees. Keep 100% of your vehicle sale price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Single Listing */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-lg flex flex-col justify-between hover:border-gray-300 transition-all">
            <div className="space-y-4">
              <div className="inline-block text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                Individual Seller
              </div>
              <h3 className="text-xl font-bold text-[#07111F]">Single Listing</h3>
              <div className="text-3xl font-black text-[#07111F]">
                ₹1,200 <span className="text-xs font-normal text-gray-500">/ listing</span>
              </div>
              <p className="text-xs text-gray-500">
                Perfect for individual car owners looking to sell a single vehicle at maximum value.
              </p>

              <ul className="space-y-3 pt-4 border-t border-gray-100 text-xs text-gray-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                  <span>1 Verified Vehicle Listing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                  <span>Active for 90 Days or until Sold</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                  <span>Direct Buyer Enquiries & Callback Requests</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                  <span>Seller Dashboard & Inquiry Chat</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                  <span>Zero brokerage or commission</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentView('sell')}
              className="mt-8 w-full bg-[#07111F] hover:bg-[#111827] text-white font-bold py-3.5 rounded-xl text-sm transition-all"
            >
              List One Vehicle (₹1,200)
            </button>
          </div>

          {/* Annual Pro Plan */}
          <div className="bg-[#07111F] text-white rounded-3xl p-8 border-2 border-[#C9A227] shadow-2xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
              BEST VALUE • FOR DEALERS & PROS
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E4C766] bg-white/5 border border-[#C9A227]/40 px-3 py-1 rounded-full">
                <Crown className="w-3.5 h-3.5 text-[#E4C766]" />
                <span>Unlimited Inventory Access</span>
              </div>
              <h3 className="text-xl font-bold text-white">Annual Pro Seller</h3>
              <div className="text-3xl font-black text-white">
                ₹7,000 <span className="text-xs font-normal text-gray-400">/ year</span>
              </div>
              <p className="text-xs text-gray-300">
                The ultimate operating suite for independent dealers, collectors, and active sellers.
              </p>

              <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                  <span className="font-bold text-white">Unlimited Vehicle Listings all year</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                  <span>Priority Placement in Search & Category pages</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                  <span>Dedicated Verified Dealer Showroom Profile</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                  <span>Performance Analytics, Lead CRM & Instant Chat</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                  <span>Gold Verification Badge & WhatsApp Lead Alert</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setCurrentView('sell')}
              className="mt-8 w-full bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold py-3.5 rounded-xl text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all"
            >
              Get Annual Pro (₹7,000/yr)
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
