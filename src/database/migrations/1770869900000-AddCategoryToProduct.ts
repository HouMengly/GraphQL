import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryToProduct1770869900000 implements MigrationInterface {
    name = 'AddCategoryToProduct1770869900000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_product_category" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_product_category"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
    }
}