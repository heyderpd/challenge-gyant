import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProviderSlotsStatus } from './provider-slots-status.schema';
import * as moment from 'moment';

@Injectable()
export class providerSlotsStatusService {
  constructor(
    @InjectModel(ProviderSlotsStatus.name) private providerSlotsStatusModel: Model<ProviderSlotsStatus>,
    private readonly configService: ConfigService,
  ) {}

  async create(document: {
    providerId: string,
    slotId: string,
    appointmentId: string,
    paymentIntentDate: Date,
    patientData: string,
  }): Promise<ProviderSlotsStatus> {
    const createdproviderSlotsStatus = new this.providerSlotsStatusModel({
      ...document,
      providerId: new Types.ObjectId(document.providerId),
      slotId: new Types.ObjectId(document.slotId),
      status: 'new',
    });
    return createdproviderSlotsStatus.save();
  }

  async findAll(): Promise<ProviderSlotsStatus[]> {
    return this.providerSlotsStatusModel.find().exec();
  }

  async findOne(id: string): Promise<ProviderSlotsStatus> {
    return this.providerSlotsStatusModel.findOne({ slotId: new Types.ObjectId(id) }).exec();
  }

  async update(slotId: string, appointmentId: string, updateproviderSlotsStatusDto: Partial<ProviderSlotsStatus>): Promise<Boolean> {
    const updated = await this.providerSlotsStatusModel.updateOne(
      { slotId, appointmentId },
      updateproviderSlotsStatusDto,
      { new: true },
    ).exec();
    return updated?.modifiedCount > 0;
  }

  async delete(id: string): Promise<Boolean> {
    const deleted = await this.providerSlotsStatusModel.deleteOne({ providerId: id }).exec();
    return deleted?.deletedCount > 0;
  }

  async getSlotWithAppointment(slotId: string, appointmentId: string): Promise<ProviderSlotsStatus> {
    return this.providerSlotsStatusModel.findOne({
      slotId: { $eq: slotId },
      appointmentId: { $eq: appointmentId },
    }).exec();
  }

  cannotUpdateToConfirmedStatus(slot: ProviderSlotsStatus): Boolean {
    const now = moment();
    const date = moment(slot.paymentIntentDate);
    const diff = now.diff(date, 'hours');
    return diff >= Number(this.configService.get('SLOT_TIMEOUT'));
  }
}
