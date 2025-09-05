// services/product.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
 
import { environment } from '../../envirement/environment';
import { Product } from '../models/product.model';
 interface Order {
  product_id: string;
  product_name: string;
  quantity: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  subtotal: number;
  delivery_fee: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async getProduct(id: string): Promise<Product> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
  // ببساطة إعادة تسمية image إلى image_url
  const productWithUrl = {
    ...data,
    image_url: data.image // استخدم الحقل image مباشرة
  };
  
  return productWithUrl as Product;
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const { data, error } = await this.supabase
      .from('products')
      .select('*')
      .neq('id', productId)
      .limit(2);
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  async createOrder(order: Order): Promise<any> {
    const { data, error } = await this.supabase
      .from('orders')
      .insert([
        {
          product_id: order.product_id,
          product_name: order.product_name,
          quantity: order.quantity,
          customer_name: order.customer_name,
          customer_phone: order.customer_phone,
          customer_address: order.customer_address,
          total_price: order.total_price,
          subtotal: order.subtotal,
          delivery_fee: order.delivery_fee
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    return data;
  }


  
}