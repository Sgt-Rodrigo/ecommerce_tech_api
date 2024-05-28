import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1716920208361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" VARCHAR(255) NOT NULL DEFAULT 'customer'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "users"
        DROP COLUMN "role"
    `);
    }

}
