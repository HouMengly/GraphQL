import { AppDataSource } from "src/ormconfig";
import { CreateProductsSeeder } from "./seeders/create-product.seeder";

async function runSeeders() {
  try {
    await AppDataSource.initialize();
    console.log('DataSource initialized');

    await CreateProductsSeeder.run(AppDataSource);

    console.log('Seeding finished!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

runSeeders();
