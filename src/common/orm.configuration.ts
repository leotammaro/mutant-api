import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
};

export default new DataSource({
  ...ormConfig,
  entities: [
    join(__dirname, '../modules/**/infrastructure/database/*.entity.ts'),
  ],
  migrations: ['./data/migrations/*.ts'],
});
