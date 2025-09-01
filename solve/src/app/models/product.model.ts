// models/product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  image_url: string;
  deliveryFee: number;
}