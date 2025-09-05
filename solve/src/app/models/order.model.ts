export interface Order {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_price: number;
  subtotal: number;
  delivery_fee: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'قيد المعالجة' | 'تم التوصيل' | 'مرتجع' | 'معلق' | 'تم الشحن';