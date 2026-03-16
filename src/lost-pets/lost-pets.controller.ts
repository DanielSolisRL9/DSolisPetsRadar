import { Body, Controller, Post } from '@nestjs/common';
import { LostPetsService } from './lost-pets.service';

@Controller('lost-pets')
export class LostPetsController {

  constructor(private readonly lostPetsService: LostPetsService) {}

  @Post()
  async createLostPet(@Body() body: any) {
    return await this.lostPetsService.createLostPet(body);
  }
}