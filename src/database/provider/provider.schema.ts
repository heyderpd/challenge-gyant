import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema()
export class Provider extends Document {
  @Prop({ type: SchemaTypes.ObjectId, unique: true, auto: true })
  providerId: Types.ObjectId;

  @Prop()
  source: string;

  @Prop()
  name: string;

  @Prop()
  specialty: string;

  @Prop()
  cost: number;

  @Prop()
  location: string;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
