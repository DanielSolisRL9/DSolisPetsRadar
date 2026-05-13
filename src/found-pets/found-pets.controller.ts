import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';

@Controller('found-pets')
export class FoundPetsController {

  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Get()
  async getFoundPets() {
    return await this.foundPetsService.getFoundPets();
  }

  @Post()
  async createFoundPet(@Body() body: any) {
    return await this.foundPetsService.createFoundPet(body);
  }
}