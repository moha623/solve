import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../envirement/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async uploadImage(filePath: string, file: File) {
    try {
      const { data, error } = await this.supabase.storage
        .from('products')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw error;
      }

      return { data, error };
    } catch (error) {
      console.error('Upload image error:', error);
      throw error;
    }
  }

  getDownloadURL(filePath: string): string {
    try {
      const { data } = this.supabase.storage
        .from('products')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Get download URL error:', error);
      return '';
    }
  }

  async insertProduct(product: any) {
    try {
      console.log('Inserting product:', product);
      
      // Ensure we have all required fields
      if (!product.name || !product.category || !product.image) {
        throw new Error('Missing required product fields');
      }
      
      const { data, error } = await this.supabase
        .from('products')
        .insert([product])
        .select(); // This returns the inserted data
      
      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }
      
      console.log('Insert successful:', data);
      return { data, error };
    } catch (error) {
      console.error('Insert product error:', error);
      throw error;
    }
  }

  async countProducts(): Promise<number | null> {
    try {
      const { count, error } = await this.supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error counting products:', error);
        return null;
      }

      return count;
    } catch (error) {
      console.error('Count products error:', error);
      return null;
    }
  }
}