import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1716661004747 implements MigrationInterface {
    name = 'Initial1716661004747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL DEFAULT 'Unknown Address', "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "total" numeric(10,2) NOT NULL, "user_id" uuid, "orderDetailId" uuid, CONSTRAINT "REL_749e30f71cc0d2d95f8546f459" UNIQUE ("orderDetailId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" text NOT NULL, "categoryIdId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_order_details_order_detail" ("productsId" uuid NOT NULL, "orderDetailId" uuid NOT NULL, CONSTRAINT "PK_5e60e7035254a416ee420481a05" PRIMARY KEY ("productsId", "orderDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37660b4b289303213a22a093fe" ON "products_order_details_order_detail" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_de4656b1b135ed017e4ee43076" ON "products_order_details_order_detail" ("orderDetailId") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33b88e166df04f2d9291628bebb" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_detail" ADD CONSTRAINT "FK_37660b4b289303213a22a093fe6" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_detail" ADD CONSTRAINT "FK_de4656b1b135ed017e4ee43076b" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_order_details_order_detail" DROP CONSTRAINT "FK_de4656b1b135ed017e4ee43076b"`);
        await queryRunner.query(`ALTER TABLE "products_order_details_order_detail" DROP CONSTRAINT "FK_37660b4b289303213a22a093fe6"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33b88e166df04f2d9291628bebb"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_749e30f71cc0d2d95f8546f4592"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de4656b1b135ed017e4ee43076"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37660b4b289303213a22a093fe"`);
        await queryRunner.query(`DROP TABLE "products_order_details_order_detail"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
