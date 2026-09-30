import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TicketsService } from '../tickets/tickets.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentsService {
  private paystackSecret: string;

  constructor(
    private prisma: PrismaService,
    private ticketsService: TicketsService,
    private configService: ConfigService,
  ) {
    this.paystackSecret = this.configService.get<string>('PAYSTACK_SECRET_KEY')!;
  }

  async initializePayment(userId: string, eventId: string, ticketTypeId: string, quantity: number = 1) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { ticketTypes: true },
    });

    if (!event) throw new NotFoundException('Event not found');

    const ticketType = event.ticketTypes.find(t => t.id === ticketTypeId);
    if (!ticketType) throw new BadRequestException('Invalid ticket type');

    const amount = ticketType.price * quantity;

    // Call Paystack Initialize
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: 'user@example.com', // In real app, use actual user email
        amount: Math.round(amount * 100), // in kobo
        metadata: { userId, eventId, ticketTypeId, quantity },
      },
      {
        headers: {
          Authorization: `Bearer ${this.paystackSecret}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data.data;

    // Save pending payment
    await this.prisma.payment.create({
      data: {
        reference: data.reference,
        amount,
        status: 'PENDING',
        userId,
        eventId,
      },
    });

    return {
      reference: data.reference,
      authorization_url: data.authorization_url,
    };
  }

  async verifyPayment(reference: string) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${this.paystackSecret}` },
      }
    );

    const paystackData = response.data.data;

    if (paystackData.status !== 'success') {
      throw new BadRequestException('Payment verification failed');
    }

    const metadata = paystackData.metadata || {};
    const { userId, eventId, ticketTypeId, quantity = 1 } = metadata;

    // Create ticket after successful payment
    const ticketResult = await this.ticketsService.buyTicket(
      { eventId, ticketTypeId, quantity } as any,
      userId
    );

    // Update payment status
    await this.prisma.payment.update({
      where: { reference },
      data: { status: 'SUCCESS' },
    });

    return {
      success: true,
      message: 'Payment verified and ticket issued!',
      ticket: ticketResult.ticket,
    };
  }
}