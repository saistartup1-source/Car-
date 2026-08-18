import React, { useState } from 'react';
import { Vehicle } from '../types';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/formatters';
import { 
  X, 
  Send, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  Tag,
  Clock
} from 'lucide-react';

interface EnquiryModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  initialMode?: 'contact' | 'offer' | 'callback';
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ 
  vehicle, 
  onClose, 
  initialMode = 'contact' 
}) => {
  const { addEnquiry, currentUser } = useApp();

  const [mode, setMode] = useState<'contact' | 'offer' | 'callback'>(initialMode);
  const [buyerName, setBuyerName] = useState(currentUser.name);
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone);
  const [buyerEmail, setBuyerEmail] = useState(currentUser.email);
  const [buyerCity, setBuyerCity] = useState(currentUser.location.split(',')[0]);
  const [message, setMessage] = useState(
    `Hello ${vehicle.seller.name.split(' ')[0]}, I am interested in your ${vehicle.year} ${vehicle.make} ${vehicle.model} listed for ${formatPrice(vehicle.price)}. Please share the physical inspection availability.`
  );
  const [offeredPrice, setOfferedPrice] = useState<number>(Math.round(vehicle.price * 0.95 / 10000) * 10000);
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM - 1:00 PM)');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      vehicleId: vehicle.id,
      vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.variant}`,
      vehicleImage: vehicle.images[0],
      vehiclePrice: vehicle.price,
      buyerName,
      buyerPhone,
      buyerEmail,
      buyerCity,
      message: mode === 'offer' 
        ? `${message} [Formal Counter Offer: ${formatPrice(offeredPrice)}]` 
        : mode === 'callback' 
        ? `[Callback Request: Preferred time ${preferredTime}] ${message}` 
        : message,
      offeredPrice: mode === 'offer' ? offeredPrice : undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#07111F] text-white border border-[#C9A227]/40 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-b from-[#0F1D32] to-[#07111F]">
          <div className="flex items-center gap-3">
            <img
              src={vehicle.images[0]}
              alt={vehicle.model}
              className="w-16 h-12 rounded-lg object-cover border border-white/10"
            />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#E4C766] tracking-wider">
                Direct Seller Connection
              </span>
              <h3 className="text-base font-bold text-white line-clamp-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h3>
              <div className="text-xs text-[#C9A227] font-extrabold">
                Asking: {formatPrice(vehicle.price)}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-[#040A12] p-1.5 border-b border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMode('contact')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              mode === 'contact' ? 'bg-[#C9A227] text-[#07111F]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Direct Enquiry
          </button>
          <button
            type="button"
            onClick={() => setMode('offer')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              mode === 'offer' ? 'bg-[#C9A227] text-[#07111F]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Make an Offer
          </button>
          <button
            type="button"
            onClick={() => setMode('callback')}
            className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
              mode === 'callback' ? 'bg-[#C9A227] text-[#07111F]' : 'text-gray-400 hover:text-white'
            }`}
          >
            Request Callback
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {mode === 'offer' && (
            <div className="bg-[#111C2D] p-3.5 rounded-xl border border-[#C9A227]/30 space-y-2">
              <div className="flex justify-between items-center text-gray-300 font-medium">
                <span>Your Counter Offer:</span>
                <span className="text-sm font-bold text-[#E4C766]">{formatPrice(offeredPrice)}</span>
              </div>
              <input
                type="range"
                min={Math.round(vehicle.price * 0.7)}
                max={vehicle.price}
                step={25000}
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
              />
              <div className="text-[10px] text-gray-400 text-center">
                Reasonable offers within 5-10% of asking price have a 4x higher response rate.
              </div>
            </div>
          )}

          {mode === 'callback' && (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Preferred Callback Window
              </label>
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white rounded-xl p-2.5 outline-none"
              >
                <option>Morning (10:00 AM - 1:00 PM)</option>
                <option>Afternoon (1:00 PM - 5:00 PM)</option>
                <option>Evening (5:00 PM - 8:30 PM)</option>
                <option>Immediate / Urgent Call</option>
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white rounded-xl p-2.5 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Mobile (for WhatsApp)</label>
              <input
                type="tel"
                required
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white rounded-xl p-2.5 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Message to Seller</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#111C2D] border border-white/15 focus:border-[#C9A227] text-white rounded-xl p-2.5 outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
              No spam guarantee
            </span>
            <span className="text-[#E4C766]">Seller response: &lt; 15 mins</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-bold py-3 rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Send Enquiry to {vehicle.seller.name.split(' ')[0]}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
