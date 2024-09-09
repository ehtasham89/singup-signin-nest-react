import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateOrReject } from 'class-validator';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // Signup function to store users in MongoDB with Prisma
  async signup(userDto: UserDto): Promise<Omit<UserDto, 'password'>> {
    await validateOrReject(userDto);
    const { email, password } = userDto;

    // Check if a user with the same email exists in the database
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the MongoDB database
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: userDto.name,
      },
    });

    // Return the user data without the password
    const result = { ...newUser };
    delete result.password;
    return result;
  }

  // Login function to authenticate users and return JWT token
  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;

    // Find the user in the MongoDB database
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload and sign the token
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // Validate user by their JWT payload
  async validateUser(payload: JwtPayload): Promise<UserDto | null> {
    return await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
  }
}
