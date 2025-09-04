import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
 
import { environment } from '../../envirement/environment';
import { Product } from '../models/product.model';
 
 

@Injectable({
  providedIn: 'root',
})
export class Homeservice {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async countProducts(): Promise<number> {
    const { count, error } = await this.supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    return count ?? 0;
  }

async getProductsRange(start: number, end: number): Promise<Product[]> {
  const { data, error } = await this.supabase
    .from('products')
    .select('*')
    .range(start, end)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  console.log("Raw data from Supabase:", data);

  // Debug each product to see what fields exist
  const productsWithUrls = data.map(product => {
    console.log("Product fields:", Object.keys(product));
    console.log("Product image:", product.image);
    console.log("Product image_url:", product.image_url);
    
    return {
      ...product,
      image_url: product.image_url // Use the existing image_url
    };
  });

  return productsWithUrls as Product[];
}


}
