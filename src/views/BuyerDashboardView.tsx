import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCard } from '../components/VehicleCard';
import { formatPrice } from '../utils/formatters';
import { 
  Heart, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Trash2,
  Bell
} from 'lucide-react';

export const BuyerDashboardView: React.FC = () => {
  const { 
    vehicles, 
    favorites, 
    enquiries, 
    currentUser, 
    setCurrentView, 
    openVehicleDetail,
    toggleFavorite 
  } = useApp();

  const [tab, setTab] = useState<'favorites' | 'enquiries' | 'alerts'>('favorites');

  const favoritedVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Buyer Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase font-bold text-[#C9A227] tracking-wider mb-1">
            Buyer Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07111F]">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your saved dream cars, active seller conversations, and inspection requests.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('marketplace')}
          className="bg-[#07111F] hover:bg-[#111827] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-all shrink-0"
        >
          <Search className="w-4 h-4 text-[#E4C766]" />
          <span>Browse Marketplace</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setTab('favorites')}
          className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-all ${
            tab === 'favorites'
              ? 'border-[#C9A227] text-[#07111F]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Vehicles ({favoritedVehicles.length})</span>
        </button>

        <button
          onClick={() => setTab('enquiries')}
          className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-all ${
            tab === 'enquiries'
              ? 'border-[#C9A227] text-[#07111F]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Active Inquiries ({enquiries.length})</span>
        </button>

        <button
          onClick={() => setTab('alerts')}
          className={`px-4 py-3 border-b-2 flex items-center gap-2 transition-all ${
            tab === 'alerts'
              ? 'border-[#C9A227] text-[#07111F]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Saved Search Alerts</span>
        </button>
      </div>

      {/* TAB 1: FAVORITES */}
      {tab === 'favorites' && (
        <div>
          {favoritedVehicles.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-[#07111F]">No saved vehicles yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Browse our verified inventory and tap the heart icon on any vehicle to save it to your wishlist.
              </p>
              <button
                onClick={() => setCurrentView('marketplace')}
                className="bg-[#07111F] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
              >
                Explore Cars
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedVehicles.map((car) => (
                <VehicleCard key={car.id} vehicle={car} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INQUIRIES */}
      {tab === 'enquiries' && (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div
              key={enq.id}
              className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={enq.vehicleImage}
                  alt={enq.vehicleName}
                  className="w-20 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                />
                <div>
                  <div className="text-[10px] font-bold text-[#16845B] uppercase">Enquiry Sent</div>
                  <h4 className="font-bold text-sm text-[#07111F]">{enq.vehicleName}</h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{enq.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#07111F] block">{formatPrice(enq.vehiclePrice)}</span>
                  <span className="text-[10px] text-gray-400">{enq.createdAt}</span>
                </div>
                <button
                  onClick={() => openVehicleDetail(enq.vehicleId)}
                  className="bg-[#07111F] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#111827]"
                >
                  View Car
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ALERTS */}
      {tab === 'alerts' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 space-y-4 max-w-xl">
          <h3 className="font-bold text-sm text-[#07111F]">Your Active Search Alerts</h3>
          <div className="p-4 bg-[#F7F7F5] rounded-xl flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-[#07111F]">BMW 3 Series & 5 Series in Maharashtra</div>
              <div className="text-[11px] text-gray-500">Under ₹50,00,000 • Verified Listings Only</div>
            </div>
            <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
              Active Daily
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
