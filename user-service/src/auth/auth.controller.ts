import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { AdminAuthGuard, UserAuthGuard } from './auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(UserAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.userService.getUserByUserName(req.user.username);
  }

  @UseGuards(UserAuthGuard)
  @Get('test-user')
  testUser() {
    return 'I AM USER';
  }

  @UseGuards(AdminAuthGuard)
  @Get('test-admin')
  testAdmin() {
    return 'I AM ADMIN';
  }
}
