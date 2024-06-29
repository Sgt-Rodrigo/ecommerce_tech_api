import { MigrationInterface, QueryRunner } from "typeorm";

export class Tweaks21719693906393 implements MigrationInterface {
    name = 'Tweaks21719693906393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" SET DEFAULT 'https://res.cloudinary.com/da73rab2q/image/upload/v1716943567/mj1uafvrolxvn6dlenij.jpg'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imgUrl" DROP DEFAULT`);
    }

}
