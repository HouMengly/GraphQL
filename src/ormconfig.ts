import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: '123',
    database: 'ecommerce',
    entities: [__dirname + '/**/*.entity{.js,.ts}'],
    migrationsTableName: 'migration',
    migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
    synchronize: true
};

const AppDataSource = new DataSource(config);

export {AppDataSource};

export default config;