export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  priceNote?: string;
  address: string;
  city: string;
  surface: number;
  rooms: number;
  bedrooms: number;
  photos: string[]; // base64 or URLs
  features: string[];
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  agentPhoto?: string;
  viewCount: number;
  createdAt: string;
  expiresAt?: string; // for urgency countdown
  highlights: string[];
  nearbyPlaces?: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  isExclusive?: boolean;
  reducedPrice?: boolean;
  originalPrice?: number;
}

export interface Lead {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source: string; // 'contact_form' | 'popup' | 'exit_intent' | 'sidebar'
  createdAt: string;
}
