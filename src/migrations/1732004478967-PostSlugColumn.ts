import { MigrationInterface, QueryRunner } from 'typeorm'

export class PostSlugColumn1732004478967 implements MigrationInterface {
  name = 'PostSlugColumn1732004478967'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ADD "slug" character varying NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "slug"`)
  }
}
