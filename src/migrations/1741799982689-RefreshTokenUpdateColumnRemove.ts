import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenUpdateColumnRemove1741799982689 implements MigrationInterface {
    name = 'RefreshTokenUpdateColumnRemove1741799982689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
