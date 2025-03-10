import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEmailFieldAdd1740246767444 implements MigrationInterface {
    name = 'UserEmailFieldAdd1740246767444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_3bd3f2e16165d1dac3e8e132863" UNIQUE ("image")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_3bd3f2e16165d1dac3e8e132863"`);
    }

}
