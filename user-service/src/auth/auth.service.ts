import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject('USER') private readonly userClient: ClientProxy,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.getUserByUserName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    try {
      const userResponse$ = this.userClient.send('get_user', {
        hello: 'world',
      });
      const userResponse = await lastValueFrom(userResponse$);
      console.log(userResponse);
    } catch (error) {
      throw new ServiceUnavailableException();
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
