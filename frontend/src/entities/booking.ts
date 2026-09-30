/**
 * Booking & Payment domain entities
 */

export type PaymentMethod = 'paystack' | 'card' | 'bank_transfer' | 'ussd';
export type PaymentStatus = 'pending' | 'successful' | 'failed' | 'refunded';

export interface BookingOrder {
  id: string;
  eventId: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string; 
  ticketTierId?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  serviceFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  createdAt: string;
}
