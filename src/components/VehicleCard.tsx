import React from 'react';
import { Vehicle } from '../types';
import { useApp } from '../context/AppContext';
import { formatPrice, formatKm, calculateEMI } from '../utils/formatters';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Gauge, 
  Fuel, 
  SlidersHorizontal, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone
} from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  viewMode?: 'grid' | 'list';
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, viewMode = 'grid' }) => {
  const { openVehicleDetail, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(vehicle.id);
  const emi = calculateEMI(vehicle.price * 0.8, 9.5, 60);

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => openVehicleDetail(vehicle.id)}
        className="group bg-white rounded-2xl border border-gray-200/80 hover:border-[#C9A227]/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col md:flex-row gap-5 p-4"
      >
        {/* Image Container */}
        <div className="relative w-full md:w-72 h-48 md:h-auto shrink-0 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {vehicle.isVerified && (
            <div className="absolute top-3 left-3 bg-[#07111F]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-[#C9A227]/50 flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E4C766]" />
              <span>VERIFIED</span>
            </div>
          )}
          {vehicle.isFeatured && (
            <div className="absolute top-3 right-3 bg-[#C9A227] text-[#07111F] text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {vehicle.ownership} • {vehicle.registrationState}
                </span>
                <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#C9A227] transition-colors">
                  {vehicle.year} {vehicle.make} {vehicle.model} <span className="text-sm font-normal text-gray-600">{vehicle.variant}</span>
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(vehicle.id);
                }}
                className={`p-2 rounded-full border transition-all ${
                  isFav 
                    ? 'bg-red-50 text-red-500 border-red-200' 
                    : 'bg-white/80 text-gray-400 border-gray-200 hover:text-red-500'
                }`}
                aria-label="Save vehicle"
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-xs text-gray-600">
              <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-gray-400" />
                <span>{formatKm(vehicle.kmDriven)}</span>
              </div>
              <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <Fuel className="w-3.5 h-3.5 text-gray-400" />
                <span>{vehicle.fuel}</span>
              </div>
              <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
                <span>{vehicle.transmission}</span>
              </div>
              <div className="bg-gray-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{vehicle.city}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Price & CTA */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="text-xl font-extrabold text-[#07111F]">
                {formatPrice(vehicle.price)}
              </div>
              <div className="text-[11px] text-gray-500">
                EMI starts at ~₹{emi.toLocaleString('en-IN')}/mo
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`tel:${vehicle.seller.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                title={`Call ${vehicle.seller.name}`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call</span>
              </a>

              <button
                onClick={() => openVehicleDetail(vehicle.id)}
                className="inline-flex items-center gap-1.5 bg-[#07111F] hover:bg-[#111827] text-white group-hover:bg-[#C9A227] group-hover:text-[#07111F] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode
  return (
    <div 
      onClick={() => openVehicleDetail(vehicle.id)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:border-gray-200 transition-all cursor-pointer flex flex-col justify-between"
    >
      {/* Top Image & Floating Badges */}
      <div>
        <div className="h-44 sm:h-48 bg-[#111827] relative overflow-hidden">
          <img
            src={vehicle.images[0]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Gradient overlay on bottom of image */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Top Left: Verified Badge */}
          {vehicle.isVerified && (
            <div className="absolute top-3 left-3 bg-[#16845B] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span>VERIFIED</span>
            </div>
          )}

          {/* Hot Deal / Featured Badge */}
          {vehicle.isFeatured && !vehicle.isVerified && (
            <div className="absolute top-3 left-3 bg-[#C9A227] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              HOT DEAL
            </div>
          )}

          {/* Top Right: Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isFav 
                ? 'bg-white text-red-500' 
                : 'bg-black/40 text-white hover:bg-white hover:text-red-500'
            }`}
            aria-label="Save vehicle to favorites"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Bottom Pill: City Location */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white text-[11px] font-medium drop-shadow">
            <MapPin className="w-3 h-3 text-[#E4C766]" />
            <span>{vehicle.city}, {vehicle.state}</span>
          </div>

          {/* Inspection Score Pill */}
          <div className="absolute bottom-2.5 right-3 bg-[#07111F]/80 backdrop-blur-md text-[#E4C766] border border-[#C9A227]/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-[#E4C766]" />
            <span>{vehicle.inspectionScore}/100</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-1 text-[#07111F] group-hover:text-[#C9A227] transition-colors line-clamp-1">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-[#667085] text-xs font-medium mb-3">
            {formatKm(vehicle.kmDriven)} • {vehicle.fuel} • {vehicle.transmission}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div>
              <div className="text-xl font-extrabold text-[#07111F]">
                {formatPrice(vehicle.price)}
              </div>
              <div className="text-[10px] text-gray-500">
                EMI ~₹{emi.toLocaleString('en-IN')}/mo
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${vehicle.seller.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg border border-emerald-200 transition-colors"
                title={`Call ${vehicle.seller.name}`}
                aria-label="Call Seller"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => openVehicleDetail(vehicle.id)}
                className="bg-[#F7F7F5] text-[#07111F] text-xs font-bold px-3.5 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 hover:border-gray-300 transition-colors whitespace-nowrap"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
