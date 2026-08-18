import { Vehicle, Seller, Enquiry, NotificationItem, UserProfile } from '../types';

export const mockSellers: Record<string, Seller> = {
  seller_1: {
    id: 'seller_1',
    name: 'Yashraj Deshmukh',
    role: 'individual',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98230 44129',
    email: 'yashraj.deshmukh@automotive.in',
    location: 'Nashik, Maharashtra',
    memberSince: 'March 2023',
    responseRate: '98%',
    responseTime: '< 15 mins',
    isVerified: true,
    totalListings: 2,
    soldCount: 3,
    rating: 4.9,
    reviewCount: 24,
    bio: 'Automotive enthusiast & verified private seller. All vehicles meticulously serviced at authorized brand service centers.'
  },
  seller_2: {
    id: 'seller_2',
    name: 'Royal Heritage Auto Gallery',
    role: 'dealer',
    dealerName: 'Royal Heritage Auto Gallery',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98201 88720',
    email: 'contact@royalheritagecars.in',
    location: 'Bandra West, Mumbai',
    memberSince: 'January 2022',
    responseRate: '99%',
    responseTime: '< 5 mins',
    isVerified: true,
    dealerVerified: true,
    totalListings: 18,
    soldCount: 142,
    rating: 4.95,
    reviewCount: 186,
    bio: 'Premier luxury pre-owned showroom in Mumbai. Complete 150-point technical check and guaranteed non-accidental certifications.'
  },
  seller_3: {
    id: 'seller_3',
    name: 'Vikramaditya Singhania',
    role: 'individual',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 99801 12390',
    email: 'vikram.singhania@techcorp.com',
    location: 'Indiranagar, Bengaluru',
    memberSince: 'August 2023',
    responseRate: '95%',
    responseTime: '< 30 mins',
    isVerified: true,
    totalListings: 1,
    soldCount: 2,
    rating: 4.8,
    reviewCount: 12,
    bio: 'First owner tech executive selling personal flagship SUV for an upgrade. Fully ceramic coated.'
  },
  seller_4: {
    id: 'seller_4',
    name: 'Apex Precision Motors',
    role: 'dealer',
    dealerName: 'Apex Precision Motors',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98110 55432',
    email: 'sales@apexmotorsdelhi.com',
    location: 'Golf Course Road, Gurugram (NCR)',
    memberSince: 'November 2021',
    responseRate: '97%',
    responseTime: '< 10 mins',
    isVerified: true,
    dealerVerified: true,
    totalListings: 24,
    soldCount: 210,
    rating: 4.9,
    reviewCount: 312,
    bio: 'Curated selection of German luxury sedans and premium SUVs. Direct transfer documentation support provided.'
  }
};

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh_1',
    make: 'BMW',
    model: '3 Series',
    variant: '330i M Sport',
    year: 2022,
    price: 4250000, // ₹42.50 Lakh
    originalPrice: 4400000,
    kmDriven: 32000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'Sedan',
    category: 'Luxury Car',
    color: 'Mineral Grey Metallic',
    registrationState: 'Maharashtra',
    rtoCode: 'MH-15 (Nashik)',
    city: 'Nashik',
    state: 'Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Immaculately maintained BMW 330i M Sport finished in Mineral Grey Metallic with Cognac Vernasca Leather interior. Driven only 32,000 kms with 100% authorized BMW Infinity Cars service records. Equipped with M Sport aerodynamic package, 18-inch M light alloy wheels, Harman Kardon surround audio, wireless Apple CarPlay, ambient interior lighting, and gesture controls. Ceramic coated with 3M PPF on critical impact zones.',
    features: [
      'Harman Kardon 16-Speaker Surround Sound',
      'M Sport Aerodynamics & Steering Wheel',
      'Wireless Apple CarPlay & Android Auto',
      'Adaptive LED Headlights with BMW Laserlight',
      'Panoramic Electric Glass Sunroof',
      '3-Zone Automatic Climate Control',
      'Park Assistant Plus with 360 Camera',
      'Variable Sport Steering & Launch Control'
    ],
    highlights: [
      'Single owner driven with full BMW service history',
      'Zero-depreciation insurance valid till Dec 2026',
      '100% original paint with no structural damage or scratches',
      'Brand new Michelin Pilot Sport 4 tyres fitted 3,000 km ago',
      'Both original remote smart keys and display key included'
    ],
    isVerified: true,
    isFeatured: true,
    inspectionScore: 98,
    inspectionPoints: [
      { category: 'Engine & Transmission', passed: true, details: 'Pristine twin-power turbo compression, flawless 8-speed ZF shifting' },
      { category: 'Chassis & Structural Integrity', passed: true, details: 'Zero chassis deformation or panel repainting detected' },
      { category: 'Electricals & Infotainment', passed: true, details: 'All electronic modules, iDrive 7.0 and sensors 100% operational' },
      { category: 'Suspension & Braking', passed: true, details: 'M Sport adaptive dampers and M compound brakes at 88% life' },
      { category: 'Documentation & Title', passed: true, details: 'Clear title, active NOC, valid pollution certificate and zero challans' }
    ],
    insuranceType: 'Zero Dep',
    insuranceValidity: 'December 2026',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_1',
    seller: mockSellers.seller_1,
    status: 'Active',
    createdAt: '2026-08-10',
    viewsCount: 1420,
    enquiriesCount: 28,
    savesCount: 84,
    planType: 'annual_pro'
  },
  {
    id: 'veh_2',
    make: 'Mercedes-Benz',
    model: 'C-Class',
    variant: 'C220d Progressive',
    year: 2023,
    price: 5490000, // ₹54.90 Lakh
    originalPrice: 5650000,
    kmDriven: 18500,
    fuel: 'Diesel',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'Sedan',
    category: 'Luxury Car',
    color: 'Selenite Grey Metallic',
    registrationState: 'Maharashtra',
    rtoCode: 'MH-02 (Mumbai West)',
    city: 'Mumbai',
    state: 'Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Latest generation W206 Mercedes-Benz C220d in pristine showroom condition. Powered by the efficient 2.0L diesel engine with 48V mild hybrid technology producing 200 hp. Features the S-Class inspired vertical 11.9-inch central touchscreen, 64-color active ambient lighting, Burmester 3D sound, and panoramic sunroof.',
    features: [
      '11.9-inch Portrait MBUX Display with Fingerprint Scanner',
      'Burmester 3D Surround Sound System',
      'Active Brake Assist & Attention Assist',
      '64-Color Ambient Lighting with Projection',
      'Digital LED Headlamps with Adaptive Highbeam',
      'Nappa Leather Multi-function Steering Wheel'
    ],
    highlights: [
      'Only 18,500 km driven under Mercedes Service Package',
      'Under Mercedes-Benz factory warranty until mid 2027',
      'Zero-depreciation bumper to bumper insurance',
      'Clean transfer documentation with single corporate owner'
    ],
    isVerified: true,
    isFeatured: true,
    inspectionScore: 99,
    insuranceType: 'Zero Dep',
    insuranceValidity: 'July 2027',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_2',
    seller: mockSellers.seller_2,
    status: 'Active',
    createdAt: '2026-08-12',
    viewsCount: 2180,
    enquiriesCount: 42,
    savesCount: 119,
    planType: 'annual_pro'
  },
  {
    id: 'veh_3',
    make: 'Toyota',
    model: 'Fortuner',
    variant: 'Legender 4x4 AT',
    year: 2023,
    price: 4380000, // ₹43.80 Lakh
    originalPrice: 4500000,
    kmDriven: 26000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'SUV',
    category: 'SUV',
    color: 'White Pearl Crystal Shine & Black Roof',
    registrationState: 'Karnataka',
    rtoCode: 'KA-01 (Bangalore Central)',
    city: 'Bengaluru',
    state: 'Karnataka',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Toyota Fortuner Legender 4x4 Diesel Automatic. The benchmark of reliability and dominant road presence. Dual-tone exterior with split quad-LED headlights, sequential turn indicators, ventilated leather seats, JBL 11-speaker sound system, wireless charger, and electronic diff lock for rugged terrain.',
    features: [
      '4x4 with High & Low Range + Auto LSD',
      'Quad-LED Headlamps with Waterfall DRLs',
      'Ventilated Front Seats with 8-Way Power Adjustment',
      'JBL Premium 11-Speaker Audio with Subwoofer',
      'Kick-Sensor Powered Tailgate'
    ],
    highlights: [
      'Bulletproof Toyota D-4D diesel engine (500 Nm torque)',
      '100% Toyota Lanson service record maintained',
      'Unmatched resale value retention in Indian market',
      'Clean non-smoker interior, zero off-road abuse'
    ],
    isVerified: true,
    isFeatured: true,
    inspectionScore: 97,
    insuranceType: 'Comprehensive',
    insuranceValidity: 'October 2026',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_3',
    seller: mockSellers.seller_3,
    status: 'Active',
    createdAt: '2026-08-08',
    viewsCount: 3100,
    enquiriesCount: 64,
    savesCount: 182,
    planType: 'annual_pro'
  },
  {
    id: 'veh_4',
    make: 'Mahindra',
    model: 'Scorpio-N',
    variant: 'Z8L 4x4 Diesel AT',
    year: 2023,
    price: 2325000, // ₹23.25 Lakh
    originalPrice: 2450000,
    kmDriven: 21000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'SUV',
    category: 'SUV',
    color: 'Deep Forest Green',
    registrationState: 'Maharashtra',
    rtoCode: 'MH-12 (Pune)',
    city: 'Pune',
    state: 'Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Top-of-the-line Scorpio-N Z8 Luxury 4XPLOR Automatic. Powered by mHawk 2.2L diesel engine (175 PS). Features 12-speaker Sony 3D Immersive audio, coffee black leatherette interior, electric sunroof, dual zone climate control, and AdrenoX connected car suite.',
    features: [
      '4XPLOR Intelligent Terrain Management System',
      'Sony 12-Speaker Immersive Audio with Subwoofer',
      'Wireless Apple CarPlay & Android Auto',
      'Dual Zone FATC with Rear AC vents',
      'Front & Rear Parking Camera with Sensors'
    ],
    highlights: [
      'Single hand driven by corporate executive in Pune',
      'Extended 5-year Mahindra warranty active',
      'Full ceramic coating done with 3-year warranty'
    ],
    isVerified: true,
    isFeatured: false,
    inspectionScore: 96,
    insuranceType: 'Zero Dep',
    insuranceValidity: 'March 2027',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_1',
    seller: mockSellers.seller_1,
    status: 'Active',
    createdAt: '2026-08-11',
    viewsCount: 1890,
    enquiriesCount: 39,
    savesCount: 95,
    planType: 'single'
  },
  {
    id: 'veh_5',
    make: 'Porsche',
    model: 'Macan',
    variant: 'GTS 2.9L Twin-Turbo',
    year: 2022,
    price: 9200000, // ₹92.00 Lakh
    originalPrice: 9500000,
    kmDriven: 14000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'SUV',
    category: 'Luxury Car',
    color: 'Carmine Red',
    registrationState: 'Delhi',
    rtoCode: 'DL-01 (Delhi Central)',
    city: 'Delhi NCR',
    state: 'Delhi',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Breathtaking Porsche Macan GTS in signature Carmine Red. 434 bhp V6 Twin-Turbo producing 550 Nm of torque with 0-100 km/h in 4.3 seconds. Equipped with Sport Chrono package, Porsche Active Suspension Management (PASM), Sports Exhaust System with black tailpipes, and 21-inch RS Spyder Design wheels.',
    features: [
      'Sport Chrono Package with Mode Switch',
      'Adaptive Air Suspension with PASM',
      'Sports Exhaust with Dual Twin Tailpipes',
      'BOSE High-End Surround Sound System',
      '18-Way Adaptive Sports Seats with Memory'
    ],
    highlights: [
      'Complete Porsche Approved Warranty & Service History',
      'Full body self-healing XPEL Paint Protection Film (PPF)',
      'Driven only on VIP expressway corridors in Delhi NCR'
    ],
    isVerified: true,
    isFeatured: true,
    inspectionScore: 99,
    insuranceType: 'Zero Dep',
    insuranceValidity: 'November 2026',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_4',
    seller: mockSellers.seller_4,
    status: 'Active',
    createdAt: '2026-08-14',
    viewsCount: 4520,
    enquiriesCount: 52,
    savesCount: 240,
    planType: 'annual_pro'
  },
  {
    id: 'veh_6',
    make: 'Audi',
    model: 'A4',
    variant: '40 TFSI Technology',
    year: 2022,
    price: 3680000, // ₹36.80 Lakh
    originalPrice: 3800000,
    kmDriven: 29000,
    fuel: 'Petrol',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'Sedan',
    category: 'Luxury Car',
    color: 'Ibis White',
    registrationState: 'Maharashtra',
    rtoCode: 'MH-01 (Mumbai South)',
    city: 'Mumbai',
    state: 'Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'Audi A4 40 TFSI in top-spec Technology trim. Powered by 2.0L TFSI engine generating 190 hp with 7-speed S tronic dual-clutch transmission. Features Audi Virtual Cockpit Plus, MMI Touch with navigation, Bang & Olufsen 3D Sound, wireless phone charger, and Piano Black inlays.',
    features: [
      'Audi Virtual Cockpit Plus (12.3-inch Full HD Display)',
      'Bang & Olufsen 3D Sound System with 19 Speakers',
      'Comfort Key with Sensor Controlled Luggage Release',
      'Park Assist with Parking System Plus',
      'Matrix LED Headlamps with Dynamic Turn Signals'
    ],
    highlights: [
      'Single owner vehicle serviced exclusively at Audi Mumbai South',
      'Comprehensive insurance valid with roadside assistance',
      'Impeccable interior with zero wear and tear on leather'
    ],
    isVerified: true,
    isFeatured: false,
    inspectionScore: 97,
    insuranceType: 'Comprehensive',
    insuranceValidity: 'August 2026',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_2',
    seller: mockSellers.seller_2,
    status: 'Active',
    createdAt: '2026-08-09',
    viewsCount: 1650,
    enquiriesCount: 22,
    savesCount: 68,
    planType: 'annual_pro'
  },
  {
    id: 'veh_7',
    make: 'Hyundai',
    model: 'Ioniq 5',
    variant: 'Long Range RWD',
    year: 2023,
    price: 3950000, // ₹39.50 Lakh
    originalPrice: 4200000,
    kmDriven: 16000,
    fuel: 'Electric',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'SUV',
    category: 'Electric & Hybrid',
    color: 'Gravity Gold Matte',
    registrationState: 'Telangana',
    rtoCode: 'TS-09 (Hyderabad)',
    city: 'Hyderabad',
    state: 'Telangana',
    images: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'World Car of the Year Hyundai Ioniq 5 in rare factory Gravity Gold Matte. 72.6 kWh battery pack providing 631 km ARAI certified range with 800V ultra-fast charging (10% to 80% in 18 minutes). Futuristic lounge interior with sliding center console and Level 2 ADAS suite.',
    features: [
      '800V Ultra-Fast Charging Architecture (Up to 350 kW)',
      'Hyundai SmartSense Level 2 ADAS with 21 Features',
      'Vehicle-to-Load (V2L) Inside and Outside Power Outlet',
      'Bose Premium 8-Speaker Sound System',
      'Universal Island Sliding Console & Relaxation Comfort Seats'
    ],
    highlights: [
      'Battery health verified at 99.4% through Hyundai diagnostic tool',
      'Comes with 11 kW home wallbox charger and installation kit',
      '8 Years / 1,60,000 km battery warranty transferrable'
    ],
    isVerified: true,
    isFeatured: true,
    inspectionScore: 98,
    insuranceType: 'Zero Dep',
    insuranceValidity: 'January 2027',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_3',
    seller: mockSellers.seller_3,
    status: 'Active',
    createdAt: '2026-08-13',
    viewsCount: 2890,
    enquiriesCount: 45,
    savesCount: 130,
    planType: 'annual_pro'
  },
  {
    id: 'veh_8',
    make: 'Tata',
    model: 'Harrier',
    variant: 'Fearless Plus Dark Edition AT',
    year: 2024,
    price: 2480000, // ₹24.80 Lakh
    originalPrice: 2600000,
    kmDriven: 11000,
    fuel: 'Diesel',
    transmission: 'Automatic',
    ownership: '1st Owner',
    bodyType: 'SUV',
    category: 'SUV',
    color: 'Oberon Black Dark Edition',
    registrationState: 'Maharashtra',
    rtoCode: 'MH-15 (Nashik)',
    city: 'Nashik',
    state: 'Maharashtra',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200&auto=format&fit=crop&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&auto=format&fit=crop&q=85'
    ],
    description: 'New Generation Facelift Tata Harrier Fearless Plus Dark Edition. 2.0L Kryotec Turbo Diesel engine with 6-speed automatic gearbox. 5-Star Bharat NCAP safety rating. Features 12.3-inch cinematic touchscreen, JBL 10-speaker audio with subwoofer, ADAS Level 2, and gesture tailgate.',
    features: [
      '12.3-inch Ultra-HD Harman Touchscreen with Wireless CarPlay',
      'JBL 10-Speaker Audio with Advanced Sound Modes',
      'Level 2 ADAS with Autonomous Emergency Braking & Blind Spot View',
      'Voice-Assisted Panoramic Sunroof with Mood Lighting',
      'Dual-Tone Blackstone Interior with Dark Badging'
    ],
    highlights: [
      'Virtually brand new condition with under 11,000 kms',
      'Under 3-year standard + 2-year extended Tata warranty',
      'Ceramic coating and 3D floor mats installed'
    ],
    isVerified: true,
    isFeatured: false,
    inspectionScore: 98,
    insuranceType: 'Zero Dep',
    insuranceValidity: 'April 2027',
    serviceHistory: 'Full Authorized Service History',
    accidentFree: true,
    sellerId: 'seller_1',
    seller: mockSellers.seller_1,
    status: 'Active',
    createdAt: '2026-08-15',
    viewsCount: 1980,
    enquiriesCount: 31,
    savesCount: 88,
    planType: 'annual_pro'
  }
];

