import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeOfIdInProfileEntityChanged1742072114091 implements MigrationInterface {
    name = 'TypeOfIdInProfileEntityChanged1742072114091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "profile_id_seq" OWNED BY "profile"."id"`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "id" SET DEFAULT nextval('"profile_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "profile_id_seq"`);
    }

}
