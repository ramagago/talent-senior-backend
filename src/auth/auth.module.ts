import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ApiKeyService } from './apiKey.service';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './auth.apiKey.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiKeyService, ApiKeyGuard],
  exports: [ApiKeyService],
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: 'your_secret_key', // Put your secret key here
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
})
export class AuthModule {}
