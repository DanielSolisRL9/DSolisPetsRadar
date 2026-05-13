import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/foundPet.entity';
import { LostPet } from 'src/core/db/entities/lostPet.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { generateFoundPetEmailTemplate } from 'src/found-pets/templates/foundPet.template';
import { FoundPetDto } from 'src/core/interfaces/foundPets.interface';
import { CacheService } from 'src/cache/cache.service';
import { logger } from 'src/config/logger';

const CACHE_KEY_FOUND_PETS = 'found-pets:all';

@Injectable()
export class FoundPetsService {
  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetRepository: Repository<FoundPet>,
    @InjectRepository(LostPet)
    private readonly lostPetRepository: Repository<LostPet>,
    private readonly emailService: EmailService,
    private readonly cacheService: CacheService,
  ) {}

  async getFoundPets(): Promise<FoundPet[]> {
    try {
      logger.info('[FoundPetsService] Consultando found-pets en cache...');
      const cached = await this.cacheService.get<FoundPet[]>(CACHE_KEY_FOUND_PETS);
      if (cached && cached.length > 0) {
        logger.info('[FoundPetsService] Found-pets desde cache');
        return cached;
      }
      logger.info('[FoundPetsService] Trayendo found-pets de la DB...');
      const pets = await this.foundPetRepository.find();
      await this.cacheService.set(CACHE_KEY_FOUND_PETS, pets);
      logger.info(`[FoundPetsService] ${pets.length} mascotas encontradas obtenidas`);
      return pets;
    } catch (error) {
      console.error('[FoundPetsService] Error:', error);
      return [];
    }
  }

  async createFoundPet(foundPet: FoundPetDto) {
    const newFoundPet = this.foundPetRepository.create({
      ...foundPet,
      location: {
        type: 'Point',
        coordinates: [foundPet.lon, foundPet.lat],
      },
    });
    await this.foundPetRepository.save(newFoundPet);
    await this.cacheService.delete(CACHE_KEY_FOUND_PETS);

    const lostPets = await this.lostPetRepository
      .createQueryBuilder('lost')
      .where(`
        lost.is_active = true
        AND ST_DWithin(
          lost.location::geography,
          ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
          500
        )
      `, { lon: foundPet.lon, lat: foundPet.lat })
      .getMany();

    logger.info(`[FoundPetsService] ${lostPets.length} mascotas perdidas en radio de 500m`);

    for (const pet of lostPets) {
      const html = generateFoundPetEmailTemplate(foundPet, {
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        color: pet.color,
        size: pet.size,
        description: pet.description,
        photo_url: pet.photo_url,
        owner_name: pet.owner_name,
        owner_email: pet.owner_email,
        owner_phone: pet.owner_phone,
        lat: (pet.location as any).coordinates[1],
        lon: (pet.location as any).coordinates[0],
        address: pet.address,
        lost_date: pet.lost_date,
      });

      await this.emailService.sendEmail({
        to: pet.owner_email,
        subject: 'Posible coincidencia con tu mascota perdida',
        html,
      });
    }

    return newFoundPet;
  }
}