import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as safeCompare from 'safe-compare';

@Injectable()
export class ApiKeyService {
  constructor(private configService: ConfigService) {}

  isKeyValid(key: string) {
    const apiKey = this.configService.get('API_KEY');
    console.log('apiKEY ENV', apiKey);
    console.log('apiKEY PROVIDED', key);
    return safeCompare(key, apiKey);
  }
}
