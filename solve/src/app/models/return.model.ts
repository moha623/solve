export interface Return {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  reason: string;
  status: ReturnStatus;
  created_at: string;
  updated_at: string;
}

export type ReturnStatus = 'معلق' | 'قيد المعالجة' | 'تم القبول' | 'مرفوض';