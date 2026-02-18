import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductInput } from './dto/create-product.dto';
import { Category } from '../categories/entities/category.entity';
import { UpdateProductInput } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async createProduct(createProductInput: CreateProductInput): Promise<Product> {
        const product = this.productRepository.create(createProductInput);
        return this.productRepository.save(product);
    }

    async updateProduct(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
        const product = await this.findOne(id);
        Object.assign(product, updateProductInput);
        return this.productRepository.save(product);
    }

    async deleteProduct(id: number): Promise<Product> {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return product;
    }

    async getCategory(categoryId: number): Promise<Category | null> {
        if (!categoryId) return null;
        return this.categoryRepository.findOne({ where: { id: categoryId } });
    }
}