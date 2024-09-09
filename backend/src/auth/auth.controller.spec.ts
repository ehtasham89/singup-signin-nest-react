import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const userDto: UserDto = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Password@123',
      };

      const result = await service.signup(userDto);
      expect(result).toEqual({
        id: expect.any(Number),
        name: 'Test User',
        email: 'testuser@example.com',
      });
    });

    it('should throw an error if email already exists', async () => {
      const userDto: UserDto = {
        name: 'Test User',
        email: 'existinguser@example.com',
        password: 'Password@123',
      };

      await service.signup(userDto);

      await expect(service.signup(userDto)).rejects.toThrow(
        'User with this email already exists',
      );
    });
  });

  describe('login', () => {
    it('should return user data when credentials are valid', async () => {
      const createUserDto: UserDto = {
        name: 'Valid User',
        email: 'validuser@example.com',
        password: 'Valid@Pass123',
      };

      await service.signup(createUserDto);

      const result = await service.login({
        email: 'validuser@example.com',
        password: 'Valid@Pass123',
      });

      expect(result).toEqual({
        id: expect.any(Number),
        name: 'Valid User',
        email: 'validuser@example.com',
      });
    });

    it('should throw an error when credentials are invalid', async () => {
      const userDto: UserDto = {
        name: 'Invalid User',
        email: 'invaliduser@example.com',
        password: 'Valid@Pass123',
      };

      await service.signup(userDto);

      await expect(
        service.login({
          email: 'invaliduser@example.com',
          password: 'WrongPassword',
        }),
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
