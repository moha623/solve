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

  // ببساطة إعادة تسمية image إلى image_url
  const productsWithUrls = data.map(product => ({
    ...product,
    image_url: product.image // استخدم الحقل image مباشرة
  }));

  return productsWithUrls as Product[];
}


}
