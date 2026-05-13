import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPet } from 'src/core/db/entities/foundPet.entity';
import { LostPet } from 'src/core/db/entities/lostPet.entity';
import { FoundPetsController } from './found-pets.controller';
import { FoundPetsService } from './found-pets.service';
import { EmailModule } from 'src/email/email.module';
import { CacheModule } from 'src/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FoundPet, LostPet]),
    EmailModule,
    CacheModule,
  ],
  controllers: [FoundPetsController],
  providers: [FoundPetsService],
})
export class FoundPetsModule {}