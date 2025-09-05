// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../envirement/environment';
import { Order, OrderStatus } from '../models/order.model';
import { Return, ReturnStatus } from '../models/return.model';

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
      if (
        !product.name ||
        !product.description ||
        !product.price ||
        !product.media_urls ||
        product.media_urls.length === 0
      ) {
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


  
  // Order methods
  async getOrders(): Promise<Order[]> {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    return data as Order[];
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    const { error } = await this.supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);
    
    if (error) {
      throw error;
    }
  }

  // Return methods
  async getReturns(): Promise<Return[]> {
    const { data, error } = await this.supabase
      .from('returns')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    return data as Return[];
  }

  async updateReturnStatus(returnId: string, status: ReturnStatus): Promise<void> {
    const { error } = await this.supabase
      .from('returns')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', returnId);
    
    if (error) {
      throw error;
    }
  }

  async createReturn(orderId: string, reason: string): Promise<void> {
    // First get the order details
    const { data: order, error: orderError } = await this.supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (orderError) {
      throw orderError;
    }
    
    // Create the return record
    const { error } = await this.supabase
      .from('returns')
      .insert({
        order_id: orderId,
        product_id: order.product_id,
        product_name: order.product_name,
        customer_name: order.customer_name,
        reason: reason,
        status: 'معلق'
      });
    
    if (error) {
      throw error;
    }
    
    // Update the order status to "مرتجع"
    await this.updateOrderStatus(orderId, 'مرتجع');
  }
}
