// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../envirement/environment';
import { Order, OrderStatus } from '../models/order.model';
import { Return, ReturnStatus } from '../models/return.model';
import { BehaviorSubject } from 'rxjs';
// import { Notification } from '../models/Notification.model';

interface DashboardStats {
  total_sales: number;
  total_orders: number;
  total_customers: number;
  revenue_growth: number;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private realtimeSubscription: any;

  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  public stats$ = this.statsSubject.asObservable();

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.setupRealtimeListeners();
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

      return data.publicUrl;
    } catch (error) {
      console.error('Get download URL error:', error);
      return '';
    }
  }

  async insertProduct(product: any) {
    try {
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
        throw error;
      }

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
    const { error } = await this.supabase.from('returns').insert({
      order_id: orderId,
      product_id: order.product_id,
      product_name: order.product_name,
      customer_name: order.customer_name,
      reason: reason,
      status: 'معلق',
    });

    if (error) {
      throw error;
    }

    // Update the order status to "مرتجع"
    await this.updateOrderStatus(orderId, 'مرتجع');
  }

  async getProducts(
    page: number,
    pageSize: number = 8
  ): Promise<{ products: any[]; totalCount: number | null }> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: products, error } = await this.supabase
      .from('products')
      .select('*')
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get total count for pagination
    const { count, error: countError } = await this.supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    return {
      products: products.map((p) => ({
        ...p,
        stock: p.stock || 0, // Ensure stock field exists
      })),
      totalCount: count,
    };
  }

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    const { error } = await this.supabase.from('products').delete().eq('id', id);

    if (error) throw error;
  }

  //////////////////////////notifications

  // Fetch initial data
  async fetchInitialData(): Promise<void> {
    await Promise.all([
      this.fetchDashboardStats(),
      this.fetchNotifications(),
      this.fetchRecentOrders(),
    ]);
  }

  // Fetch dashboard statistics
  async fetchDashboardStats(): Promise<void> {
    const { data, error } = await this.supabase.from('dashboard_stats').select('*').single();

    if (error) {
      console.error('Error fetching dashboard stats:', error);
      return;
    }

    this.statsSubject.next(data);
  }

  // Fetch notifications
  async fetchNotifications(): Promise<void> {
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching notifications:', error);
      return;
    }

    this.notificationsSubject.next(data as Notification[]);
  }

  // Fetch recent orders
  async fetchRecentOrders(): Promise<void> {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching orders:', error);
      return;
    }

    this.ordersSubject.next(data as Order[]);
  }

  // Mark notification as read
  async markNotificationAsRead(id: number): Promise<void> {
    const { error } = await this.supabase.from('notifications').update({ read: true }).eq('id', id);

    if (error) {
      console.error('Error updating notification:', error);
    } else {
      // Update local state
      const currentNotifications = this.notificationsSubject.value;
      const updatedNotifications = currentNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      );
      this.notificationsSubject.next(updatedNotifications);
    }
  }

  // Mark all notifications as read
  async markAllNotificationsAsRead(): Promise<void> {
    const { error } = await this.supabase
      .from('notifications')
      .update({ read: true })
      .eq('read', false);

    if (error) {
      console.error('Error updating notifications:', error);
    } else {
      // Update local state
      const updatedNotifications = this.notificationsSubject.value.map((notification) => ({
        ...notification,
        read: true,
      }));
      this.notificationsSubject.next(updatedNotifications);
    }
  }

  // Setup realtime listeners for new notifications and orders
  private setupRealtimeListeners(): void {
    // Listen for new notifications
    this.realtimeSubscription = this.supabase
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          const currentNotifications = this.notificationsSubject.value;

          // Add new notification to the beginning of the list
          const updatedNotifications = [newNotification, ...currentNotifications];

          // Keep only the latest 10 notifications
          if (updatedNotifications.length > 10) {
            updatedNotifications.pop();
          }

          this.notificationsSubject.next(updatedNotifications);

          // Show browser notification if permitted
          if (Notification.permission === 'granted') {
            new Notification(newNotification.title_notif, {
              body: newNotification.message,
              icon: 'https://cdn-icons-png.flaticon.com/512/6485/6485822.png',
            });
          }
        }
      )
      .subscribe();
  }

  // Clean up realtime subscription
  ngOnDestroy(): void {
    if (this.realtimeSubscription) {
      this.supabase.removeChannel(this.realtimeSubscription);
    }
  }
}
