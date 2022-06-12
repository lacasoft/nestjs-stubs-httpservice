import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: '{{ type }}',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        migrationsRun: configService.get('DB_NAME'),
        logging: configService.get('APP_PROD')
          ? false
          : configService.get('DB_LOGGIN'),
        entities: [__dirname + '/../**/*.entity.ts'],
        migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        cli: {
          migrationsDir: './migrations',
        },
        ssl: configService.get('DB_SSL'),
        autoLoadEntities: configService.get('DB_LOAD_ENTITIES'),
        synchronize: configService.get('DB_SYNC'),
        keepConnectionAlive: configService.get('DB_KEEP_CONNECTION'),
      }),
    }),
  ],
})
export class DatabaseModule {}
