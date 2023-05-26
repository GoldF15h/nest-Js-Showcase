import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create user
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  // get user
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  // get all user
  @Get()
  async getAllUser() {
    return await this.userService.getAllUsers();
  }

  // update user
  @Put()
  async updateUser(@Body() updateUserDto: any) {
    return await this.userService.updateUser(updateUserDto.id, updateUserDto);
  }

  // deleted user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }
}
