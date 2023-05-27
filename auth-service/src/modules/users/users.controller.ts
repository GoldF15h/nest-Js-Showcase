import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  // create user
  @Post()
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    return await this.usersService.createUser(createUsersDto);
  }

  // get user
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  // get all user
  @Get()
  async getAllUser() {
    return await this.usersService.getAllUsers();
  }

  // update user
  @Put()
  async updateUser(@Body() updateUsersDto: UpdateUsersDto) {
    return await this.usersService.updateUser(
      updateUsersDto.id,
      updateUsersDto,
    );
  }

  // deleted user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
