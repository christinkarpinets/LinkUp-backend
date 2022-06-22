import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('login')
  login(@Body() body: LoginUserDto): any {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: CreateUserDto): any {
    return this.authService.register(body);
  }
}
