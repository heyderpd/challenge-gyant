import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PaymentIntentsEventDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY'),
      {
        host: this.configService.get('STRIPE_HOST'),
        port: this.configService.get('STRIPE_PORT'),
        protocol: this.configService.get('STRIPE_PROTOCOL'),
      },
    );
  }

  async appointmentBook(slotId: string, date: Date, patientData: string, amount: number): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        slotId: slotId,
        appointmentDate: new Date(date).toISOString(),
        patientData: patientData,
      },
    });
    return paymentIntent.id;
  }

  async appointmentConfirm(paymentIntentId: string): Promise<Boolean> {
    const payment = await this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: 'pm_card_visa',
    });
    return payment?.status === 'succeeded';
  }

  async appointmentRetrieve(paymentIntentId: string): Promise<Boolean> {
    const payment = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return payment?.status === 'succeeded';
  }

  async appointmentCapture(paymentIntentId: string): Promise<Boolean> {
    const payment = await this.stripe.paymentIntents.capture(paymentIntentId);
    return payment?.status === 'succeeded';
  }

  async appointmentCancel(paymentIntentId: string): Promise<Boolean> {
    const payment = await this.stripe.paymentIntents.cancel(paymentIntentId);
    return payment?.status === 'succeeded';
  }
}
