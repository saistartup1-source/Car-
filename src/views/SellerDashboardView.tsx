import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice, formatKm } from '../utils/formatters';
import { 
  Car, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  Award, 
  PlusCircle, 
  SlidersHorizontal, 
  ShieldCheck, 
  Pause, 
  Play, 
  CheckCircle, 
  Trash2, 
  Send, 
  Crown, 
  Calendar, 
  BarChart3, 
  Sparkles,
  ArrowUpRight,
  Clock,
  ChevronRight
} from 'lucide-react';

export const SellerDashboardView: React.FC = () => {
  const { 
    vehicles, 
    currentUser, 
    setCurrentView, 
    openVehicleDetail, 
    enquiries, 
    replyToEnquiry, 
    updateVehicleStatus, 
    deleteVehicle,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'enquiries' | 'analytics' | 'subscription'>('overview');
  const [listingFilter, setListingFilter] = useState<'all' | 'Active' | 'Pending' | 'Sold' | 'Paused'>('all');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string>(enquiries[0]?.id || '');
  const [replyMessage, setReplyMessage] = useState('');

  // Seller's specific listings
  const sellerListings = vehicles.filter((v) => v.sellerId === currentUser.id || v.seller.name === currentUser.name || currentUser.role === 'dealer');
  const filteredListings = listingFilter === 'all' ? sellerListings : sellerListings.filter((v) => v.status === listingFilter);

  const selectedEnquiry = enquiries.find((e) => e.id === selectedEnquiryId) || enquiries[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyMessage.trim() && selectedEnquiry) {
      replyToEnquiry(selectedEnquiry.id, replyMessage.trim());
      setReplyMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Welcome Header */}
      <div className="bg-[#07111F] text-white rounded-3xl p-6 sm:p-8 border border-[#C9A227]/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#E4C766] border border-[#C9A227]/40 uppercase tracking-wider">
              {currentUser.membershipPlan === 'annual_pro' ? 'Annual Pro Seller' : 'Verified Seller'}
            </span>
            <span className="text-xs text-gray-400">ID: {currentUser.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Good evening, <span className="gold-gradient-text">{currentUser.name.split(' ')[0]}</span>
          </h1>

          <p className="text-xs text-gray-300">
            Welcome to your unified automotive sales CRM and performance cockpit.
          </p>
        </div>

        {/* Big Add Vehicle CTA */}
        <button
          onClick={() => setCurrentView('sell')}
          className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-black text-sm px-6 py-3.5 rounded-xl shadow-xl hover:brightness-110 active:scale-98 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          <span>+ Add New Vehicle</span>
        </button>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Active Listings</span>
            <Car className="w-4 h-4 text-[#C9A227]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#07111F]">
            {sellerListings.filter((v) => v.status === 'Active').length || 12}
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+2 new this month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Total Views</span>
            <Eye className="w-4 h-4 text-[#C9A227]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#07111F]">
            8,420
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18.4% vs last week</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Buyer Enquiries</span>
            <MessageSquare className="w-4 h-4 text-[#C9A227]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#07111F]">
            146
          </div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>98% response rate</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
            <span>Vehicles Sold</span>
            <Award className="w-4 h-4 text-[#C9A227]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#07111F]">
            7
          </div>
          <div className="text-[11px] text-gray-500 font-medium">
            ₹3.14 Cr total sales volume
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 overflow-x-auto pb-1 text-xs sm:text-sm font-bold">
        {[
          { id: 'overview', label: 'Overview & Inventory' },
          { id: 'enquiries', label: `Lead Enquiries (${enquiries.length})` },
          { id: 'analytics', label: 'Performance Analytics' },
          { id: 'subscription', label: 'Plan & Billing' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-[#C9A227] text-[#07111F]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW & LISTINGS MANAGEMENT */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Filter Sub-bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-200/90">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-semibold">Filter Status:</span>
              {(['all', 'Active', 'Pending', 'Sold', 'Paused'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setListingFilter(st)}
                  className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                    listingFilter === st
                      ? 'bg-[#07111F] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500">
              Showing <span className="font-bold text-[#07111F]">{filteredListings.length}</span> listings
            </div>
          </div>

          {/* Listings Table / Cards */}
          <div className="space-y-4">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 text-xs text-gray-500">
                No listings found for the selected status.
              </div>
            ) : (
              filteredListings.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gray-300 transition-all"
                >
                  {/* Car info & thumb */}
                  <div 
                    onClick={() => openVehicleDetail(car.id)}
                    className="flex items-center gap-4 cursor-pointer group flex-1"
                  >
                    <img
                      src={car.images[0]}
                      alt={car.model}
                      className="w-24 h-16 sm:w-28 sm:h-20 object-cover rounded-xl border border-gray-200 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            car.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : car.status === 'Sold'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {car.status}
                        </span>
                        <span className="text-xs text-gray-400">{car.rtoCode}</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-[#07111F] group-hover:text-[#C9A227] transition-colors mt-0.5">
                        {car.year} {car.make} {car.model} <span className="text-xs text-gray-500 font-normal">{car.variant}</span>
                      </h3>
                      <div className="text-sm font-extrabold text-[#07111F] mt-0.5">
                        {formatPrice(car.price)}
                      </div>
                    </div>
                  </div>

                  {/* Views & Enquiries counts */}
                  <div className="grid grid-cols-2 gap-4 text-center text-xs py-2 px-4 bg-[#F7F7F5] rounded-xl shrink-0">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Views</span>
                      <span className="font-bold text-[#07111F]">{car.viewsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Enquiries</span>
                      <span className="font-bold text-[#C9A227]">{car.enquiriesCount}</span>
                    </div>
                  </div>

                  {/* Management Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                    {car.status === 'Active' ? (
                      <button
                        onClick={() => updateVehicleStatus(car.id, 'Paused')}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
                        title="Pause Listing"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Pause</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => updateVehicleStatus(car.id, 'Active')}
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1"
                        title="Activate Listing"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Activate</span>
                      </button>
                    )}

                    <button
                      onClick={() => updateVehicleStatus(car.id, 'Sold')}
                      className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold flex items-center gap-1"
                      title="Mark as Sold"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mark Sold</span>
                    </button>

                    <button
                      onClick={() => deleteVehicle(car.id)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs"
                      title="Delete Listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* TAB 2: LEAD ENQUIRIES CRM & CHAT */}
      {activeTab === 'enquiries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-gray-200/90 shadow-lg overflow-hidden min-h-[550px]">
          
          {/* Left Enquiries List */}
          <div className="lg:col-span-5 border-r border-gray-200 divide-y divide-gray-100 overflow-y-auto max-h-[600px]">
            <div className="p-4 bg-[#F7F7F5] font-bold text-xs text-[#07111F] flex justify-between items-center">
              <span>All Active Buyer Inquiries</span>
              <span className="text-gray-500">{enquiries.length} leads</span>
            </div>

            {enquiries.map((enq) => (
              <div
                key={enq.id}
                onClick={() => setSelectedEnquiryId(enq.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedEnquiry?.id === enq.id ? 'bg-[#07111F]/5 border-l-4 border-[#C9A227]' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-[#07111F]">{enq.buyerName}</span>
                  <span className="text-[10px] text-gray-400">{enq.createdAt}</span>
                </div>
                <div className="text-xs font-semibold text-gray-700 truncate">{enq.vehicleName}</div>
                <p className="text-xs text-gray-500 line-clamp-1 mt-1">{enq.message}</p>
                {enq.offeredPrice && (
                  <div className="mt-1 text-[11px] font-bold text-[#16845B]">
                    Offer: {formatPrice(enq.offeredPrice)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Message Thread */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between">
            {selectedEnquiry ? (
              <>
                {/* Header */}
                <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#07111F]">{selectedEnquiry.buyerName}</h3>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                      <span>Phone: {selectedEnquiry.buyerPhone}</span>
                      <span>•</span>
                      <span>City: {selectedEnquiry.buyerCity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#C9A227]">{formatPrice(selectedEnquiry.vehiclePrice)}</span>
                    <span className="text-[10px] text-gray-400 block">{selectedEnquiry.vehicleName}</span>
                  </div>
                </div>

                {/* Chat History */}
                <div className="py-6 space-y-3 flex-1 overflow-y-auto max-h-72">
                  <div className="bg-[#F7F7F5] p-3.5 rounded-2xl max-w-md text-xs text-gray-800 space-y-1">
                    <div className="font-bold text-[#07111F]">{selectedEnquiry.buyerName}</div>
                    <p className="leading-relaxed">{selectedEnquiry.message}</p>
                    <span className="text-[10px] text-gray-400 block text-right">{selectedEnquiry.createdAt}</span>
                  </div>

                  {selectedEnquiry.chatMessages?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl max-w-md text-xs space-y-1 ${
                        msg.sender === 'seller'
                          ? 'ml-auto bg-[#07111F] text-white'
                          : 'bg-[#F7F7F5] text-gray-800'
                      }`}
                    >
                      <div className="font-bold">{msg.sender === 'seller' ? 'You' : selectedEnquiry.buyerName}</div>
                      <p className="leading-relaxed">{msg.text}</p>
                      <span className={`text-[10px] block text-right ${msg.sender === 'seller' ? 'text-gray-400' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Reply Form */}
                <form onSubmit={handleSendReply} className="pt-4 border-t border-gray-200 flex gap-2">
                  <input
                    type="text"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response to the buyer..."
                    className="flex-1 bg-[#F7F7F5] border border-gray-300 focus:border-[#C9A227] rounded-xl px-4 py-2.5 text-xs outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#07111F] hover:bg-[#111827] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E4C766]" />
                    <span>Reply</span>
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-20 text-xs text-gray-400">
                Select an enquiry from the left to view the buyer thread.
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Views Chart Simulation */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#07111F]">Weekly Listing Views Trend</h3>
                  <p className="text-[11px] text-gray-500">Total impressions across search & detail pages</p>
                </div>
                <span className="text-xs font-extrabold text-[#C9A227]">+24% WoW</span>
              </div>

              {/* Minimalist Gold Chart Bars */}
              <div className="flex items-end justify-between h-44 pt-6 px-2">
                {[
                  { day: 'Mon', count: 720, height: '40%' },
                  { day: 'Tue', count: 980, height: '55%' },
                  { day: 'Wed', count: 1240, height: '70%' },
                  { day: 'Thu', count: 1100, height: '62%' },
                  { day: 'Fri', count: 1450, height: '82%' },
                  { day: 'Sat', count: 1890, height: '98%' },
                  { day: 'Sun', count: 1640, height: '88%' }
                ].map((bar) => (
                  <div key={bar.day} className="flex flex-col items-center gap-2 group flex-1">
                    <div className="text-[10px] font-bold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.count}
                    </div>
                    <div
                      style={{ height: bar.height }}
                      className="w-7 bg-gradient-to-t from-[#07111F] to-[#C9A227] rounded-t-lg transition-all group-hover:brightness-110"
                    />
                    <span className="text-[11px] text-gray-500 font-semibold">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buyer Conversion & Lead Sources */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <h3 className="font-bold text-sm text-[#07111F]">Top Vehicle Traffic Sources</h3>
                <p className="text-[11px] text-gray-500">Where serious buyers are discovering your cars</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-gray-700 font-semibold">
                    <span>Direct Search (Make & Model)</span>
                    <span className="font-bold text-[#07111F]">58%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C9A227] h-full rounded-full w-[58%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-gray-700 font-semibold">
                    <span>Featured Carousel & Priority Badges</span>
                    <span className="font-bold text-[#07111F]">26%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#07111F] h-full rounded-full w-[26%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-gray-700 font-semibold">
                    <span>City Hub Landing (Nashik / Mumbai)</span>
                    <span className="font-bold text-[#07111F]">16%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#16845B] h-full rounded-full w-[16%]" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 4: SUBSCRIPTION & BILLING */}
      {activeTab === 'subscription' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-lg max-w-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-[#C9A227] tracking-wider">
                Active Membership Plan
              </span>
              <h3 className="text-xl font-extrabold text-[#07111F] mt-0.5">
                Annual Pro Seller License
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#07111F] text-[#E4C766] flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-[#F7F7F5] rounded-xl">
              <span className="text-gray-500 block">Plan Cost</span>
              <span className="text-lg font-bold text-[#07111F]">₹7,000 / year</span>
            </div>
            <div className="p-4 bg-[#F7F7F5] rounded-xl">
              <span className="text-gray-500 block">Renewal Expiry</span>
              <span className="text-lg font-bold text-[#07111F]">15 August 2027</span>
            </div>
          </div>

          <div className="space-y-2 text-xs text-gray-700">
            <div className="flex items-center gap-2 font-bold text-[#16845B]">
              <CheckCircle className="w-4 h-4" />
              <span>Unlimited Active Vehicle Listings Enabled</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[#16845B]">
              <CheckCircle className="w-4 h-4" />
              <span>Priority Search Placement & Dealer Showroom Profile</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-[#16845B]">
              <CheckCircle className="w-4 h-4" />
              <span>Dedicated Account Manager & Technical Support</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex gap-3">
            <button
              onClick={() => showToast('Subscription auto-renewal is active for August 2027', 'info')}
              className="bg-[#07111F] text-white text-xs font-bold px-5 py-3 rounded-xl hover:bg-[#111827]"
            >
              Manage Auto-Renewal
            </button>
            <button
              onClick={() => showToast('Tax Invoice PDF downloaded to your device', 'success')}
              className="bg-gray-100 text-gray-700 text-xs font-bold px-5 py-3 rounded-xl hover:bg-gray-200"
            >
              Download GST Invoices
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
