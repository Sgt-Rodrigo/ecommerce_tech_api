import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminRemoveRoles1717085120129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.query(`
                ALTER TABLE "users"
                ADD "isAdmin" boolean DEFAULT false
            `);
            //w removes the "roles" column if it still exists:
            await queryRunner.query(`
                ALTER TABLE "users"
                DROP COLUMN "roles"
            `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
