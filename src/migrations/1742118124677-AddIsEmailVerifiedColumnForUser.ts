import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsEmailVerifiedColumnForUser1742118124677 implements MigrationInterface {
    name = 'AddIsEmailVerifiedColumnForUser1742118124677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isEmailVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isEmailVerified"`);
    }

}
