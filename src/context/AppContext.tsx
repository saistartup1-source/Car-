import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Vehicle, FilterState, Enquiry, NotificationItem, UserProfile, ListingStatus } from '../types';
import { initialVehicles, mockEnquiries, mockNotifications, mockUserProfiles } from '../data/mockData';

export type AppView = 
  | 'home' 
  | 'marketplace' 
  | 'vehicle_detail' 
  | 'sell' 
  | 'seller_dashboard' 
  | 'buyer_dashboard' 
  | 'admin' 
  | 'pricing' 
  | 'how_it_works'
  | 'dealer_profile';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
  openVehicleDetail: (vehicleId: string) => void;
  vehicles: Vehicle[];
  favorites: string[];
  toggleFavorite: (vehicleId: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
  replyToEnquiry: (enquiryId: string, message: string) => void;
  updateEnquiryStatus: (enquiryId: string, status: Enquiry['status']) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadNotificationsCount: number;
  currentUser: UserProfile;
  setCurrentUserRole: (role: 'buyer' | 'seller' | 'dealer' | 'admin') => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  addNewVehicle: (vehicleData: Partial<Vehicle>) => Vehicle;
  updateVehicleStatus: (vehicleId: string, status: ListingStatus) => void;
  deleteVehicle: (vehicleId: string) => void;
  selectedDealerId: string | null;
  setSelectedDealerId: (id: string | null) => void;
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
  quickSearch: (keyword: string) => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  make: 'All',
  model: 'All',
  bodyType: 'All',
  minPrice: 0,
  maxPrice: 15000000,
  minYear: 2016,
  maxYear: 2026,
  maxKm: 150000,
  fuel: [],
  transmission: [],
  ownership: [],
  location: 'All',
  verifiedOnly: false,
  featuredOnly: false,
  sortBy: 'recommended'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>('veh_1');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>('seller_2');
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [favorites, setFavorites] = useState<string[]>(['veh_1', 'veh_5']);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(mockEnquiries);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUserProfiles.seller);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedVehicleId]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        showToast('Removed from your saved vehicles', 'info');
        return prev.filter((id) => id !== vehicleId);
      } else {
        showToast('Added to your saved vehicles', 'success');
        return [...prev, vehicleId];
      }
    });
  };

  const openVehicleDetail = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setCurrentView('vehicle_detail');
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    showToast('Search filters reset', 'info');
  };

  const quickSearch = (keyword: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: keyword
    }));
    setCurrentView('marketplace');
  };

  const addEnquiry = (newEnquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...newEnquiryData,
      id: 'enq_' + Date.now(),
      createdAt: 'Just now',
      status: 'new',
      chatMessages: [
        {
          id: 'msg_' + Date.now(),
          sender: 'buyer',
          text: newEnquiryData.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Enquiry sent to seller successfully!', 'success');

    // Notify seller
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: 'New Vehicle Enquiry',
      message: `${newEnquiryData.buyerName} enquired about ${newEnquiryData.vehicleName}`,
      type: 'enquiry',
      time: 'Just now',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const replyToEnquiry = (enquiryId: string, replyText: string) => {
    setEnquiries((prev) =>
      prev.map((item) => {
        if (item.id === enquiryId) {
          const currentChats = item.chatMessages || [];
          return {
            ...item,
            lastReply: 'Just now',
            status: item.status === 'new' ? 'contacted' : item.status,
            chatMessages: [
              ...currentChats,
              {
                id: 'msg_' + Date.now(),
                sender: 'seller',
                text: replyText,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return item;
      })
    );
    showToast('Reply sent to buyer', 'success');
  };

  const updateEnquiryStatus = (enquiryId: string, status: Enquiry['status']) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === enquiryId ? { ...item, status } : item))
    );
    showToast(`Status updated to ${status.replace('_', ' ')}`, 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const setCurrentUserRole = (role: 'buyer' | 'seller' | 'dealer' | 'admin') => {
    setCurrentUser(mockUserProfiles[role]);
    showToast(`Switched workspace role to: ${role.toUpperCase()}`, 'info');
    if (role === 'admin') {
      setCurrentView('admin');
    } else if (role === 'seller' || role === 'dealer') {
      setCurrentView('seller_dashboard');
    } else {
      setCurrentView('home');
    }
  };

  const addNewVehicle = (vehicleData: Partial<Vehicle>): Vehicle => {
    const newId = 'veh_' + Date.now();
    const newVehicle: Vehicle = {
      id: newId,
      make: vehicleData.make || 'BMW',
      model: vehicleData.model || '3 Series',
      variant: vehicleData.variant || 'Standard',
      year: vehicleData.year || 2023,
      price: vehicleData.price || 3500000,
      originalPrice: (vehicleData.price || 3500000) * 1.05,
      kmDriven: vehicleData.kmDriven || 25000,
      fuel: vehicleData.fuel || 'Petrol',
      transmission: vehicleData.transmission || 'Automatic',
      ownership: vehicleData.ownership || '1st Owner',
      bodyType: vehicleData.bodyType || 'Sedan',
      category: vehicleData.category || 'Luxury Car',
      color: vehicleData.color || 'Alpine White',
      registrationState: vehicleData.registrationState || 'Maharashtra',
      rtoCode: vehicleData.rtoCode || 'MH-15 (Nashik)',
      city: vehicleData.city || 'Nashik',
      state: vehicleData.state || 'Maharashtra',
      images: vehicleData.images && vehicleData.images.length > 0 ? vehicleData.images : [
        'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=85',
        'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=85'
      ],
      description: vehicleData.description || 'Pristine vehicle in immaculate condition with full service history.',
      features: vehicleData.features || [
        'Automatic Climate Control',
        'Touchscreen Infotainment with Apple CarPlay',
        'Cruise Control & Reverse Camera',
        'Leather Upholstery & Sunroof'
      ],
      highlights: vehicleData.highlights || [
        'Single owner driven with authorized service records',
        'Zero accidental history with clear documentation',
        'Valid insurance and clean RTO transfer status'
      ],
      isVerified: true,
      isFeatured: vehicleData.planType === 'annual_pro',
      inspectionScore: 97,
      insuranceType: vehicleData.insuranceType || 'Comprehensive',
      insuranceValidity: vehicleData.insuranceValidity || 'Valid for 1 Year',
      serviceHistory: vehicleData.serviceHistory || 'Full Authorized Service History',
      accidentFree: true,
      sellerId: currentUser.id,
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role === 'dealer' ? 'dealer' : 'individual',
        avatar: currentUser.avatar,
        phone: currentUser.phone,
        email: currentUser.email,
        location: currentUser.location,
        memberSince: 'August 2026',
        responseRate: '100%',
        responseTime: '< 10 mins',
        isVerified: true,
        totalListings: (currentUser.activeListingsCount || 0) + 1,
        soldCount: 4,
        rating: 4.9,
        reviewCount: 18
      },
      status: 'Active',
      createdAt: 'Just now',
      viewsCount: 1,
      enquiriesCount: 0,
      savesCount: 0,
      planType: vehicleData.planType || 'single'
    };

    setVehicles((prev) => [newVehicle, ...prev]);
    return newVehicle;
  };

  const updateVehicleStatus = (vehicleId: string, status: ListingStatus) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === vehicleId ? { ...v, status } : v))
    );
    showToast(`Listing status updated to ${status}`, 'info');
  };

  const deleteVehicle = (vehicleId: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
    showToast('Listing removed successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedVehicleId,
        setSelectedVehicleId,
        openVehicleDetail,
        vehicles,
        favorites,
        toggleFavorite,
        filters,
        setFilters,
        resetFilters,
        enquiries,
        addEnquiry,
        replyToEnquiry,
        updateEnquiryStatus,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount,
        currentUser,
        setCurrentUserRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        toasts,
        showToast,
        removeToast,
        addNewVehicle,
        updateVehicleStatus,
        deleteVehicle,
        selectedDealerId,
        setSelectedDealerId,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        quickSearch
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
