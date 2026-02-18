import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CreateCategoryInput } from './dto/create-category.dto';
import { UpdateCategoryInput } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving categories');
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) {
        throw new NotFoundException(`Category with ID ${id} does not exist.`);
      }

      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error retrieving category');
    }
  }

  async createCategory(createCategoryInput: CreateCategoryInput): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryInput);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new InternalServerErrorException('Error creating category');
    }
  }

  async updateCategory(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    try {
      const category = await this.findOne(id);
      Object.assign(category, updateCategoryInput);
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating category');
    }
  }

  async deleteCategory(id: number): Promise<Category> {
    try {
      const category = await this.findOne(id);

      await this.productRepository.update(
        { categoryId: id },
        { categoryId: undefined },
      );

      await this.categoryRepository.remove(category);
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error deleting category');
    }
  }
}