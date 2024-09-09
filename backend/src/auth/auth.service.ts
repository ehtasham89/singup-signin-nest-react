import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  private users: User[] = [];
  private idCounter = 1;

  async signup(userDto: UserDto): Promise<Omit<User, 'password'>> {
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

  async login(loginUserDto: LoginUserDto): Promise<Omit<User, 'password'>> {
    const { email, password } = loginUserDto;

    const user = this.users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const result = { ...user };
    delete result.password;
    return result;
  }
}
