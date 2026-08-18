import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const PricingView: React.FC = () => {
  const { setCurrentView } = useApp();

  const faqs = [
    {
      q: 'Are there any hidden commissions or brokerage fees when my car sells?',
      a: 'Absolutely none. You keep 100% of the sale price agreed with your buyer. CarForSell charges only the upfront listing fee or annual subscription.'
    },
    {
      q: 'How long does a Single Listing stay active?',
      a: 'A Single Listing (₹1,200) remains active for 90 days or until you mark the car as sold, whichever is sooner.'
    },
    {
      q: 'Who should purchase the Annual Pro Seller Plan?',
      a: 'The Annual Pro Plan (₹7,000/year) is designed for independent automotive dealers, fleet owners, and auto enthusiasts who sell multiple vehicles and require analytics, CRM, and verified dealership profiles.'
    },
    {
      q: 'How does the 150-Point Technical Verification work?',
      a: 'Our certified engineers review your service logs, accident history, and physical diagnostics. If your vehicle passes all tests, it is awarded the Gold Verified Badge.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E4C766] bg-[#07111F] px-3.5 py-1 rounded-full border border-[#C9A227]/40 shadow">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple, Transparent Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#07111F]">
          Sell on Your Terms. Zero Commission.
        </h1>
        <p className="text-sm text-gray-500">
          Reach thousands of serious buyers with our high-impact listing solutions.
        </p>
      </div>

      {/* Pricing Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Single Listing */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200/90 shadow-lg flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="space-y-4">
            <div className="inline-block text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
              For Individual Owners
            </div>
            <h3 className="text-2xl font-bold text-[#07111F]">Single Listing</h3>
            <div className="text-4xl font-black text-[#07111F]">
              ₹1,200 <span className="text-xs font-normal text-gray-500">/ one-time</span>
            </div>
            <p className="text-xs text-gray-500">
              List 1 vehicle and connect directly with serious retail buyers.
            </p>

            <ul className="space-y-3 pt-6 border-t border-gray-100 text-xs text-gray-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                <span>1 Live Vehicle Listing (90 days)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                <span>Direct WhatsApp & Call Enquiries</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                <span>Seller Inquiries Chat Console</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                <span>Instant Market Value Estimator</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
                <span className="font-bold text-[#07111F]">0% commission on sale</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentView('sell')}
            className="mt-8 w-full bg-[#07111F] hover:bg-[#111827] text-white font-bold py-3.5 rounded-xl text-sm transition-all"
          >
            Get Started with Single Listing
          </button>
        </div>

        {/* Annual Pro Plan */}
        <div className="bg-[#07111F] text-white rounded-3xl p-8 border-2 border-[#C9A227] shadow-2xl relative flex flex-col justify-between">
          <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
            RECOMMENDED FOR PROS
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E4C766] bg-white/5 border border-[#C9A227]/40 px-3 py-1 rounded-full">
              <Crown className="w-3.5 h-3.5 text-[#E4C766]" />
              <span>Full Dealership OS</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Annual Pro Seller</h3>
            <div className="text-4xl font-black text-white">
              ₹7,000 <span className="text-xs font-normal text-gray-400">/ year</span>
            </div>
            <p className="text-xs text-gray-300">
              Unlimited listings, priority visibility, and dedicated showroom profile.
            </p>

            <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-gray-200">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                <span className="font-bold text-white">Unlimited Vehicle Listings (365 days)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                <span>Priority Search & Category Placement</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                <span>Verified Dealer Profile Page</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                <span>Performance Analytics & Lead Management CRM</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#E4C766]" />
                <span>Gold Verification Badge & Instant WhatsApp alerts</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setCurrentView('sell')}
            className="mt-8 w-full bg-gradient-to-r from-[#E4C766] to-[#C9A227] text-[#07111F] font-extrabold py-3.5 rounded-xl text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all"
          >
            Upgrade to Annual Pro (₹7,000/yr)
          </button>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-extrabold text-[#07111F]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-gray-200 space-y-1.5">
              <h4 className="text-sm font-bold text-[#07111F] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-gray-600 pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