export const mockEnquiries: Enquiry[] = [
  {
    id: 'enq_1',
    vehicleId: 'veh_1',
    vehicleName: '2022 BMW 3 Series 330i M Sport',
    vehicleImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=85',
    vehiclePrice: 4250000,
    buyerName: 'Rohan Mehta',
    buyerPhone: '+91 98200 11982',
    buyerEmail: 'rohan.mehta@investcorp.com',
    buyerCity: 'Mumbai',
    message: 'Hello Yashraj, I am very interested in this 330i. Is the car available for an inspection this Saturday morning in Nashik? I have pre-approved finance ready.',
    offeredPrice: 4100000,
    status: 'new',
    createdAt: '2026-08-16 14:30',
    lastReply: '2 hours ago',
    chatMessages: [
      {
        id: 'msg_1',
        sender: 'buyer',
        text: 'Hello Yashraj, I am very interested in this 330i. Is the car available for an inspection this Saturday morning in Nashik?',
        timestamp: '14:30'
      },
      {
        id: 'msg_2',
        sender: 'seller',
        text: 'Hello Rohan, yes absolutely. The car is parked at my residence in College Road, Nashik. Saturday 11:00 AM works perfectly.',
        timestamp: '14:42'
      },
      {
        id: 'msg_3',
        sender: 'buyer',
        text: 'Superb! I have offered ₹41 Lakhs. Can we close around that subject to physical inspection?',
        timestamp: '15:05'
      }
    ]
  },
  {
    id: 'enq_2',
    vehicleId: 'veh_1',
    vehicleName: '2022 BMW 3 Series 330i M Sport',
    vehicleImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&auto=format&fit=crop&q=85',
    vehiclePrice: 4250000,
    buyerName: 'Dr. Ananya Kulkarni',
    buyerPhone: '+91 97633 44019',
    buyerEmail: 'dr.ananya@apexhealthcare.in',
    buyerCity: 'Pune',
    message: 'Can you please confirm if the service package is transferrable? Would like to book a test drive.',
    status: 'contacted',
    createdAt: '2026-08-15 10:15',
    lastReply: 'Yesterday'
  },
  {
    id: 'enq_3',
    vehicleId: 'veh_4',
    vehicleName: '2023 Mahindra Scorpio-N Z8L 4x4',
    vehicleImage: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=85',
    vehiclePrice: 2325000,
    buyerName: 'Karanvir Singh',
    buyerPhone: '+91 98722 33410',
    buyerEmail: 'karanvir.singh@gmail.com',
    buyerCity: 'Nashik',
    message: 'Is the asking price slightly negotiable? I am a cash buyer in Nashik and can close within 48 hours.',
    offeredPrice: 2250000,
    status: 'negotiating',
    createdAt: '2026-08-14 18:20',
    lastReply: '2 days ago'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'New High-Value Enquiry',
    message: 'Rohan Mehta sent an offer of ₹41.00 Lakh on your 2022 BMW 3 Series 330i.',
    type: 'enquiry',
    time: '25 mins ago',
    read: false,
    linkAction: 'enquiry_1'
  },
  {
    id: 'notif_2',
    title: 'Listing Verified & Boosted',
    message: 'Your Tata Harrier Dark Edition listing has passed 150-point technical inspection with a 98/100 score.',
    type: 'status',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif_3',
    title: 'Annual Pro Active',
    message: 'You have unlimited listings with priority visibility active until August 2027.',
    type: 'subscription',
    time: '3 days ago',
    read: true
  },
  {
    id: 'notif_4',
    title: 'Price Drop Alert',
    message: 'A saved vehicle in your watchlist (2023 Mercedes-Benz C220d) dropped price by ₹1,60,000.',
    type: 'price_drop',
    time: '4 days ago',
    read: true
  }
];

