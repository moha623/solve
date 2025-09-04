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
  media_urls: string[]; // Changed from image_url to media_urls (array)
  deliveryFee: number;
}