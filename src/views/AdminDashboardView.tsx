import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Eye, 
  Car, 
  Building2, 
  AlertTriangle, 
  Award, 
  TrendingUp, 
  Crown,
  Search,
  Sparkles
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { 
    vehicles, 
    updateVehicleStatus, 
    openVehicleDetail, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'dealers' | 'stats'>('moderation');
  const [filterType, setFilterType] = useState<'all' | 'pending' | 'verified'>('all');

  const pendingListings = vehicles.filter((v) => v.status === 'Pending');
  const activeListings = vehicles.filter((v) => v.status === 'Active');

  const handleApprove = (vehicleId: string) => {
    updateVehicleStatus(vehicleId, 'Active');
    showToast('Listing approved and published with verified inspection badge!', 'success');
  };

  const handleReject = (vehicleId: string) => {
    updateVehicleStatus(vehicleId, 'Paused');
    showToast('Listing flagged and returned to seller for clarification.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-[#07111F] text-white rounded-3xl p-6 sm:p-8 border border-[#C9A227]/40 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-900/60 text-red-300 border border-red-500/40">
              Admin Platform Moderation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            CarForSell Operations & Governance
          </h1>
          <p className="text-xs text-gray-300">
            Audit 150-point inspection certificates, moderate new seller submissions, and verify dealer showrooms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block">Active Listings</span>
            <span className="text-xl font-bold text-[#E4C766]">{vehicles.length} vehicles</span>
          </div>
        </div>
      </div>

      {/* Admin Quick Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold mb-1">Total Marketplace GMV</div>
          <div className="text-2xl font-black text-[#07111F]">₹142.8 Cr</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Verified Inventory</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold mb-1">Pending Approval Queue</div>
          <div className="text-2xl font-black text-amber-600">{pendingListings.length}</div>
          <div className="text-[10px] text-amber-600 font-bold mt-1">Requires Engineer Review</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold mb-1">Verified Dealerships</div>
          <div className="text-2xl font-black text-[#07111F]">48 Hubs</div>
          <div className="text-[10px] text-emerald-600 font-bold mt-1">Nashik, Pune, Mumbai...</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm">
          <div className="text-xs text-gray-500 font-semibold mb-1">Compliance Score</div>
          <div className="text-2xl font-black text-[#16845B]">99.4%</div>
          <div className="text-[10px] text-gray-400 mt-1">Zero fraud rate</div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-4 py-3 border-b-2 transition-all ${
            activeTab === 'moderation' ? 'border-[#C9A227] text-[#07111F]' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Listing Moderation Queue ({vehicles.length})
        </button>

        <button
          onClick={() => setActiveTab('dealers')}
          className={`px-4 py-3 border-b-2 transition-all ${
            activeTab === 'dealers' ? 'border-[#C9A227] text-[#07111F]' : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Dealer Verification Portal
        </button>
      </div>

      {/* Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-gray-200/90 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Audit & Verification Console</span>
            <span className="text-xs text-gray-400">Tap inspect or approve to grant verified badge</span>
          </div>

          <div className="space-y-3">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={v.images[0]}
                    alt={v.model}
                    className="w-24 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        v.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {v.status}
                      </span>
                      <span className="text-xs text-gray-400">Seller: {v.seller.name}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#07111F] mt-0.5">
                      {v.year} {v.make} {v.model} {v.variant}
                    </h3>
                    <div className="text-xs font-extrabold text-[#C9A227]">
                      {formatPrice(v.price)} • {v.city} • {v.kmDriven.toLocaleString('en-IN')} km
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => openVehicleDetail(v.id)}
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>

                  <button
                    onClick={() => handleApprove(v.id)}
                    className="px-3.5 py-2 rounded-xl bg-[#16845B] hover:bg-[#126b4a] text-white text-xs font-bold flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>

                  <button
                    onClick={() => handleReject(v.id)}
                    className="px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dealer Verification */}
      {activeTab === 'dealers' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200/90 space-y-4">
          <h3 className="font-bold text-base text-[#07111F]">Verified Dealer Applications</h3>
          
          <div className="p-4 bg-[#F7F7F5] rounded-2xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#07111F] text-[#E4C766] flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#07111F]">Apex Luxury Motors (Gangapur Road, Nashik)</h4>
                <p className="text-xs text-gray-500">GSTIN: 27AABCA1234F1Z9 • 18 Listings • KYC Completed</p>
              </div>
            </div>

            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg">
              Verified Partner
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
