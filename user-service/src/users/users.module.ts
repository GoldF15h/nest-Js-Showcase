import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schemas';
import { AdminAuthGuard, UserAuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule,
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
