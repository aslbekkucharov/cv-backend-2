import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshTokenIsActiveColumnDefaultValue1741807374216 implements MigrationInterface {
    name = 'RefreshTokenIsActiveColumnDefaultValue1741807374216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "isActive" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_token" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
