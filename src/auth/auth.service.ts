import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly username = 'mi_usuario';
  private readonly password = 'mi_contraseña';

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    return username === this.username && password === this.password;
  }

  async login(username: string, password: string): Promise<string> {
    if (await this.validateUser(username, password)) {
      const payload = { username };
      const token = this.jwtService.sign(payload);
      return token;
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}
