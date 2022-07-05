import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  apiKeys: string[] = [process.env.API_KEY];
  constructor() {
    super(
      { header: 'x-api-key', prefix: '' },
      true,
      (apikey: string, done: any) => {
        const checkKey = this.validateApiKey(apikey);
        if (!checkKey) {
          return done(false);
        }
        return done(true);
      },
    );
  }

  validateApiKey(apiKey: string) {
    return this.apiKeys.find((apiK) => apiKey === apiK);
  }
}
