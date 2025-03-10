import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenTableSessionFieldsAdd1741584464433 implements MigrationInterface {
    name = 'RefreshTokenTableSessionFieldsAdd1741584464433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "userAgent" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "ip" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "sessionId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "ip"`);
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "userAgent"`);
    }

}
