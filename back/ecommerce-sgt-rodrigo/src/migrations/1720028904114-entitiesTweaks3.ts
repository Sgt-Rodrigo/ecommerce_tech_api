import { MigrationInterface, QueryRunner } from "typeorm";

export class EntitiesTweaks31720028904114 implements MigrationInterface {
    name = 'EntitiesTweaks31720028904114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop existing foreign key constraint on orders table
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);

        // Rename existing order_detail table to order_details
        await queryRunner.query(`ALTER TABLE "order_detail" RENAME TO "order_details"`);

        // Add foreign key constraint with the renamed table
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "order_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraint
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);

        // Rename back to original table name
        await queryRunner.query(`ALTER TABLE "order_details" RENAME TO "order_detail"`);

        // Recreate the original foreign key constraint on orders table
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
