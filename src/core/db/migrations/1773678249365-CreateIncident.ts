import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncident1773678249365 implements MigrationInterface {
    name = 'CreateIncident1773678249365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."found_pets_species_enum" RENAME TO "found_pets_species_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_species_enum" AS ENUM('perro', 'gato', 'pajaro', 'otro')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ALTER COLUMN "species" TYPE "public"."found_pets_species_enum" USING "species"::"text"::"public"."found_pets_species_enum"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_species_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."found_pets_size_enum" RENAME TO "found_pets_size_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_size_enum" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ALTER COLUMN "size" TYPE "public"."found_pets_size_enum" USING "size"::"text"::"public"."found_pets_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_size_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."lost_pets_species_enum" RENAME TO "lost_pets_species_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_species_enum" AS ENUM('perro', 'gato', 'pajaro', 'otro')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ALTER COLUMN "species" TYPE "public"."lost_pets_species_enum" USING "species"::"text"::"public"."lost_pets_species_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_species_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."lost_pets_size_enum" RENAME TO "lost_pets_size_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_size_enum" AS ENUM('pequeño', 'mediano', 'grande')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ALTER COLUMN "size" TYPE "public"."lost_pets_size_enum" USING "size"::"text"::"public"."lost_pets_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_size_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_size_enum_old" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ALTER COLUMN "size" TYPE "public"."lost_pets_size_enum_old" USING "size"::"text"::"public"."lost_pets_size_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_size_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."lost_pets_size_enum_old" RENAME TO "lost_pets_size_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_species_enum_old" AS ENUM('dog', 'cat', 'bird', 'other')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ALTER COLUMN "species" TYPE "public"."lost_pets_species_enum_old" USING "species"::"text"::"public"."lost_pets_species_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_species_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."lost_pets_species_enum_old" RENAME TO "lost_pets_species_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_size_enum_old" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ALTER COLUMN "size" TYPE "public"."found_pets_size_enum_old" USING "size"::"text"::"public"."found_pets_size_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_size_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."found_pets_size_enum_old" RENAME TO "found_pets_size_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_species_enum_old" AS ENUM('dog', 'cat', 'bird', 'other')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ALTER COLUMN "species" TYPE "public"."found_pets_species_enum_old" USING "species"::"text"::"public"."found_pets_species_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_species_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."found_pets_species_enum_old" RENAME TO "found_pets_species_enum"`);
    }

}
