/**
 * Ticket & Pass domain entities
 */

export type TicketStatus = 'active' | 'used' | 'cancelled' | 'past';

export interface TicketPass {
  id: string;
  event_id?: string;
  event_title: string;
  event_date: string;
  event_time?: string;
  event_location?: string;
  event_image_url?: string;
  event_image?: string;
  quantity: number;
  total_price: number;
  status: TicketStatus;
  ticket_code: string;
  qr_value?: string;
  booked_on?: string;
  venue?: string;
  tier?: string;
  attendee_name?: string;
  attendee_email?: string;
}
