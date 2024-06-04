import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './auth.apiKey.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(ApiKeyGuard)
  @Post('check-api-key')
  async check() {
    return 'ok';
  }
}
