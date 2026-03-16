import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import type { Point } from "typeorm";
import { PetSize } from "src/core/enums/pet-size.enum";
import { PetSpecies } from "src/core/enums/pet-species.enum";

@Entity("lost_pets")
export class LostPet {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: "enum",
    enum: PetSpecies
  })
  species!: PetSpecies;

  @Column()
  breed!: string;

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
  owner_name!: string;

  @Column()
  owner_email!: string;

  @Column()
  owner_phone!: string;

  @Column({
    type: "geometry",
    spatialFeatureType: "Point",
    srid: 4326
  })
  location!: Point;

  @Column()
  address!: string;

  @Column({ type: "timestamp" })
  lost_date!: Date;

  @Column({ default: true })
  is_active!: boolean;

  @Column({ type: "timestamp", default: () => "NOW()" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "NOW()" })
  updated_at!: Date;
}