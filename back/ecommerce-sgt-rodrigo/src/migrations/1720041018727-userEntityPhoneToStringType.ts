import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEntityPhoneToStringType1720041018727 implements MigrationInterface {
    name = 'UserEntityPhoneToStringType1720041018727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" TYPE varchar USING "phone"::varchar`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" TYPE integer USING "phone"::integer`);
    }

}
