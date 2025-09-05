import { Component } from '@angular/core';
import { Order, OrderStatus } from '../../models/order.model';
import { Return, ReturnStatus } from '../../models/return.model';
import { SupabaseService } from '../../services/supabase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-returns',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-returns.html',
  styleUrl: './order-returns.css'
})
export class OrderReturns {
orders: Order[] = [];
  returns: Return[] = [];
  selectedOrder: Order | null = null;
  selectedReturn: Return | null = null;
  showReturnModal = false;
  returnReason = '';

  
  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() {
    await this.loadOrders();
    await this.loadReturns();
  }

  async loadOrders() {
    try {
      this.orders = await this.supabaseService.getOrders();
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  }

  async loadReturns() {
    try {
      this.returns = await this.supabaseService.getReturns();
    } catch (error) {
      console.error('Error loading returns:', error);
    }
  }

  async updateOrderStatus(order: Order, status: OrderStatus) {
    try {
      await this.supabaseService.updateOrderStatus(order.id, status);
      await this.loadOrders(); // Reload to get updated data
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  async updateReturnStatus(returnItem: Return, status: ReturnStatus) {
    try {
      await this.supabaseService.updateReturnStatus(returnItem.id, status);
      await this.loadReturns(); // Reload to get updated data
    } catch (error) {
      console.error('Error updating return status:', error);
    }
  }

  openReturnModal(order: Order) {
    this.selectedOrder = order;
    this.showReturnModal = true;
  }

  closeReturnModal() {
    this.showReturnModal = false;
    this.selectedOrder = null;
    this.returnReason = '';
  }

  async submitReturn() {
    if (this.selectedOrder && this.returnReason) {
      try {
        await this.supabaseService.createReturn(this.selectedOrder.id, this.returnReason);
        this.closeReturnModal();
        await this.loadOrders();
        await this.loadReturns();
      } catch (error) {
        console.error('Error creating return:', error);
      }
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'قيد المعالجة':
        return 'bg-blue-100 text-blue-800';
      case 'تم التوصيل':
        return 'bg-green-100 text-green-800';
      case 'مرتجع':
        return 'bg-red-100 text-red-800';
      case 'معلق':
        return 'bg-yellow-100 text-yellow-800';
      case 'تم الشحن':
        return 'bg-purple-100 text-purple-800';
      case 'تم القبول':
        return 'bg-green-100 text-green-800';
      case 'مرفوض':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
