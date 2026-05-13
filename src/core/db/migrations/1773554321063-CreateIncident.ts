import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIncident1773554321063 implements MigrationInterface {
    name = 'CreateIncident1773554321063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "found_pets" DROP COLUMN "species"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_species_enum" AS ENUM('dog', 'cat', 'bird', 'other')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ADD "species" "public"."found_pets_species_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "found_pets" DROP COLUMN "size"`);
        await queryRunner.query(`CREATE TYPE "public"."found_pets_size_enum" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`ALTER TABLE "found_pets" ADD "size" "public"."found_pets_size_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lost_pets" DROP COLUMN "species"`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_species_enum" AS ENUM('dog', 'cat', 'bird', 'other')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ADD "species" "public"."lost_pets_species_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lost_pets" DROP COLUMN "size"`);
        await queryRunner.query(`CREATE TYPE "public"."lost_pets_size_enum" AS ENUM('small', 'medium', 'large')`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ADD "size" "public"."lost_pets_size_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lost_pets" DROP COLUMN "size"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_size_enum"`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ADD "size" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "lost_pets" DROP COLUMN "species"`);
        await queryRunner.query(`DROP TYPE "public"."lost_pets_species_enum"`);
        await queryRunner.query(`ALTER TABLE "lost_pets" ADD "species" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "found_pets" DROP COLUMN "size"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_size_enum"`);
        await queryRunner.query(`ALTER TABLE "found_pets" ADD "size" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "found_pets" DROP COLUMN "species"`);
        await queryRunner.query(`DROP TYPE "public"."found_pets_species_enum"`);
        await queryRunner.query(`ALTER TABLE "found_pets" ADD "species" character varying NOT NULL`);
    }

}
