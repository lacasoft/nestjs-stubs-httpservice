import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HealthIndicator } from './health/health';
import { AppController } from './app.controller';
import { validationSchema } from './utils/environment.validations';
import { ApiKeyStrategy } from './auth/strategy/apikey.strategy';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TerminusModule,
    ConfigModule.forRoot({
      validationSchema,
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [HealthIndicator, ApiKeyStrategy],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(AppController);
  }
}
