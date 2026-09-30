/**
 * Event & Ticket Tier domain entities
 */

export type EventCategory = 'all' | 'music' | 'sports' | 'theatre' | 'festival' | 'conference' | 'nightlife' | 'more';

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  perks?: string;
  availableTickets?: number;
  totalCapacity?: number;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  featured?: boolean;
  image?: string;
  image_url?: string;
  date: string;
  time?: string;
  venue?: string;
  location?: string;
  city?: string;
  price: number;
  formattedPrice?: string;
  description?: string;
  organizer?: string;
  organizer_name?: string;
  availableTickets?: number;
  total_tickets?: number;
  tickets_sold?: number;
  tags?: string[];
  ticketTiers?: TicketTier[];
}
