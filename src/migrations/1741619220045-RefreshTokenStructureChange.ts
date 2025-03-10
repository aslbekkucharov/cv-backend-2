import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenStructureChange1741619220045 implements MigrationInterface {
    name = 'RefreshTokenStructureChange1741619220045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "userAgent"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "ip"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "device" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "device"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "sessionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "ip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "userAgent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "username" character varying NOT NULL`);
    }

}
