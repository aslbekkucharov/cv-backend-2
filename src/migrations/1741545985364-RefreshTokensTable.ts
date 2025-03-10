import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokensTable1741545985364 implements MigrationInterface {
    name = 'RefreshTokensTable1741545985364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "username" character varying NOT NULL, "expiryDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_token"`);
    }

}
