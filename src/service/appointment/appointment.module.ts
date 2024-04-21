import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppointmentService } from './appointment.service';

@Module({
  imports: [ConfigModule],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
