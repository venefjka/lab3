import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1715860621842 implements MigrationInterface {
  name = 'Initial1715860621842';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "desc" character varying NOT NULL, "price" integer NOT NULL, "inStock" boolean NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" character varying NOT NULL, "clientId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_order" ("order_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_1eebf3def9656af1f544ce78c44" PRIMARY KEY ("order_id", "product_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_44a63452d4f45e3e54a3028e9e" ON "product_order" ("order_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a8da6a067cb59557b708fd4a2" ON "product_order" ("product_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" ADD CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" ADD CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_order" DROP CONSTRAINT "FK_2a8da6a067cb59557b708fd4a29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_order" DROP CONSTRAINT "FK_44a63452d4f45e3e54a3028e9e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9b27855a9c2ade186e5c55d1ec3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a8da6a067cb59557b708fd4a2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_44a63452d4f45e3e54a3028e9e"`,
    );
    await queryRunner.query(`DROP TABLE "product_order"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
