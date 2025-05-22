import type { IDateValue } from './common';
// ----------------------------------------------------------------------
export type IPropertyFilters = {
  name: string;
  status: string;
  type: string;
  priceRange: number[];
};

export type IPropertyTableFilters = {
  name: string;
  status: string;
  type: string;
  startDate: IDateValue | null;
  endDate: IDateValue | null;
};

export type IPropertyReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  postedAt: IDateValue;
  isPurchased: boolean;
  attachments?: string[];
};

export type IPropertyItem = {
  id: string;
  name: string;
  area: number;
  updatedAt: IDateValue;
  createdAt: IDateValue;
  status: string;
  type: string;
  value: number;
  avatarUrl: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  images: string[];
};
export interface PropertyAmenity {
  id: string;
  name: string;
  checked: boolean;
}

export interface CondominiumAmenity {
  id: string;
  name: string;
  checked: boolean;
}


export default interface PropertyFormValues {
  // Property Information
  propertyCondition: string;
  propertyType: string;
  sunPosition: string;
  size: number;
  bedrooms: number;
  suites: number;
  floor: number | string;
  bathrooms: number;
  parkingSpots: number;
  iptuValue: number;
  propertyAmenities: PropertyAmenity[];

  // Condominium Information
  buildingName: string;
  constructionYear: string;
  condominiumFee: number;
  condominiumAmenities: CondominiumAmenity[];

  // Location
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;

  // Images
  images: string[];

  // Values
  purpose: string;
  salePrice: number;
  rentPrice: number;
  acceptsFinancing: boolean;
  acceptsExchange: boolean;
  condominiumValue: number;
  iptuValuePerYear: number;
  valueNotes: string;
  showPriceOnRequest: boolean;
  exclusiveProperty: boolean;
  highlightProperty: boolean;
}