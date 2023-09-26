import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { BaseResponseInterceptor } from '../interceptors/base-response.interceptor';
import { ResponseMessage } from '../dtos/response-message.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UseInterceptors(BaseResponseInterceptor)
  @ResponseMessage('All users data')
  findAllUsers() {
    return this.usersService.findAll();
  }

}
