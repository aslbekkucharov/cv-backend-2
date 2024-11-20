import { MigrationInterface, QueryRunner } from "typeorm";

export class PostSlugIsUnique1732094830756 implements MigrationInterface {
    name = 'PostSlugIsUnique1732094830756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE ("slug")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "UQ_cd1bddce36edc3e766798eab376"`);
    }

}
