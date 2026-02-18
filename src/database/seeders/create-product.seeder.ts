import { DataSource } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';

export class CreateProductsSeeder {
  static async run(dataSource: DataSource) {
    const categoryRepository = dataSource.getRepository(Category);
    const productRepository = dataSource.getRepository(Product);

    // Create sample categories
    const electronics = categoryRepository.create({ name: 'Electronics' });
    const fashion = categoryRepository.create({ name: 'Fashion' });

    await categoryRepository.save([electronics, fashion]);

    // Create sample products
    const products = [
      productRepository.create({
        name: 'iPhone 14',
        price: 1200,
        discount: 0,
        rating: 5,
        category: electronics,
      }),
      productRepository.create({
        name: 'T-Shirt',
        price: 25,
        discount: 0,
        rating: 4,
        category: fashion,
      }),
      productRepository.create({
        name: 'Laptop',
        price: 1500,
        discount: 100,
        rating: 5,
        category: electronics,
      }),
    ];

    await productRepository.save(products);

    // console.log('Seeder finished: Categories & Products added!');
  }
}
