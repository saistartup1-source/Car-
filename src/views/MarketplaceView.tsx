import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { SearchFilters } from '../components/SearchFilters';
import { sampleBrands } from '../data/mockData';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  ShieldCheck, 
  RotateCcw, 
  X,
  ChevronDown
} from 'lucide-react';

export const MarketplaceView: React.FC = () => {
  const { 
    vehicles, 
    filters, 
    setFilters, 
    resetFilters, 
    isMobileFilterOpen, 
    setIsMobileFilterOpen 
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered & Sorted inventory
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      // Exclude non-active in buyer view
      if (v.status !== 'Active') return false;

      // Keyword search
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const fullTitle = `${v.year} ${v.make} ${v.model} ${v.variant} ${v.city} ${v.fuel}`.toLowerCase();
        if (!fullTitle.includes(q)) return false;
      }

      // Category
      if (filters.category && filters.category !== 'All' && v.category !== filters.category) {
        return false;
      }

      // Make
      if (filters.make && filters.make !== 'All' && v.make !== filters.make) {
        return false;
      }

      // Location
      if (filters.location && filters.location !== 'All' && v.city !== filters.location) {
        return false;
      }

      // Price
      if (v.price > filters.maxPrice) return false;

      // KM
      if (v.kmDriven > filters.maxKm) return false;

      // Verified only
      if (filters.verifiedOnly && !v.isVerified) return false;

      // Fuel types
      if (filters.fuel.length > 0 && !filters.fuel.includes(v.fuel)) return false;

      // Transmission
      if (filters.transmission.length > 0 && !filters.transmission.includes(v.transmission)) return false;

      // Ownership
      if (filters.ownership.length > 0 && !filters.ownership.includes(v.ownership)) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (filters.sortBy === 'price_asc') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price_desc') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'km_asc') {
        return a.kmDriven - b.kmDriven;
      }
      if (filters.sortBy === 'year_desc') {
        return b.year - a.year;
      }
      // Recommended: Featured first, then highest inspection score
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.inspectionScore - a.inspectionScore;
    });
  }, [vehicles, filters]);

  const quickFilterChips = [
    { label: 'Verified Only', active: filters.verifiedOnly, onClick: () => setFilters((p) => ({ ...p, verifiedOnly: !p.verifiedOnly })) },
    { label: 'BMW', active: filters.make === 'BMW', onClick: () => setFilters((p) => ({ ...p, make: p.make === 'BMW' ? 'All' : 'BMW' })) },
    { label: 'SUVs', active: filters.category === 'SUV', onClick: () => setFilters((p) => ({ ...p, category: p.category === 'SUV' ? 'All' : 'SUV' })) },
    { label: 'Under 30k KM', active: filters.maxKm <= 30000, onClick: () => setFilters((p) => ({ ...p, maxKm: p.maxKm <= 30000 ? 150000 : 30000 })) },
    { label: 'Automatic Only', active: filters.transmission.includes('Automatic'), onClick: () => setFilters((p) => ({ ...p, transmission: p.transmission.includes('Automatic') ? [] : ['Automatic'] })) }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Breadcrumb & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-500 font-medium">
            Home / Marketplace / <span className="text-[#07111F] font-bold">Search Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07111F] tracking-tight mt-1">
            Pre-Owned Luxury & Verified Vehicles
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing <span className="font-bold text-[#07111F]">{filteredVehicles.length}</span> verified cars across India
          </p>
        </div>

        {/* View Controls & Sort (Desktop) */}
        <div className="flex items-center gap-3">
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              aria-label="Sort listings"
              className="bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-xl px-3.5 py-2.5 outline-none pr-8 appearance-none cursor-pointer shadow-sm hover:border-gray-300"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="newest">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="km_asc">Lowest Kilometers</option>
              <option value="year_desc">Latest Model Year</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Grid / List switcher */}
          <div className="hidden sm:flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-[#07111F] shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-[#07111F] shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-[#07111F] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#E4C766]" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Instant Search Bar */}
      <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-sm">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
            placeholder="Search by make, model, city or keyword (e.g. BMW 330i, Fortuner, Mumbai, Selenite Grey)..."
            className="w-full bg-[#F7F7F5] border border-transparent focus:border-[#C9A227] text-sm text-[#101828] font-medium rounded-xl pl-11 pr-24 py-3 outline-none placeholder:text-gray-400"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters((p) => ({ ...p, searchQuery: '' }))}
              className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 text-xs no-scrollbar">
          <span className="text-gray-400 shrink-0 text-[11px] font-semibold">Quick Filters:</span>
          {quickFilterChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.onClick}
              className={`shrink-0 px-3 py-1.5 rounded-lg font-medium transition-all ${
                chip.active
                  ? 'bg-[#07111F] text-[#E4C766] border border-[#C9A227]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <SearchFilters />
        </div>

        {/* Vehicles Grid / Empty State */}
        <div className="lg:col-span-8 xl:col-span-9">
          {filteredVehicles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#07111F]">No vehicles match your search</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your price range, removing specific filters, or checking all cities.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-[#07111F] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#111827] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5' : 'space-y-4'}>
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Filter Modal Drawer */}
      {isMobileFilterOpen && (
        <SearchFilters
          isMobileModal={true}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />
      )}

    </div>
  );
};
