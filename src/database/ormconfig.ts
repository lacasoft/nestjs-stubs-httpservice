import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  migrationsRun: !!process.env.DB_MIGRATIONS,
  logging: process.env.APP_PRO ? false : !!process.env.DB_LOGGIN,
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  }, 
  ssl: false,
};

export = ormConfig;