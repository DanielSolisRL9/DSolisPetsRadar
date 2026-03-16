import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lostPet.entity';
import { Repository, Point } from 'typeorm';
import { LostPetDto } from 'src/core/interfaces/lostPets.interface';

@Injectable()
export class LostPetsService {

  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
  ) {}

  async createLostPet(data: LostPetDto): Promise<LostPet> {
    const location: Point = {
      type: "Point",
      coordinates: [data.lon, data.lat]
    };
    
    const newLostPet = this.lostPetRepository.create({
      ...data,
      location
    });
    return await this.lostPetRepository.save(newLostPet);
  }
}