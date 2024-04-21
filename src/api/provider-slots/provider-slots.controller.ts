import { Controller, Get, Post, Body, Put, Param, Query, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { providerSlotsListService } from '@database/provider-slots-list';
import { ProviderSlotsStatus, providerSlotsStatusService } from '@database/provider-slots-status';
import { ProviderService } from '@database/provider';
import { AppointmentService, PaymentIntentsEventDto } from '@service/appointment';
import { UpdateSlotBookDto } from './dto/book-slots.dto';
import { FindProviderSlotsDto } from './dto/find-slots-listing.dto';

@Controller()
export class ProviderSlotsController {
  constructor(
    private readonly providerService: ProviderService,
    private readonly providerSlotsListService: providerSlotsListService,
    private readonly providerSlotsStatusService: providerSlotsStatusService,
    private readonly apointmentService: AppointmentService,
  ) {}

  @Get('providers/:id/slots')
  getAvailableProviderSlots(@Param('id') id: string, @Query() params: FindProviderSlotsDto) {
    return this.providerSlotsListService.getProviderSlotsList(id, params.start, params.end);
  }

  @Post('providers/:providerId/slots/:slotId/book')
  async slotBook(@Param('providerId') providerId: string, @Param('slotId') slotId: string, @Body() updateSlotBookDto: UpdateSlotBookDto) {
    const provider = await this.providerService.findOne(providerId);
    if (!provider) {
      throw new NotFoundException('Provider');
    }
    const providerAndSlotExist = await this.providerSlotsListService.findWithSlot(providerId, slotId);
    if (!providerAndSlotExist) {
      throw new NotFoundException('ProviderList');
    }
    const now = new Date();
    const appointmentId = await this.apointmentService.appointmentBook(
      slotId,
      updateSlotBookDto.date,
      updateSlotBookDto.patientData,
      provider.cost,
    );
    if (!appointmentId) {
      throw new HttpException('PaymentIntents Failed', HttpStatus.PAYMENT_REQUIRED);
    }
    const created = await this.providerSlotsStatusService.create({
      providerId: providerId,
      slotId: slotId,
      appointmentId: appointmentId,
      paymentIntentDate: now,
      patientData: updateSlotBookDto.patientData,
    });
    if (!created) {
      throw new Error('Failed to Create Slot');
    }
    return {
      appointmentId: appointmentId,
    }
  }

  @Post('slots/:slotId/appointment/:appointmentId/confirm')
  async slotConfirm(@Param('slotId') slotId: string, @Param('appointmentId') appointmentId: string) {
    const slot = await this.providerSlotsStatusService.getSlotWithAppointment(slotId, appointmentId);
    if (!slot) {
      throw new NotFoundException('Slot');
    }
    if (slot?.status != 'new') {
      throw new HttpException('invalid Slot status', HttpStatus.PRECONDITION_FAILED);
    }
    const slotIsFree = await this.providerSlotsListService.findWithSlotFree(slot.providerId.toString(), slotId);
    if (!slotIsFree) {
      throw new HttpException('Slot not free', HttpStatus.PRECONDITION_FAILED);
    }
    const isTimeout = this.providerSlotsStatusService.cannotUpdateToConfirmedStatus(slot);
    if (isTimeout) {
      await this.providerSlotsStatusService.update(slotId, appointmentId, { status: 'unavailable' });
      throw new HttpException('Appointment timeout', HttpStatus.PRECONDITION_FAILED);
    }
    const appointmentCaptured = await this.apointmentService.appointmentCapture(slot.appointmentId);
    if (!appointmentCaptured) {
      await this.providerSlotsStatusService.update(slotId, appointmentId, { status: 'rejected' });
      throw new HttpException('PaymentIntents Failed', HttpStatus.PAYMENT_REQUIRED);
    }
    const appointmentSaved = await this.providerSlotsListService.updateSlotAppointment(
      slot.providerId.toString(),
      slotId,
      slot.appointmentId.toString(),
    );
    if (!appointmentSaved) {
      await this.apointmentService.appointmentCancel(slot.appointmentId.toString());
      await this.providerSlotsStatusService.update(slotId, appointmentId, { status: 'unavailable' });
      throw new HttpException('Slot not free', HttpStatus.PRECONDITION_FAILED);
    }
    await this.providerSlotsStatusService.update(slotId, appointmentId, { status: 'confirmed' });
  }
}
