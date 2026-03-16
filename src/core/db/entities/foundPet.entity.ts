import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";
import { PetSize } from "src/core/enums/pet-size.enum";
import { PetSpecies } from "src/core/enums/pet-species.enum";

@Entity("found_pets")
export class FoundPet {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "enum",
    enum: PetSpecies
  })
  species!: PetSpecies;

  @Column({ nullable: true })
  breed?: string;

  @Column()
  color!: string;

  @Column({
    type: "enum",
    enum: PetSize
  })
  size!: PetSize;

  @Column({ type: "text" })
  description!: string;

  @Column({ nullable: true })
  photo_url?: string;

  @Column()
  finder_name!: string;

  @Column()
  finder_email!: string;

  @Column()
  finder_phone!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326
  })
  location!: Point;

  @Column()
  address!: string;

  @Column({ type: "timestamp" })
  found_date!: Date;

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "NOW()" })
  updated_at!: Date;
}