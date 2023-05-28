import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schemas';
import { CreateUsersDto, UpdateUsersDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async createUser(createUserDto: CreateUsersDto): Promise<Types.ObjectId> {
    try {
      const existingUser = await this.userModel.findOne({
        userName: createUserDto.userName,
      });
      if (existingUser) {
        throw new BadRequestException('Username is already in use.');
      }

      const createdUser = new this.userModel(createUserDto);
      return (await createdUser.save())._id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createAdminUser(
    createUserDto: CreateUsersDto,
  ): Promise<Types.ObjectId> {
    try {
      const existingUser = await this.userModel.findOne({
        userName: createUserDto.userName,
      });
      if (existingUser) {
        throw new BadRequestException('Username is already in use.');
      }

      const createdUser = new this.userModel({
        ...createUserDto,
        role: 'admin',
      });
      return (await createdUser.save())._id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getUserById(userId: string) {
    try {
      return this.userModel.findOne(
        { _id: userId, isDeleted: false },
        '-_id -__v',
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getUserByUserName(userName: string) {
    try {
      return this.userModel.findOne({ userName: userName, isDeleted: false });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getAllUsers() {
    try {
      return this.userModel.find({ isDeleted: false });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(
    userId: string,
    newUserData: UpdateUsersDto,
  ): Promise<Users> {
    try {
      return await this.userModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUserById(userId: string): Promise<Users> {
    try {
      return this.userModel.findByIdAndUpdate(
        userId,
        { isDeleted: true },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
