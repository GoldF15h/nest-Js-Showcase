import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @EventPattern('user_login')
  signIn(@Body() signInDto: SignInDto) {
    try {
      return this.authService.signIn(signInDto.username, signInDto.password);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
