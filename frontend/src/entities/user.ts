/**
 * User & Creator domain entities
 */

export type UserRole = 'attendee' | 'creator' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role?: UserRole;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  createdAt?: string;
}

export interface CreatorProfile extends User {
  brandName?: string;
  verified?: boolean;
  totalEventsCreated?: number;
  totalTicketsSold?: number;
  totalRevenue?: number;
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}
