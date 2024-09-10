import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    return await this.authService.signup(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res?: Response,
  ) {
    return await this.authService.login(loginUserDto, res);
  }
}
