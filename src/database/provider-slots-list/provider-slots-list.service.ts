import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProviderSlotsList } from './provider-slots-list.schema';

@Injectable()
export class providerSlotsListService {
  constructor(@InjectModel(ProviderSlotsList.name) private providerSlotsListModel: Model<ProviderSlotsList>) {}

  async create(document: ProviderSlotsList): Promise<ProviderSlotsList> {
    const createdproviderSlotsList = new this.providerSlotsListModel(document);
    return createdproviderSlotsList.save();
  }

  async findAll(): Promise<ProviderSlotsList[]> {
    return this.providerSlotsListModel.find().exec();
  }

  async findOne(id: string): Promise<ProviderSlotsList> {
    return this.providerSlotsListModel.findById(id).exec();
  }

  async update(id: string, updateproviderSlotsListDto: Partial<ProviderSlotsList>): Promise<ProviderSlotsList> {
    return this.providerSlotsListModel.findByIdAndUpdate(id, updateproviderSlotsListDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Boolean> {
    const deleted = await this.providerSlotsListModel.deleteOne({ providerId: id }).exec();
    return deleted?.deletedCount > 0
  }

  async findWithSlot(id: string, slotId: string): Promise<ProviderSlotsList> {
    return this.providerSlotsListModel.findOne({
      providerId: new Types.ObjectId(id),
      slots : { $elemMatch: {
        slotId: new Types.ObjectId(slotId),
      }},
    }).exec();
  }

  async findWithSlotFree(id: string, slotId: string): Promise<ProviderSlotsList> {
    return this.providerSlotsListModel.findOne({
      providerId: new Types.ObjectId(id),
      slots : { $elemMatch: {
        slotId: new Types.ObjectId(slotId),
        appointmentId: { $exists: false },
      }},
    }).exec();
  }

  async updateSlotAppointment(providerId: string, slotId: string, appointmentId: string): Promise<Boolean> {
    const updated = await this.providerSlotsListModel.updateOne({
      providerId: new Types.ObjectId(providerId),
      slots : { $elemMatch: { slotId: new Types.ObjectId(slotId) }},
    }, {
      $set: { "slots.$.appointmentId": appointmentId }
    }).exec();
    return updated?.modifiedCount > 0;
  }

  async getProviderSlotsList(providerId: string, start: Date, end: Date): Promise<Array<ProviderSlotsList>> {
    return this.providerSlotsListModel.find({
      providerId: providerId,
      date: {
        $gte: new Date(start),
        $lt: new Date(end),
      },
    }).exec();
  }
}
