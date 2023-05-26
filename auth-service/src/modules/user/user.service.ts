import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<Types.ObjectId> {
    try {
      const createdUser = new this.userModel(createUserDto);
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

  async getAllUsers() {
    try {
      return this.userModel.find({ isDeleted: false });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(userId: string, newUserData: UpdateUserDto): Promise<User> {
    try {
      return this.userModel.findByIdAndUpdate(userId, newUserData, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUserById(userId: string): Promise<User> {
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
