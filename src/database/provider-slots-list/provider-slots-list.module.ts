import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderSlotsList, providerSlotsListSchema } from './provider-slots-list.schema';
import { providerSlotsListService } from './provider-slots-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProviderSlotsList.name, schema: providerSlotsListSchema }]),
  ],
  providers: [providerSlotsListService],
  exports: [providerSlotsListService],
})
export class providerSlotsListModule {}
