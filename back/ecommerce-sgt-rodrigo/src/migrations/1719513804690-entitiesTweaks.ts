import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesTweaks1719513804690 implements MigrationInterface {
    name = 'EntitiesTweaks1719513804690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33b88e166df04f2d9291628bebb"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "categoryIdId" TO "category_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "category_id" TO "categoryIdId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33b88e166df04f2d9291628bebb" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
