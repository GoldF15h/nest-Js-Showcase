import {
  BadRequestException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Users } from './schemas/users.schemas';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USER') private userClient: ClientProxy) {}

  async createUser(createUserDto: CreateUsersDto): Promise<Types.ObjectId> {
    try {
      const userResponse$ = this.userClient.send('user_create', createUserDto);
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAdminUser(
    createUserDto: CreateUsersDto,
  ): Promise<Types.ObjectId> {
    try {
      const userResponse$ = this.userClient.send('admin_create', createUserDto);
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(userId: string) {
    try {
      const userResponse$ = this.userClient.send('user_get_by_id', userId);
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUsers() {
    try {
      const userResponse$ = this.userClient.send('user_get_all', {});
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new ServiceUnavailableException(error.message);
    }
  }

  async updateUser(updateUsersDto: UpdateUsersDto): Promise<Users> {
    try {
      const userResponse$ = this.userClient.send('user_update', updateUsersDto);
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUserById(userId: string): Promise<Users> {
    try {
      const userResponse$ = this.userClient.send('user_delete', userId);
      return await lastValueFrom(userResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
