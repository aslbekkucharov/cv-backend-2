import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenHashFieldAdd1741555077481 implements MigrationInterface {
    name = 'RefreshTokenHashFieldAdd1741555077481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "token"`);
    }

}
