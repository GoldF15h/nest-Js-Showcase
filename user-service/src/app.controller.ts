import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('get_user')
  handleUserCreated(data: any) {
    this.appService.handleUserCreated(data);
    throw new BadRequestException();
  }
}
