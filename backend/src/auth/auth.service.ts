import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
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

  async signup(userDto: UserDto): Promise<Omit<UserDto, 'password'>> {
    await validateOrReject(userDto);
    const { email, password } = userDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: userDto.name,
      },
    });

    const result = { ...newUser };
    delete result.password;
    return result;
  }

  async login(
    loginUserDto: LoginUserDto,
    res: Response,
  ): Promise<{ message?: string, accessToken?: string }> {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

    //HttpOnly cookie if 'res' is passed, a secure way to prevent XSS attacks
    if (res) {
      res.cookie('token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // https only if NODE_ENV is set to 'production'
        sameSite: 'strict',
        maxAge: 900000, // 15 minutes expiration
      });
      return { message: 'Login successful' };
    } else {
      return { accessToken };
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserDto | null> {
    return await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
  }
}
