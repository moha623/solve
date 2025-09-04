// supabase.service.ts
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

async uploadImage(filePath: string, file: File): Promise<{ data: any; error: any }> {
    try {
      const { data, error } = await this.supabase.storage.from('products').upload(filePath, file, {
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
      const { data } = this.supabase.storage.from('products').getPublicUrl(filePath);
      console.log('Getting download URL for path:', filePath);
      console.log('Public URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Get download URL error:', error);
      return '';
    }
  }

  async insertProduct(product: any) {
    try {
      console.log('Inserting product:', product);

      // Updated validation for new Product model with media_urls array
      if (!product.name || !product.description || !product.price || 
          !product.media_urls || product.media_urls.length === 0) {
        throw new Error('Missing required product fields');
      }

      const { data, error } = await this.supabase
        .from('products')
        .insert([
          {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            original_price: product.originalPrice || null,
            discount: product.discount || null,
            rating: product.rating || 0,
            review_count: product.reviewCount || 0,
            features: product.features || [],
            media_urls: product.media_urls, // Now an array of URLs
            delivery_fee: product.deliveryFee || 0,
          },
        ])
        .select();

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
