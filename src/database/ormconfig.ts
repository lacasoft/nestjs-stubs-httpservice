import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: !!process.env.DB_MIGRATIONS,
  logging: process.env.APP_PRO ? false : !!process.env.DB_LOGGIN,
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: false,
});
