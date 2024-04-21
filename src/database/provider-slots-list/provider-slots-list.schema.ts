import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

class Slots {
  @Prop({ type: SchemaTypes.ObjectId, unique: true, auto: true })
  slotId: Types.ObjectId;

  @Prop()
  time: string;

  @Prop()
  appointmentId: string;
}

@Schema()
export class ProviderSlotsList extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  providerId: Types.ObjectId;

  @Prop({ type: Date })
  date: Date;

  @Prop()
  slots: Array<Slots>;
}

export const providerSlotsListSchema = SchemaFactory.createForClass(ProviderSlotsList);
