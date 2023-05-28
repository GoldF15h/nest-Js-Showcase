import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  userService: any;
  constructor(
    @Inject('USER') private readonly userClient: ClientProxy,
    @Inject('AUTH') private readonly authClient: ClientProxy,
  ) {}

  async signIn(username, password) {
    try {
      const loginResponse$ = this.authClient.send('user_login', {
        username,
        password,
      });
      return await lastValueFrom(loginResponse$);
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }

  async getProfile(username: string) {
    try {
      console.log('getting profile');
      const getProfileResponse$ = this.userClient.send(
        'user_profile',
        username,
      );
      return await lastValueFrom(getProfileResponse$);
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }
}
