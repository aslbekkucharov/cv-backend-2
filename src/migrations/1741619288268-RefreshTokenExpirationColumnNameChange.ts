import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenExpirationColumnNameChange1741619288268 implements MigrationInterface {
    name = 'RefreshTokenExpirationColumnNameChange1741619288268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" RENAME COLUMN "expirationDate" TO "expiresIn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" RENAME COLUMN "expiresIn" TO "expirationDate"`);
    }

}
