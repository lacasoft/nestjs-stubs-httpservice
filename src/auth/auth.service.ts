import {>>>>>JWT_EXTERN Inject,<<<<<JWT_EXTERN Injectable } from '@nestjs/common';>>>>>JWT_EXTERN
import { ClientProxy } from '@nestjs/microservices';<<<<<JWT_EXTERN>>>>>JWT_LOCAL
import { JwtService } from '@nestjs/jwt';<<<<<JWT_LOCAL

import { tokenNotFound } from '../constants/errors';
import { Session } from '../interfaces/session';

export const AUTH_MC_CLIENT = 'AUTH_MC_CLIENT';
export const AUTH_SERVICE = 'AUTH_SERVICE';

@Injectable()
export class AuthService {
  constructor(>>>>>JWT_LOCAL
    private jwtService: JwtService,<<<<<JWT_LOCAL>>>>>JWT_EXTERN
    @Inject(AUTH_MC_CLIENT) private readonly client: ClientProxy,<<<<<JWT_EXTERN
  )
  {}
  >>>>>JWT_EXTERN
  validateJwt(token: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      this.client.send({ cmd: 'check' }, { token }).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: () => {
          reject(null);
        },
      });
    });
  }<<<<<JWT_EXTERN>>>>>JWT_LOCAL
  validateJwt(token: string): Promise<Session> {
    return new Promise(async (resolve, reject) => {
      const result: any = await this.jwtService.decode(token);

      if (result == null) {
        reject(tokenNotFound.message);
      }

      if (Date.now() > (result as any).exp * 1000) {
        reject(tokenNotFound.message);
      }

      resolve({
        userID: result.userID,
      });
    });
  }

  signJwt(payload: Session) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }<<<<<JWT_LOCAL
}
