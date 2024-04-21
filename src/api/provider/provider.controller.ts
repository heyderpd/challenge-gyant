import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProviderService, Provider } from '@database/provider';

@Controller('providers')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @Get()
  findAll() {
    return this.providerService.findAll();
  }
}
