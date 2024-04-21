import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Provider } from './provider.schema';

@Injectable()
export class ProviderService {
  constructor(@InjectModel(Provider.name) private providerModel: Model<Provider>) {}

  async create(document: Provider): Promise<Provider> {
    const createdProvider = new this.providerModel(document);
    return createdProvider.save();
  }

  async findAll(): Promise<Provider[]> {
    return this.providerModel.find().exec();
  }

  async findOne(id: string): Promise<Provider> {
    return this.providerModel.findOne({ providerId: new Types.ObjectId(id) }).exec();
  }

  async update(id: string, updateProviderDto: Partial<Provider>): Promise<Provider> {
    return this.providerModel.findOneAndUpdate(
      { providerId: id },
      updateProviderDto,
      { new: true },
    ).exec();
  }

  async delete(id: string): Promise<Boolean> {
    const deleted = await this.providerModel.deleteOne({ providerId: id }).exec();
    return deleted?.deletedCount > 0
  }
}
