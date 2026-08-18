import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, formatKm, calculateEMI } from '../utils/formatters';
import { EnquiryModal } from '../components/EnquiryModal';
import { VehicleCard } from '../components/VehicleCard';
import { 
  Heart, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Fuel, 
  SlidersHorizontal, 
  Gauge, 
  Users, 
  Palette, 
  FileText, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  Calculator, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Award,
  AlertCircle,
  Clock
} from 'lucide-react';

export const VehicleDetailView: React.FC = () => {
  const { 
    selectedVehicleId, 
    vehicles, 
    setCurrentView, 
    favorites, 
    toggleFavorite, 
    showToast,
    setSelectedDealerId
  } = useApp();

  const vehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryInitialMode, setEnquiryInitialMode] = useState<'contact' | 'offer' | 'callback'>('contact');

  // EMI Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTenureMonths, setLoanTenureMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(9.5);

  if (!vehicle) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Vehicle not found</h2>
        <button onClick={() => setCurrentView('marketplace')} className="mt-4 text-[#C9A227] underline">
          Return to Marketplace
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(vehicle.id);
  const loanPrincipal = vehicle.price * (1 - downPaymentPercent / 100);
  const calculatedEMI = calculateEMI(loanPrincipal, interestRate, loanTenureMonths);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Listing link copied to clipboard!', 'success');
  };

  const handleOpenEnquiry = (mode: 'contact' | 'offer' | 'callback') => {
    setEnquiryInitialMode(mode);
    setIsEnquiryModalOpen(true);
  };

  const similarVehicles = vehicles
    .filter((v) => v.id !== vehicle.id && (v.category === vehicle.category || v.make === vehicle.make))
    .slice(0, 3);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Top Action Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('marketplace')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#07111F] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Search Results</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          <button
            onClick={() => toggleFavorite(vehicle.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold shadow-sm transition-all ${
              isFav ? 'bg-red-50 text-red-500 border-red-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-500' : ''}`} />
            <span>{isFav ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Gallery + Quick Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Gallery & In-Depth Details */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Gallery Container */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black shadow-lg border border-gray-200/80 group">
              <img
                src={vehicle.images[activeImageIndex]}
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />

              {/* Verified Tag Overlay */}
              {vehicle.isVerified && (
                <div className="absolute top-4 left-4 bg-[#07111F]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-[#C9A227]/50 flex items-center gap-1.5 shadow-lg">
                  <ShieldCheck className="w-4 h-4 text-[#E4C766]" />
                  <span>150-POINT VERIFIED LISTING</span>
                </div>
              )}

              {/* Fullscreen Trigger */}
              <button
                onClick={() => setIsFullscreenOpen(true)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Prev / Next Arrows */}
              {vehicle.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image index count */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                {activeImageIndex + 1} / {vehicle.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {vehicle.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2">
                {vehicle.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#C9A227] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications Matrix Grid */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#07111F] flex items-center gap-2 border-b border-gray-100 pb-3">
              <Award className="w-4 h-4 text-[#C9A227]" />
              <span>Vehicle Specifications & Key Overview</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              
              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>Model Year</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.year}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <Gauge className="w-3.5 h-3.5 text-gray-400" />
                  <span>Kilometers</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{formatKm(vehicle.kmDriven)}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <Fuel className="w-3.5 h-3.5 text-gray-400" />
                  <span>Fuel Type</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.fuel}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                  <span>Transmission</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.transmission}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>Ownership</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.ownership}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <Palette className="w-3.5 h-3.5 text-gray-400" />
                  <span>Exterior Color</span>
                </div>
                <div className="font-bold text-sm text-[#07111F] truncate">{vehicle.color}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>Registration RTO</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.rtoCode}</div>
              </div>

              <div className="p-3 bg-[#F7F7F5] rounded-xl">
                <div className="flex items-center gap-1.5 text-gray-500 mb-1">
                  <FileText className="w-3.5 h-3.5 text-gray-400" />
                  <span>Insurance</span>
                </div>
                <div className="font-bold text-sm text-[#07111F]">{vehicle.insuranceType}</div>
              </div>

            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#07111F]">Seller's Detailed Description</h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {vehicle.description}
            </p>
          </div>

          {/* Highlights & Verified Guarantee */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#07111F]">Vehicle Highlights & Condition Assurances</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 150-Point Technical Inspection Breakdown */}
          {vehicle.inspectionPoints && vehicle.inspectionPoints.length > 0 && (
            <div className="bg-[#07111F] text-white rounded-2xl p-6 border border-[#C9A227]/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#E4C766]" />
                  <div>
                    <h3 className="text-sm font-bold text-white">CarForSell 150-Point Inspection Report</h3>
                    <p className="text-[11px] text-gray-400">Inspected by certified automotive engineers</p>
                  </div>
                </div>
                <div className="bg-emerald-900/60 border border-emerald-400 text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold">
                  Score: {vehicle.inspectionScore}/100 PASS
                </div>
              </div>

              <div className="space-y-2.5">
                {vehicle.inspectionPoints.map((pt, i) => (
                  <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white">{pt.category}</div>
                      <div className="text-gray-300 text-[11px] mt-0.5">{pt.details}</div>
                    </div>
                    <span className="shrink-0 text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Loan & EMI Calculator */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 font-bold text-[#07111F]">
                <Calculator className="w-4 h-4 text-[#C9A227]" />
                <span>Estimate Your Monthly Auto Loan EMI</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-500 block">Estimated EMI</span>
                <span className="text-lg font-extrabold text-[#07111F]">₹{calculatedEMI.toLocaleString('en-IN')}/mo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Down Payment ({downPaymentPercent}%)</span>
                  <span className="font-bold text-[#07111F]">{formatPrice(vehicle.price * (downPaymentPercent / 100))}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Tenure ({loanTenureMonths / 12} Years)</span>
                  <span className="font-bold text-[#07111F]">{loanTenureMonths} Mo</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={12}
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Interest Rate</span>
                  <span className="font-bold text-[#07111F]">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min={8.5}
                  max={13}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Seller Contact Card (Sticky) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Price & Primary Booking Box */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-lg space-y-5">
            <div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Direct Selling Price
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#07111F] tracking-tight mt-1">
                {formatPrice(vehicle.price)}
              </div>
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{vehicle.city}, {vehicle.state}</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenEnquiry('contact')}
                  className="bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold py-3 rounded-xl shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Enquire</span>
                </button>

                <a
                  href={`tel:${vehicle.seller.phone}`}
                  className="bg-[#16845B] hover:bg-[#126b49] text-white font-extrabold py-3 rounded-xl shadow-md hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Call Seller</span>
                </a>
              </div>

              <button
                onClick={() => handleOpenEnquiry('offer')}
                className="w-full bg-[#07111F] hover:bg-[#111827] text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-xs whitespace-nowrap"
              >
                <span>Make Counter Offer</span>
              </button>

              <button
                onClick={() => handleOpenEnquiry('callback')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 text-xs whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-gray-500" />
                <span>Request Callback</span>
              </button>
            </div>

            {/* Zero Brokerage Trust Banner */}
            <div className="p-3 bg-[#F7F7F5] rounded-xl text-center text-[11px] text-gray-600 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#16845B]" />
              <span>Zero brokerage fee on buyer transactions</span>
            </div>
          </div>

          {/* Verified Seller Profile Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Seller Information
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={vehicle.seller.avatar}
                alt={vehicle.seller.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#C9A227]/50"
              />
              <div>
                <h4 className="font-bold text-sm text-[#07111F]">
                  {vehicle.seller.dealerName || vehicle.seller.name}
                </h4>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{vehicle.seller.location}</span>
                </div>
              </div>
            </div>

            {/* Seller stats */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 bg-[#F7F7F5] rounded-xl">
              <div>
                <span className="block text-[10px] text-gray-500">Response</span>
                <span className="font-bold text-[#07111F]">{vehicle.seller.responseRate}</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-500">Rating</span>
                <span className="font-bold text-[#07111F]">★ {vehicle.seller.rating}</span>
              </div>
              <div>
                <span className="block text-[10px] text-gray-500">Vehicles Sold</span>
                <span className="font-bold text-[#07111F]">{vehicle.seller.soldCount}</span>
              </div>
            </div>

            {vehicle.seller.bio && (
              <p className="text-xs text-gray-600 italic">
                "{vehicle.seller.bio}"
              </p>
            )}

            {vehicle.seller.role === 'dealer' && (
              <button
                onClick={() => {
                  setSelectedDealerId(vehicle.seller.id);
                  setCurrentView('dealer_profile');
                }}
                className="w-full text-center text-xs text-[#C9A227] font-bold hover:underline"
              >
                View Dealer Showroom & All Inventory →
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Similar Vehicles Carousel / Grid */}
      {similarVehicles.length > 0 && (
        <div className="pt-8 border-t border-gray-200 space-y-6">
          <div>
            <div className="text-xs uppercase font-bold text-[#C9A227] tracking-wider mb-1">
              Recommended Alternatives
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#07111F]">
              Similar Verified Vehicles You May Like
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarVehicles.map((car) => (
              <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen Photo Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={vehicle.images[activeImageIndex]}
            alt="Fullscreen car"
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
          />
        </div>
      )}

      {/* Direct Contact Modal */}
      {isEnquiryModalOpen && (
        <EnquiryModal
          vehicle={vehicle}
          initialMode={enquiryInitialMode}
          onClose={() => setIsEnquiryModalOpen(false)}
        />
      )}

    </div>
  );
};
