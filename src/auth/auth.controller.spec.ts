import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            // Proporciona métodos mock que el controlador espera llamar
            // Por ejemplo, si login devuelve un token, puedes simularlo aquí
            login: jest.fn(() => 'mockedToken'),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token when provided with valid credentials', async () => {
    // Arrange
    const username = 'mi_usuario';
    const password = 'mi_contraseña';

    // Act
    const result = await controller.login(username, password, null);

    // Assert
    expect(result).toBeDefined();
  });
});
