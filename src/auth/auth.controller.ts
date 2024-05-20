import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiKeyGuard } from './auth.apiKey.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(ApiKeyGuard)
  @Post('check-api-key')
  async check() {
    return 'ok';
  }
}
