import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { ProductsService } from './product.service';
import { CreateProductInput } from './dto/create-product.dto';
import { UpdateProductInput } from './dto/update-product.dto';
import { Category } from '../categories/entities/category.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @Query(() => Product, { nullable: true })
  async product(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productsService.createProduct(createProductInput);
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productsService.updateProduct(id, updateProductInput);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productsService.deleteProduct(id);
  }

  @ResolveField(() => Category, { nullable: true })
  async category(@Parent() product: Product) {
    return this.productsService.getCategory(product.categoryId);
  }
}