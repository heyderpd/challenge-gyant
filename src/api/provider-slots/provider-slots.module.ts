import { Module } from '@nestjs/common';
import { ProviderModule } from '@database/provider';
import { providerSlotsListModule } from '@database/provider-slots-list';
import { providerSlotsStatusModule } from '@database/provider-slots-status';
import { ProviderSlotsController } from './provider-slots.controller';
import { AppointmentModule } from '@service/appointment';

@Module({
  imports: [
    ProviderModule,
    providerSlotsListModule,
    providerSlotsStatusModule,
    AppointmentModule,
  ],
  providers: [ProviderSlotsController],
  controllers: [
    ProviderSlotsController,
  ],
})
export class ProviderSlotsApiModule {}
