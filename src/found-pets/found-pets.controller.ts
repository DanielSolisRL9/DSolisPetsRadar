import { Body, Controller, Post } from '@nestjs/common';
import { FoundPetsService } from './found-pets.service';

@Controller('found-pets')
export class FoundPetsController {

  constructor(private readonly foundPetsService: FoundPetsService) {}

  @Post()
  async createFoundPet(@Body() body: any) {
    return await this.foundPetsService.createFoundPet(body);
  }
}