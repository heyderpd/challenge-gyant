import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProviderSlotsStatus, providerSlotsStatusSchema } from './provider-slots-status.schema';
import { providerSlotsStatusService } from './provider-slots-status.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: ProviderSlotsStatus.name, schema: providerSlotsStatusSchema }]),
  ],
  providers: [providerSlotsStatusService],
  exports: [providerSlotsStatusService],
})
export class providerSlotsStatusModule {}
