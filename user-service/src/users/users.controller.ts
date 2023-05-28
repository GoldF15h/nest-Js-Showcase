import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('user_create')
  async createUser(createUsersDto: CreateUsersDto) {
    try {
      return await this.usersService.createUser(createUsersDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('admin_create')
  async createAdminUser(createUsersDto: CreateUsersDto) {
    try {
      return await this.usersService.createAdminUser(createUsersDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('user_get_by_id')
  async getUser(id: string) {
    try {
      return await this.usersService.getUserById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('user_get_all')
  async getAllUser() {
    try {
      return await this.usersService.getAllUsers();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('user_update')
  async updateUser(updateUsersDto: UpdateUsersDto) {
    try {
      return await this.usersService.updateUser(
        updateUsersDto.id,
        updateUsersDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('user_profile')
  async getUserByUsername(username: string) {
    try {
      return await this.usersService.getUserByUserName(username);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('user_delete')
  async deleteUser(userId: string) {
    try {
      return await this.usersService.deleteUserById(userId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
