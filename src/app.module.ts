import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProviderApiModule } from '@api/provider';
import { ProviderSlotsApiModule } from '@api/provider-slots';
import { AppointmentModule } from '@service/appointment';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DB_MONGO_URI'),
        dbName: config.get<string>('DB_NAME'),
      })
    }),
    ProviderApiModule,
    ProviderSlotsApiModule,
    AppointmentModule,
  ],
})
export class AppModule {}
