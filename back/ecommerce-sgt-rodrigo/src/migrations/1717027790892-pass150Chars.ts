import { MigrationInterface, QueryRunner } from "typeorm";

export class Pass150Chars1717027790892 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
    ALTER TABLE "user"
    ALTER COLUMN "password" TYPE VARCHAR(150)
  `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
