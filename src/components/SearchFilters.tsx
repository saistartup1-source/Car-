import React from 'react';
import { useApp } from '../context/AppContext';
import { sampleBrands, sampleCities } from '../data/mockData';
import { formatPrice } from '../utils/formatters';
import { 
  Filter, 
  RotateCcw, 
  ShieldCheck, 
  X, 
  Check,
  ChevronDown
} from 'lucide-react';

interface SearchFiltersProps {
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  isMobileModal = false, 
  onCloseMobile 
}) => {
  const { filters, setFilters, resetFilters } = useApp();

  const categories = ['All', 'Luxury Car', 'SUV', 'Car', 'Electric & Hybrid'];
  const bodyTypes = ['All', 'Sedan', 'SUV', 'Hatchback', 'Coupe'];
  const fuelOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG'];
  const transmissionOptions = ['Automatic', 'Manual'];
  const ownershipOptions = ['1st Owner', '2nd Owner', '3rd Owner'];

  const toggleArrayFilter = (field: 'fuel' | 'transmission' | 'ownership', value: string) => {
    setFilters((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  };

  const content = (
    <div className="space-y-6 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-[#07111F]">
          <Filter className="w-4 h-4 text-[#C9A227]" />
          <span>Filter Inventory</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#C9A227] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Verified Only Toggle */}
      <div className="bg-[#07111F] text-white p-3.5 rounded-xl border border-[#C9A227]/40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#E4C766]" />
          <div>
            <div className="text-xs font-bold">150-Point Verified Only</div>
            <div className="text-[10px] text-gray-400">Technical check passed</div>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C9A227]"></div>
        </label>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          City / Location
        </label>
        <div className="relative">
          <select
            value={filters.location}
            onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
            className="w-full bg-white border border-gray-300 focus:border-[#C9A227] text-[#101828] text-xs font-medium rounded-xl p-2.5 outline-none appearance-none cursor-pointer"
          >
            <option value="All">All Cities across India</option>
            {sampleCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Brand / Make */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Brand / Make
        </label>
        <div className="relative">
          <select
            value={filters.make}
            onChange={(e) => setFilters((prev) => ({ ...prev, make: e.target.value }))}
            className="w-full bg-white border border-gray-300 focus:border-[#C9A227] text-[#101828] text-xs font-medium rounded-xl p-2.5 outline-none appearance-none cursor-pointer"
          >
            <option value="All">All Brands</option>
            {sampleBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Category Chips */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Vehicle Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = filters.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#07111F] text-white border border-[#C9A227]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
          <span className="uppercase tracking-wider">Budget Range</span>
          <span className="text-[#C9A227] font-extrabold">{formatPrice(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min={500000}
          max={15000000}
          step={200000}
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-medium">
          <span>₹5 Lakh</span>
          <span>₹75 Lakh</span>
          <span>₹1.50 Cr+</span>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Fuel Type
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {fuelOptions.map((f) => {
            const active = filters.fuel.includes(f);
            return (
              <button
                key={f}
                type="button"
                onClick={() => toggleArrayFilter('fuel', f)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#07111F] text-[#E4C766] border-[#C9A227]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{f}</span>
                {active && <Check className="w-3 h-3 text-[#E4C766]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transmission */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Transmission
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {transmissionOptions.map((t) => {
            const active = filters.transmission.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleArrayFilter('transmission', t)}
                className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#07111F] text-[#E4C766] border-[#C9A227]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span>{t}</span>
                {active && <Check className="w-3 h-3 text-[#E4C766]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ownership */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Ownership
        </label>
        <div className="grid grid-cols-3 gap-1">
          {ownershipOptions.map((o) => {
            const active = filters.ownership.includes(o);
            return (
              <button
                key={o}
                type="button"
                onClick={() => toggleArrayFilter('ownership', o)}
                className={`px-2 py-1.5 rounded-lg text-xs font-medium border text-center transition-all ${
                  active
                    ? 'bg-[#07111F] text-[#E4C766] border-[#C9A227]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {o.replace(' Owner', '')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max KM Driven */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-gray-700">
          <span className="uppercase tracking-wider">Max Kilometers</span>
          <span className="text-[#07111F] font-bold">Under {filters.maxKm.toLocaleString('en-IN')} km</span>
        </div>
        <input
          type="range"
          min={10000}
          max={150000}
          step={5000}
          value={filters.maxKm}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxKm: Number(e.target.value) }))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#07111F]"
        />
      </div>

      {/* Apply button on mobile modal */}
      {isMobileModal && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={onCloseMobile}
            className="w-full bg-gradient-to-r from-[#07111F] to-[#1E293B] text-white font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-98"
          >
            Apply Filters & View Results
          </button>
        </div>
      )}
    </div>
  );

  if (isMobileModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
        <div className="w-full max-w-md bg-[#F7F7F5] h-full overflow-y-auto p-5 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-gray-300">
            <h3 className="font-bold text-base text-[#07111F]">Filter Vehicles</h3>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg bg-gray-200 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="py-4 flex-1">
            {content}
          </div>
        </div>
      </div>
    );
  }

  // Desktop sidebar wrapper
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm sticky top-24">
      {content}
    </div>
  );
};
