export interface Merchant {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  logo: string;
  logo2: string;
  cashbackPercentage: string;
  status: 'active' | 'inactive';
  isCashbackEnabled: boolean;
  cashbackStatusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  merchantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMerchantDto {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  logo: string;
  logo2: string;
  cashbackPercentage: string;
}

export interface CreateOfferDto {
  title: string;
  description: string;
  price: number;
  merchantId: number;
}

export interface SubUser {
  id: number;
  name: string;
  email: string;
  role: string;
  merchantId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  merchantId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MerchantWithDetails extends Merchant {
  branches: Branch[];
  subUsers: SubUser[];
  offers: Offer[];
}
