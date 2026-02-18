import { Module } from "@nestjs/common";
import { CategoryResolver } from "./category.resolver";
import { CategoryService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Product } from "../products/entities/product.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoryResolver, CategoryService],
    exports: [CategoryService]
})
export class CategoryModule {}