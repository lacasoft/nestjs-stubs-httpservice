import { Global, Module } from '@nestjs/common';>>>>>JWT
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService, AUTH_SERVICE, AUTH_MC_CLIENT } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';<<<<<JWT
>>>>>APIKEY
import { ApiKeyStrategy } from './strategy/apikey.strategy';
<<<<<APIKEY

@Global()
@Module({
  imports: [>>>>>JWT
    ConfigModule.forRoot(),>>>>>JWT_EXTERN
    ClientsModule.registerAsync([
      {
        name: AUTH_MC_CLIENT,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
          return {
            name: AUTH_MC_CLIENT,
            transport: Transport.TCP,
            options: {
              host: configService.get('AUTH_HOST'),
              port: configService.get('AUTH_PORT'),
            },
          };
        },
      },
    ]),<<<<<JWT_EXTERN>>>>>JWT_LOCAL
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },
    }),
    PassportModule,<<<<<JWT_LOCAL<<<<<JWT
  ],
  providers: [>>>>>JWT
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: AUTH_SERVICE,
      useExisting: AuthService,
    },<<<<<JWT>>>>>APIKEY
    ApiKeyStrategy,<<<<<APIKEY
  ],>>>>>JWT
  exports: [
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: AUTH_SERVICE,
      useExisting: AuthService,
    },
  ],<<<<<JWT
})
export class AuthModule {}
