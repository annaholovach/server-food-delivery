import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatingTables1685555091176 implements MigrationInterface {
  name = 'CreatingTables1685555091176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying(100) NOT NULL, "price" double precision NOT NULL, "image" character varying NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts_lists_products_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cartId" uuid, "productId" uuid, CONSTRAINT "PK_53e8c63a213f889b352add9159b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('Male', 'Female', 'Unknown')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "surname" character varying(100) NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "gender" "public"."users_gender_enum" NOT NULL DEFAULT 'Unknown', "address" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."orders_status_enum" AS ENUM('New', 'Complecting', 'Delivering', 'Lost', 'Cancelled', 'Done')`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."orders_status_enum" NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_to_order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" uuid, "productId" uuid, CONSTRAINT "PK_c8cdf4a201263c15f99994bba71" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "carts_lists_products_carts_lists_products_products" ("cartsId" uuid NOT NULL, "cartsListsProductsProductsId" uuid NOT NULL, CONSTRAINT "PK_c6dec466bc2adcaf19fdcc90ac6" PRIMARY KEY ("cartsId", "cartsListsProductsProductsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_904cb288a9fb17f4ac72e8f4da" ON "carts_lists_products_carts_lists_products_products" ("cartsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b547080df4c30d1d045f1fc5ea" ON "carts_lists_products_carts_lists_products_products" ("cartsListsProductsProductsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_products" ADD CONSTRAINT "FK_f9c75c3bbd3c68df73d82d275ac" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_products" ADD CONSTRAINT "FK_659d9a58c3654adfa934f68f717" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_order" ADD CONSTRAINT "FK_37a14f7472c66e24dd48688869a" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_order" ADD CONSTRAINT "FK_9a4a5afa8072e977f6cf5751dd8" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_carts_lists_products_products" ADD CONSTRAINT "FK_904cb288a9fb17f4ac72e8f4da9" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_carts_lists_products_products" ADD CONSTRAINT "FK_b547080df4c30d1d045f1fc5ea0" FOREIGN KEY ("cartsListsProductsProductsId") REFERENCES "carts_lists_products_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_carts_lists_products_products" DROP CONSTRAINT "FK_b547080df4c30d1d045f1fc5ea0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_carts_lists_products_products" DROP CONSTRAINT "FK_904cb288a9fb17f4ac72e8f4da9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_order" DROP CONSTRAINT "FK_9a4a5afa8072e977f6cf5751dd8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_to_order" DROP CONSTRAINT "FK_37a14f7472c66e24dd48688869a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_products" DROP CONSTRAINT "FK_659d9a58c3654adfa934f68f717"`,
    );
    await queryRunner.query(
      `ALTER TABLE "carts_lists_products_products" DROP CONSTRAINT "FK_f9c75c3bbd3c68df73d82d275ac"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b547080df4c30d1d045f1fc5ea"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_904cb288a9fb17f4ac72e8f4da"`,
    );
    await queryRunner.query(
      `DROP TABLE "carts_lists_products_carts_lists_products_products"`,
    );
    await queryRunner.query(`DROP TABLE "product_to_order"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "carts_lists_products_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
