import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sampleBrands, sampleCities } from '../data/mockData';
import { calculateMarketEstimate, formatPrice } from '../utils/formatters';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Sparkles, 
  ShieldCheck, 
  Camera, 
  X, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  Eye, 
  Car, 
  Crown,
  Layers,
  Fuel,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

export const SellWizardView: React.FC = () => {
  const { addNewVehicle, setCurrentView, openVehicleDetail, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Vehicle Basics
  const [category, setCategory] = useState<'Car' | 'SUV' | 'Luxury Car' | 'Electric & Hybrid' | 'Commercial' | 'Bike'>('Luxury Car');
  const [make, setMake] = useState('BMW');
  const [model, setModel] = useState('3 Series');
  const [variant, setVariant] = useState('330i M Sport');
  const [year, setYear] = useState<number>(2023);

  // Step 2: Details
  const [fuel, setFuel] = useState<'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG'>('Petrol');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [kmDriven, setKmDriven] = useState<number>(22000);
  const [ownership, setOwnership] = useState<'1st Owner' | '2nd Owner' | '3rd Owner' | '4th+ Owner'>('1st Owner');
  const [city, setCity] = useState('Nashik');
  const [state, setState] = useState('Maharashtra');
  const [rtoCode, setRtoCode] = useState('MH-15 (Nashik)');
  const [color, setColor] = useState('Mineral Grey Metallic');
  const [insuranceType, setInsuranceType] = useState<'Comprehensive' | 'Zero Dep' | 'Third Party' | 'Expired'>('Zero Dep');
  const [insuranceValidity, setInsuranceValidity] = useState('December 2026');
  const [serviceHistory, setServiceHistory] = useState<'Full Authorized Service History' | 'Partial Service History' | 'Dealer Maintained'>('Full Authorized Service History');
  const [description, setDescription] = useState(
    'Meticulously driven single-owner luxury vehicle. 100% authorized service records, zero accidental history, brand new tyres, and ceramic coating.'
  );

  // Step 3: Photos
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&auto=format&fit=crop&q=85',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85'
  ]);
  const [customImageUrl, setCustomImageUrl] = useState('');

  // Step 4: Pricing
  const [askingPrice, setAskingPrice] = useState<number>(4350000);
  const marketGuidance = calculateMarketEstimate(
    ['BMW', 'Mercedes-Benz', 'Audi'].includes(make) ? 5500000 : 2500000,
    year,
    kmDriven,
    make
  );

  // Step 6: Plan & Payment
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'annual_pro'>('annual_pro');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('yashraj@okaxis');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [publishedVehicleId, setPublishedVehicleId] = useState<string>('');

  const steps = [
    { num: 1, label: 'Vehicle' },
    { num: 2, label: 'Details' },
    { num: 3, label: 'Photos' },
    { num: 4, label: 'Pricing' },
    { num: 5, label: 'Review' },
    { num: 6, label: 'Payment' },
    { num: 7, label: 'Published' }
  ];

  const handleAddSampleImage = (url: string) => {
    if (!images.includes(url)) {
      setImages((prev) => [...prev, url]);
    }
  };

  const handleAddCustomPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setImages((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
      showToast('Photo added to gallery', 'success');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCompletePublish = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const created = addNewVehicle({
        make,
        model,
        variant,
        year,
        price: askingPrice,
        kmDriven,
        fuel,
        transmission,
        ownership,
        category,
        color,
        city,
        state,
        rtoCode,
        insuranceType,
        insuranceValidity,
        serviceHistory,
        description,
        images,
        planType: selectedPlan
      });
      setPublishedVehicleId(created.id);
      setIsProcessingPayment(false);
      setCurrentStep(7);
      showToast('Vehicle listed and published live on CarForSell!', 'success');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold text-[#E4C766] bg-[#07111F] px-3.5 py-1 rounded-full border border-[#C9A227]/40 shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multi-Step Vehicle Listing Wizard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07111F]">
          Sell Your Vehicle on CarForSell
        </h1>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Complete the details below to publish your listing to verified buyers across India.
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[550px] gap-2">
          {steps.map((s, idx) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-[#16845B] text-white'
                        : isCurrent
                        ? 'bg-[#07111F] text-[#E4C766] ring-2 ring-[#C9A227]'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : `0${s.num}`}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isCurrent ? 'text-[#07111F]' : isDone ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 ${
                      currentStep > s.num ? 'bg-[#16845B]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Wizard Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-xl">
        
        {/* STEP 1: VEHICLE TYPE & MODEL */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#07111F]">Step 1 — Choose Vehicle Category & Make</h2>
              <p className="text-xs text-gray-500">Select the vehicle archetype and registration specifications.</p>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Select Vehicle Body / Class
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['Luxury Car', 'SUV', 'Car', 'Electric & Hybrid', 'Bike', 'Commercial'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                      category === cat
                        ? 'bg-[#07111F] text-white border-[#C9A227] shadow-md'
                        : 'bg-[#F7F7F5] text-gray-700 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{cat}</span>
                    {category === cat && <Check className="w-4 h-4 text-[#E4C766]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand, Model, Variant, Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Brand / Make</label>
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 focus:border-[#C9A227] text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  {sampleBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Model Name</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. 3 Series, C-Class, Fortuner, Scorpio-N"
                  className="w-full bg-[#F7F7F5] border border-gray-300 focus:border-[#C9A227] text-[#101828] font-semibold rounded-xl p-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Variant / Trim</label>
                <input
                  type="text"
                  value={variant}
                  onChange={(e) => setVariant(e.target.value)}
                  placeholder="e.g. 330i M Sport, Z8L 4x4, Progressive"
                  className="w-full bg-[#F7F7F5] border border-gray-300 focus:border-[#C9A227] text-[#101828] font-semibold rounded-xl p-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Registration Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full bg-[#F7F7F5] border border-gray-300 focus:border-[#C9A227] text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="bg-[#07111F] hover:bg-[#111827] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all"
              >
                <span>Continue to Step 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: TECHNICAL DETAILS */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#07111F]">Step 2 — Vehicle Specifications & Location</h2>
              <p className="text-xs text-gray-500">Provide accurate condition details for maximum buyer trust.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Fuel */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Fuel Type</label>
                <select
                  value={fuel}
                  onChange={(e) => setFuel(e.target.value as any)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                  <option>CNG</option>
                </select>
              </div>

              {/* Transmission */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Transmission</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as any)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>

              {/* KM Driven */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Kilometers Driven</label>
                <input
                  type="number"
                  value={kmDriven}
                  onChange={(e) => setKmDriven(Number(e.target.value))}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                />
              </div>

              {/* Ownership */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Ownership Count</label>
                <select
                  value={ownership}
                  onChange={(e) => setOwnership(e.target.value as any)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  <option>1st Owner</option>
                  <option>2nd Owner</option>
                  <option>3rd Owner</option>
                  <option>4th+ Owner</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Location City</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  {sampleCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* RTO Code */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Registration RTO</label>
                <input
                  type="text"
                  value={rtoCode}
                  onChange={(e) => setRtoCode(e.target.value)}
                  placeholder="e.g. MH-15 (Nashik), MH-02 (Mumbai)"
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Exterior Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                />
              </div>

              {/* Insurance */}
              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Insurance Status</label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value as any)}
                  className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-semibold rounded-xl p-3 outline-none"
                >
                  <option>Zero Dep</option>
                  <option>Comprehensive</option>
                  <option>Third Party</option>
                  <option>Expired</option>
                </select>
              </div>

            </div>

            {/* Description */}
            <div className="text-xs">
              <label className="block font-bold text-gray-700 mb-1.5">Detailed Seller Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#F7F7F5] border border-gray-300 text-[#101828] font-medium rounded-xl p-3 outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-gray-500 hover:text-black font-semibold text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="bg-[#07111F] hover:bg-[#111827] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <span>Upload Photos</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: UPLOAD PHOTOS */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#07111F]">Step 3 — Upload Vehicle Photos</h2>
              <p className="text-xs text-gray-500">
                High-quality photos increase buyer inquiries by up to 300%. Please include Front, Rear, Side, Interior and Dashboard angles.
              </p>
            </div>

            {/* Required Shots Indicators */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              {['Front 3/4', 'Rear 3/4', 'Side Profile', 'Interior Cockpit', 'Dashboard & ODO', 'Engine Bay'].map((shot, idx) => (
                <span key={shot} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#16845B]" />
                  {shot}
                </span>
              ))}
            </div>

            {/* Photo Grid Preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {images.map((url, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group">
                  <img src={url} alt={`Car photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors opacity-90"
                    title="Remove Photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-black/60 text-white px-2 py-0.5 rounded">
                    Photo #{i + 1}
                  </span>
                </div>
              ))}

              {/* Upload Box */}
              <div className="aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-[#C9A227] bg-[#F7F7F5] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors">
                <Camera className="w-6 h-6 text-gray-400 mb-1" />
                <span className="text-[11px] font-bold text-gray-700">+ Add Photos</span>
                <span className="text-[9px] text-gray-400">PNG, JPG up to 15MB</span>
              </div>
            </div>

            {/* Add Custom / URL Form */}
            <form onSubmit={handleAddCustomPhoto} className="flex gap-2">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Or paste an image URL here..."
                className="flex-1 bg-[#F7F7F5] border border-gray-300 text-xs rounded-xl px-3 py-2 outline-none"
              />
              <button
                type="submit"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold px-4 py-2 rounded-xl"
              >
                Add Image
              </button>
            </form>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="text-gray-500 hover:text-black font-semibold text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="bg-[#07111F] hover:bg-[#111827] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <span>Pricing Guidance</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: PRICING & MARKET GUIDANCE */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#07111F]">Step 4 — Set Asking Price & Market Guidance</h2>
              <p className="text-xs text-gray-500">
                Competitive pricing can help your vehicle receive more enquiries and faster deals.
              </p>
            </div>

            {/* Market Estimate Box */}
            <div className="bg-[#07111F] text-white p-6 rounded-2xl border border-[#C9A227]/40 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E4C766]">
                <Sparkles className="w-4 h-4" />
                <span>Real-Time Market Estimate</span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(marketGuidance.fair)}
                  </div>
                  <div className="text-xs text-gray-400">
                    Typical selling window: {formatPrice(marketGuidance.min)} — {formatPrice(marketGuidance.max)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">Market Demand</span>
                  <span className="block text-xs font-bold text-emerald-400">HIGH DEMAND</span>
                </div>
              </div>
            </div>

            {/* Asking Price Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Your Asking Price (in ₹ INR)
              </label>
              <div className="flex items-center bg-[#F7F7F5] border border-gray-300 focus-within:border-[#C9A227] rounded-xl px-4 py-3">
                <span className="text-base font-extrabold text-gray-500 pr-2">₹</span>
                <input
                  type="number"
                  value={askingPrice}
                  onChange={(e) => setAskingPrice(Number(e.target.value))}
                  className="bg-transparent flex-1 text-lg font-black text-[#07111F] outline-none"
                />
                <span className="text-sm font-bold text-[#C9A227]">
                  {formatPrice(askingPrice)}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                “Competitive pricing can help your vehicle receive more enquiries.”
              </p>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="text-gray-500 hover:text-black font-semibold text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="bg-[#07111F] hover:bg-[#111827] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
              >
                <span>Review Listing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW LISTING */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-lg font-bold text-[#07111F]">Step 5 — Preview Your Final Listing</h2>
              <p className="text-xs text-gray-500">Confirm all details before selecting your publication plan.</p>
            </div>

            {/* Live Preview Card */}
            <div className="bg-[#F7F7F5] rounded-2xl p-5 border border-gray-200 flex flex-col md:flex-row gap-5">
              <img
                src={images[0]}
                alt={model}
                className="w-full md:w-60 h-40 object-cover rounded-xl border border-gray-200"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-[#07111F] text-[#E4C766] text-[10px] font-bold px-2 py-0.5 rounded">
                    VERIFIED DRAFT
                  </span>
                  <span className="text-xs text-gray-500">{city}, {state}</span>
                </div>

                <h3 className="text-lg font-bold text-[#07111F]">
                  {year} {make} {model} <span className="text-sm font-normal text-gray-600">{variant}</span>
                </h3>

                <div className="text-2xl font-black text-[#07111F]">
                  {formatPrice(askingPrice)}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-700 pt-1">
                  <div><strong>KM:</strong> {kmDriven.toLocaleString('en-IN')} km</div>
                  <div><strong>Fuel:</strong> {fuel}</div>
                  <div><strong>Gear:</strong> {transmission}</div>
                  <div><strong>Owner:</strong> {ownership}</div>
                  <div><strong>RTO:</strong> {rtoCode}</div>
                  <div><strong>Insurance:</strong> {insuranceType}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="text-gray-500 hover:text-black font-semibold text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(6)}
                className="bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold px-7 py-3.5 rounded-xl text-sm shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center gap-2"
              >
                <span>Proceed to Choose Plan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: PAYMENT & PLAN SELECTION */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold text-[#07111F]">
                Step 6 — Choose Your Selling Plan & Checkout
              </h2>
              <p className="text-xs text-gray-500">
                Transparent seller pricing with zero buyer commission.
              </p>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Single Listing */}
              <div
                onClick={() => setSelectedPlan('single')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlan === 'single'
                    ? 'border-[#07111F] bg-[#F7F7F5] shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Single Listing</span>
                  {selectedPlan === 'single' && <CheckCircle2 className="w-5 h-5 text-[#07111F]" />}
                </div>
                <div className="text-2xl font-black text-[#07111F]">
                  ₹1,200
                </div>
                <ul className="space-y-2 mt-4 text-xs text-gray-700">
                  <li className="flex items-center gap-2">✓ 1 Vehicle Listing</li>
                  <li className="flex items-center gap-2">✓ Listing management & lead CRM</li>
                  <li className="flex items-center gap-2">✓ Direct buyer enquiries & calls</li>
                </ul>
              </div>

              {/* Annual Pro */}
              <div
                onClick={() => setSelectedPlan('annual_pro')}
                className={`p-5 rounded-2xl border-2 cursor-pointer relative transition-all ${
                  selectedPlan === 'annual_pro'
                    ? 'border-[#C9A227] bg-[#07111F] text-white shadow-xl'
                    : 'border-gray-200 hover:border-[#C9A227]/40'
                }`}
              >
                <div className="absolute -top-3 right-4 bg-[#C9A227] text-[#07111F] text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  BEST VALUE
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold uppercase ${selectedPlan === 'annual_pro' ? 'text-[#E4C766]' : 'text-gray-600'}`}>
                    Annual Pro Seller
                  </span>
                  {selectedPlan === 'annual_pro' && <CheckCircle2 className="w-5 h-5 text-[#E4C766]" />}
                </div>
                <div className={`text-2xl font-black ${selectedPlan === 'annual_pro' ? 'text-white' : 'text-[#07111F]'}`}>
                  ₹7,000 <span className="text-xs font-normal text-gray-400">/ year</span>
                </div>
                <ul className={`space-y-2 mt-4 text-xs ${selectedPlan === 'annual_pro' ? 'text-gray-200' : 'text-gray-700'}`}>
                  <li className="flex items-center gap-2">✓ Unlimited vehicle listings</li>
                  <li className="flex items-center gap-2">✓ Priority placement in search</li>
                  <li className="flex items-center gap-2">✓ Verified dealer profile & analytics</li>
                  <li className="flex items-center gap-2">✓ WhatsApp lead notifications</li>
                </ul>
              </div>

            </div>

            {/* Payment Method Selector */}
            <div className="p-5 bg-[#F7F7F5] rounded-2xl border border-gray-200 space-y-4">
              <span className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Select Payment Method
              </span>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-white border-[#C9A227] text-[#07111F] shadow-sm'
                      : 'bg-transparent border-gray-300 text-gray-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#C9A227]" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-white border-[#C9A227] text-[#07111F] shadow-sm'
                      : 'bg-transparent border-gray-300 text-gray-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#C9A227]" />
                  <span>Credit/Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 font-semibold transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-white border-[#C9A227] text-[#07111F] shadow-sm'
                      : 'bg-transparent border-gray-300 text-gray-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Net Banking</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="text-xs space-y-2">
                  <label className="block text-gray-600 font-semibold">Enter UPI ID (Google Pay / PhonePe / Paytm)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-xl p-2.5 outline-none font-medium"
                  />
                </div>
              )}
            </div>

            {/* Total & Checkout Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500 block">Total Payable Amount:</span>
                <span className="text-2xl font-black text-[#07111F]">
                  {selectedPlan === 'single' ? '₹1,200' : '₹7,000'}
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handleCompletePublish}
                className="w-full sm:w-auto bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold px-8 py-4 rounded-xl text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <span>Securing & Authorizing Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay {selectedPlan === 'single' ? '₹1,200' : '₹7,000'} & Publish Listing</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: PUBLISHED CONFIRMATION */}
        {currentStep === 7 && (
          <div className="text-center py-8 space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-50 text-[#16845B] border-2 border-emerald-300 rounded-full flex items-center justify-center mx-auto shadow-xl">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase font-bold text-[#16845B] tracking-wider">
                Listing Successfully Activated
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#07111F]">
                Your Vehicle is Now Live on CarForSell!
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                Your <strong>{year} {make} {model}</strong> has been published to our verified buyer network. All enquiries will be forwarded to your dashboard and mobile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={() => {
                  if (publishedVehicleId) {
                    openVehicleDetail(publishedVehicleId);
                  } else {
                    setCurrentView('marketplace');
                  }
                }}
                className="w-full sm:w-auto bg-[#07111F] text-white font-bold px-6 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-[#111827]"
              >
                <Eye className="w-4 h-4 text-[#E4C766]" />
                <span>View Live Listing</span>
              </button>

              <button
                onClick={() => setCurrentView('seller_dashboard')}
                className="w-full sm:w-auto bg-[#C9A227] text-[#07111F] font-bold px-6 py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-[#E4C766]"
              >
                <span>Go to Seller Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
