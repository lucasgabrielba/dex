import type { IDateValue } from './common';
// ----------------------------------------------------------------------
export type IDevelopmentPropertyFilters = {
  name: string;
  status: string;
  type: string;
  priceRange: number[];
};

export type IDevelopmentPropertyTableFilters = {
  name: string;
  status: string;
  type: string;
  startDate: IDateValue | null;
  endDate: IDateValue | null;
};

export type IDevelopmentPropertyReview = {
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

export type IDevelopmentPropertyItem = {
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
};