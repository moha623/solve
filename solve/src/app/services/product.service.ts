// services/product.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
 
import { environment } from '../../envirement/environment';
import { Product } from '../models/product.model';
 

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
    
    return data;
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

  async createOrder(order: any) {
    const { data, error } = await this.supabase
      .from('orders')
      .insert([order]);
    
    if (error) {
      throw error;
    }
    
    return data;
  }
}