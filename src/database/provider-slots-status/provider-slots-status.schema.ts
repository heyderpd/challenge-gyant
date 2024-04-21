import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class ProviderSlotsStatus extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  providerId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId })
  slotId: Types.ObjectId;

  @Prop()
  appointmentId: string;

  @Prop()
  paymentIntentDate: Date;

  @Prop()
  patientData: string;

  @Prop()
  status: 'rejected' | 'confirmed' | 'new' | 'unavailable';
}

export const providerSlotsStatusSchema = SchemaFactory.createForClass(ProviderSlotsStatus);
