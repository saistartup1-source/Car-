export type VehicleCategory = 'Car' | 'SUV' | 'Luxury Car' | 'Electric & Hybrid' | 'Commercial' | 'Bike';

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
export type TransmissionType = 'Automatic' | 'Manual';
export type OwnershipType = '1st Owner' | '2nd Owner' | '3rd Owner' | '4th+ Owner';
export type BodyType = 'Sedan' | 'SUV' | 'Hatchback' | 'Coupe' | 'Convertible' | 'MUV';
export type ListingStatus = 'Active' | 'Pending' | 'Sold' | 'Paused' | 'Rejected';

export interface VehicleImage {
  id: string;
  url: string;
  tag: 'Front' | 'Rear' | 'Side' | 'Interior' | 'Dashboard' | 'Engine' | 'Other';
}

export interface Seller {
  id: string;
  name: string;
  role: 'individual' | 'dealer';
  dealerName?: string;
  avatar: string;
  phone: string;
  email: string;
  location: string;
  memberSince: string;
  responseRate: string;
  responseTime: string;
  isVerified: boolean;
  dealerVerified?: boolean;
  totalListings: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  bio?: string;
}

export interface InspectionPoint {
  category: string;
  passed: boolean;
  details: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number; // in INR
  originalPrice?: number;
  kmDriven: number;
  fuel: FuelType;
  transmission: TransmissionType;
  ownership: OwnershipType;
  bodyType: BodyType;
  category: VehicleCategory;
  color: string;
  registrationState: string;
  rtoCode: string;
  city: string;
  state: string;
  images: string[];
  description: string;
  features: string[];
  highlights: string[];
  isVerified: boolean;
  isFeatured: boolean;
  inspectionScore: number; // e.g. 96 out of 100
  inspectionPoints?: InspectionPoint[];
  insuranceType: 'Comprehensive' | 'Zero Dep' | 'Third Party' | 'Expired';
  insuranceValidity: string;
  serviceHistory: 'Full Authorized Service History' | 'Partial Service History' | 'Dealer Maintained';
  accidentFree: boolean;
  sellerId: string;
  seller: Seller;
  status: ListingStatus;
  createdAt: string;
  viewsCount: number;
  enquiriesCount: number;
  savesCount: number;
  planType: 'single' | 'annual_pro';
}

export interface FilterState {
  searchQuery: string;
  category: string;
  make: string;
  model: string;
  bodyType: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  maxKm: number;
  fuel: string[];
  transmission: string[];
  ownership: string[];
  location: string;
  verifiedOnly: boolean;
  featuredOnly: boolean;
  sortBy: 'recommended' | 'newest' | 'price_asc' | 'price_desc' | 'km_asc' | 'year_desc';
}

export interface Enquiry {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehiclePrice: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerCity: string;
  message: string;
  offeredPrice?: number;
  status: 'new' | 'contacted' | 'negotiating' | 'closed' | 'test_drive_scheduled';
  createdAt: string;
  lastReply?: string;
  chatMessages?: {
    id: string;
    sender: 'buyer' | 'seller';
    text: string;
    timestamp: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'enquiry' | 'status' | 'system' | 'subscription' | 'price_drop';
  time: string;
  read: boolean;
  linkAction?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'buyer' | 'seller' | 'dealer' | 'admin';
  avatar: string;
  location: string;
  isVerified: boolean;
  membershipPlan: 'free' | 'single_active' | 'annual_pro';
  subscriptionExpiry?: string;
  activeListingsCount: number;
  totalEnquiries: number;
}
