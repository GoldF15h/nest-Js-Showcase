import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';
import { AdminAuthGuard, UserAuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  // create user
  @Post()
  async createUser(@Body() createUsersDto: CreateUsersDto) {
    return await this.usersService.createUser(createUsersDto);
  }

  // create admin user
  @Post('admin')
  async createAdminUser(@Body() createUsersDto: CreateUsersDto) {
    return await this.usersService.createAdminUser(createUsersDto);
  }

  // get user
  @UseGuards(UserAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  // get all user
  @UseGuards(AdminAuthGuard)
  @Get()
  async getAllUser() {
    return await this.usersService.getAllUsers();
  }

  // update user
  @UseGuards(AdminAuthGuard)
  @Put()
  async updateUser(@Body() updateUsersDto: UpdateUsersDto) {
    return await this.usersService.updateUser(
      updateUsersDto.id,
      updateUsersDto,
    );
  }

  // deleted user
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUserById(id);
  }
}