export const mockUserProfiles: Record<string, UserProfile> = {
  seller: {
    id: 'seller_1',
    name: 'Yashraj Deshmukh',
    phone: '+91 98230 44129',
    email: 'yashraj.deshmukh@automotive.in',
    role: 'seller',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Nashik, Maharashtra',
    isVerified: true,
    membershipPlan: 'annual_pro',
    subscriptionExpiry: '15 Aug 2027',
    activeListingsCount: 12,
    totalEnquiries: 146
  },
  buyer: {
    id: 'buyer_1',
    name: 'Priya Sharma',
    phone: '+91 98210 99881',
    email: 'priya.sharma@techadvisors.in',
    role: 'buyer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    location: 'Mumbai, Maharashtra',
    isVerified: true,
    membershipPlan: 'free',
    activeListingsCount: 0,
    totalEnquiries: 4
  },
  dealer: {
    id: 'seller_2',
    name: 'Royal Heritage Auto Gallery',
    phone: '+91 98201 88720',
    email: 'contact@royalheritagecars.in',
    role: 'dealer',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    location: 'Bandra West, Mumbai',
    isVerified: true,
    membershipPlan: 'annual_pro',
    subscriptionExpiry: '01 Jan 2028',
    activeListingsCount: 18,
    totalEnquiries: 420
  },
  admin: {
    id: 'admin_1',
    name: 'Vikram Merchant (Platform Admin)',
    phone: '+91 99000 88776',
    email: 'admin@carforsell.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    location: 'Mumbai HQ',
    isVerified: true,
    membershipPlan: 'annual_pro',
    activeListingsCount: 0,
    totalEnquiries: 0
  }
};

export const sampleBrands = [
  'BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Toyota', 'Mahindra', 'Tata', 'Hyundai',
  'Land Rover', 'Volvo', 'Jaguar', 'Kia', 'Skoda', 'Volkswagen', 'Honda', 'MG'
];

export const sampleCities = [
  'Nashik', 'Mumbai', 'Pune', 'Bengaluru', 'Delhi NCR', 'Hyderabad',
  'Ahmedabad', 'Chennai', 'Kolkata', 'Chandigarh', 'Jaipur', 'Goa'
];
