import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateOrReject } from 'class-validator';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private users: User[] = [];
  private idCounter = 1;

  constructor(private readonly jwtService: JwtService) {}

  async signup(userDto: UserDto): Promise<Omit<User, 'password'>> {
    await validateOrReject(userDto);

    const { email } = userDto;

    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const newUser: User = {
      id: this.idCounter++,
      ...userDto,
    };

    this.users.push(newUser);

    const result = { ...newUser };
    delete result.password;
    return result;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.users.find((user) => user.id === payload.sub) || null;
  }
}
