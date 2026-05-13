import { Body, Controller, Get, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {

  constructor(private readonly lostPetsService: LostPetsService) {}

  @Get()
  async getLostPets() {
    return await this.lostPetsService.getLostPets();
  }

  @Post()
  async createLostPet(@Body() body: any) {
    return await this.lostPetsService.createLostPet(body);
  }
}