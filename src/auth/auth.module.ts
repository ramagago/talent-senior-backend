import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Put your secret key here
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
})
export class AuthModule {}
