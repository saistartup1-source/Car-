import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { ToastContainer } from './components/ToastContainer';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { MarketplaceView } from './views/MarketplaceView';
import { VehicleDetailView } from './views/VehicleDetailView';
import { SellWizardView } from './views/SellWizardView';
import { SellerDashboardView } from './views/SellerDashboardView';
import { BuyerDashboardView } from './views/BuyerDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PricingView } from './views/PricingView';
import { DealerProfileView } from './views/DealerProfileView';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <main className="flex-1 pb-20 md:pb-12">
      {currentView === 'home' && <HomeView />}
      {currentView === 'marketplace' && <MarketplaceView />}
      {currentView === 'vehicle_detail' && <VehicleDetailView />}
      {currentView === 'sell' && <SellWizardView />}
      {currentView === 'seller_dashboard' && <SellerDashboardView />}
      {currentView === 'buyer_dashboard' && <BuyerDashboardView />}
      {(currentView === 'admin' || currentView === 'admin_dashboard') && <AdminDashboardView />}
      {currentView === 'pricing' && <PricingView />}
      {currentView === 'dealer_profile' && <DealerProfileView />}
      {currentView === 'how_it_works' && <PricingView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#F7F7F5] text-[#07111F] antialiased selection:bg-[#C9A227]/30 selection:text-[#07111F]">
        <Header />
        <MainContent />
        <Footer />
        <MobileNav />
        <ToastContainer />
        <AuthModal />
      </div>
    </AppProvider>
  );
}

