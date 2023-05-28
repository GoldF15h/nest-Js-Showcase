import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async signIn(username, pass) {
    let user;
    try {
      const userResponse$ = this.userClient.send('user_profile', username);
      user = await lastValueFrom(userResponse$);
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user._id,
      username: user.userName,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
