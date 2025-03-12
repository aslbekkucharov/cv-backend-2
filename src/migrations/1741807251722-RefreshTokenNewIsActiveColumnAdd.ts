import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenNewIsActiveColumnAdd1741807251722 implements MigrationInterface {
    name = 'RefreshTokenNewIsActiveColumnAdd1741807251722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "isActive" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "isActive"`);
    }

}
