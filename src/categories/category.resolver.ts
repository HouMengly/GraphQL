import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.dto';
import { UpdateCategoryInput } from './dto/update-category.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories() {
    const response = await this.categoryService.findAll();
    return response;
  }

  @Query(() => Category, { nullable: true })
  async category(@Args('id', { type: () => Int }) id: number) {
    const response = await this.categoryService.findOne(id);
    return response;
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const response =
      await this.categoryService.createCategory(createCategoryInput);
    return response;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    const response = await this.categoryService.updateCategory(
      id,
      updateCategoryInput,
    );
    return response;
  }

  @Mutation(() => Boolean) // Change to Boolean
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    // The service currently returns the Category, but we can ignore it here
    // or modify the service to return boolean.
    const result = await this.categoryService.deleteCategory(id);
    return !!result; // Returns true if result exists, false if null
  }
}
