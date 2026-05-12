import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }

  @Post('/login')
  @HttpCode(200)
  singIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.singIn(loginUserDto);
  }
}
