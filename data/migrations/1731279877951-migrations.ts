import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731279877951 implements MigrationInterface {
  name = 'Migrations1731279877951';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dna_stats" ("id" character varying NOT NULL DEFAULT 'STATS', "humans_count" integer NOT NULL DEFAULT '0', "mutants_count" integer NOT NULL DEFAULT '0', "ratio" numeric(5,2) NOT NULL, CONSTRAINT "PK_d69b9e2f7e5629324322d9ff83b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "mutant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dna" text NOT NULL, CONSTRAINT "PK_1239eb306879f24298fae4ade84" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mutant"`);
    await queryRunner.query(`DROP TABLE "dna_stats"`);
  }
}
