import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApiKeyService } from './apiKey.service';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './auth.apiKey.guard';

@Module({
  controllers: [AuthController],
  providers: [ApiKeyService, ApiKeyGuard],
  exports: [ApiKeyService],
  imports: [ConfigModule],
})
export class AuthModule {}
