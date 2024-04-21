import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderModule } from '@database/provider';

@Module({
  imports: [
    ProviderModule,
  ],
  providers: [ProviderController],
  controllers: [
    ProviderController,
  ],
})
export class ProviderApiModule {}
