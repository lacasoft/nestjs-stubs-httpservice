import {
  Inject,
  Injectable,
  SetMetadata,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Reflector } from '@nestjs/core';

import { AuthService, AUTH_SERVICE } from './auth.service';

// Constante para declara publica una ruta
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private user: any;

  constructor(
    private reflector: Reflector,
    @Inject(AUTH_SERVICE) private authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificamos si es ruta pública
    const isPublic =
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || false;
    if (isPublic) {
      return true;
    }

    // Conectamos con servicio externo de JWT
    const request =
      'switchToHttp' in context
        ? context.switchToHttp().getRequest()
        : (context as any).args[0];
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    this.user = await this.authService.validateJwt(token);

    if (this.user == null) {
      throw new UnauthorizedException();
    }

    super.canActivate(context);
    return this.user != null;
  }

  handleRequest(err, user, info) {
    if (err) {
      return err;
    }
    if (this.user == null) {
      return new UnauthorizedException();
    }

    if ('user_id' in this.user) {
      this.user.userId = this.user.user_id;
      delete this.user.user_id;
    }

    return this.user;
  }
}
