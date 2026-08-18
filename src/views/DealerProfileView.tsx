import React from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Building2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Award, 
  Star, 
  CheckCircle2, 
  ChevronLeft,
  Share2
} from 'lucide-react';

export const DealerProfileView: React.FC = () => {
  const { vehicles, selectedDealerId, setCurrentView, showToast } = useApp();

  // Find seller info from first matching vehicle or default
  const dealerVehicles = vehicles.filter((v) => v.sellerId === selectedDealerId || v.seller.role === 'dealer');
  const sellerInfo = dealerVehicles[0]?.seller || {
    name: 'Apex Luxury Motors',
    dealerName: 'Apex Luxury Motors Nashik',
    location: 'Gangapur Road, Nashik, Maharashtra',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
    verified: true,
    rating: 4.9,
    soldCount: 42,
    responseRate: '15 mins',
    memberSince: '2022',
    bio: 'Premier luxury automotive hub specializing in certified pre-owned German sedans, performance SUVs, and sports cars. 100% genuine mileage assurance and technical certification.'
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Showroom profile link copied!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => setCurrentView('marketplace')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#07111F]"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to All Marketplace Listings</span>
      </button>

      {/* Showroom Header Banner */}
      <div className="bg-[#07111F] text-white rounded-3xl p-6 sm:p-10 border border-[#C9A227]/40 shadow-2xl relative overflow-hidden space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <img
              src={sellerInfo.avatar}
              alt={sellerInfo.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-[#C9A227]/50 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#C9A227] text-[#07111F] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED DEALERSHIP
                </span>
                <span className="text-xs text-gray-400">Member since {sellerInfo.memberSince}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {sellerInfo.dealerName || sellerInfo.name}
              </h1>

              <div className="text-xs text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E4C766]" />
                <span>{sellerInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Showroom</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed relative z-10">
          {sellerInfo.bio}
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 relative z-10 text-xs">
          <div>
            <span className="text-gray-400 block text-[11px]">Customer Rating</span>
            <span className="text-lg font-bold text-[#E4C766]">★ {sellerInfo.rating} / 5.0</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">Vehicles Sold</span>
            <span className="text-lg font-bold text-white">{sellerInfo.soldCount}+ Cars</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">Avg. Response Time</span>
            <span className="text-lg font-bold text-white">&lt; {sellerInfo.responseRate}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px]">Live Showroom Inventory</span>
            <span className="text-lg font-bold text-white">{dealerVehicles.length} Vehicles</span>
          </div>
        </div>

      </div>

      {/* Showroom Inventory Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#07111F]">
              Live Showroom Inventory ({dealerVehicles.length})
            </h2>
            <p className="text-xs text-gray-500">
              All vehicles on this lot have passed mandatory 150-point technical checks.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealerVehicles.map((car) => (
            <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
          ))}
        </div>
      </div>

    </div>
  );
};
