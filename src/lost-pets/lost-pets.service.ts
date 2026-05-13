import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LostPet } from 'src/core/db/entities/lostPet.entity';
import { Repository, Point } from 'typeorm';
import { LostPetDto } from 'src/core/interfaces/lostPets.interface';
import { CacheService } from 'src/cache/cache.service';
import { logger } from 'src/config/logger';

const CACHE_KEY_LOST_PETS = 'lost-pets:active';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
    private readonly cacheService: CacheService,
  ) {}

  async getLostPets(): Promise<LostPet[]> {
    try {
      logger.info('[LostPetsService] Consultando lost-pets en cache...');
      const cached = await this.cacheService.get<LostPet[]>(CACHE_KEY_LOST_PETS);
      if (cached && cached.length > 0) {
        logger.info('[LostPetsService] Lost-pets desde cache');
        return cached;
      }
      logger.info('[LostPetsService] Trayendo lost-pets de la DB...');
      const pets = await this.lostPetRepository.find({ where: { is_active: true } });
      await this.cacheService.set(CACHE_KEY_LOST_PETS, pets);
      logger.info(`[LostPetsService] ${pets.length} mascotas perdidas obtenidas`);
      return pets;
    } catch (error) {
      console.error('[LostPetsService] Error:', error);
      return [];
    }
  }

  async createLostPet(data: LostPetDto): Promise<LostPet> {
    const location: Point = {
      type: 'Point',
      coordinates: [data.lon, data.lat],
    };
    const newLostPet = this.lostPetRepository.create({ ...data, location });
    const saved = await this.lostPetRepository.save(newLostPet);
    await this.cacheService.delete(CACHE_KEY_LOST_PETS);
    return saved;
  }
}