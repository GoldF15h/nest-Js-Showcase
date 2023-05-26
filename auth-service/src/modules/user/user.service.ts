import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getUserById(userId: string) {
    return this.userModel.findOne(
      { _id: userId, isDeleted: false },
      '-_id -__v',
    );
  }

  async getAllUsers() {
    return this.userModel.find({ isDeleted: false });
  }

  async updateUser(userId: string, newUserData: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, newUserData, { new: true });
  }

  async deleteUserById(userId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true },
    );
  }
}
