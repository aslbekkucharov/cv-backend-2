import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenTableCreate1741553384491 implements MigrationInterface {
    name = 'RefreshTokenTableCreate1741553384491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "username" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
