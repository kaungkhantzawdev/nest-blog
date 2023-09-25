import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { BaseResponseInterceptor } from '../interceptors/base-response.interceptor';
import { ResponseMessage } from '../dtos/response_message.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UseInterceptors(BaseResponseInterceptor)
  @ResponseMessage('Hello sign in')
  signup(@Body() body: SignUpDto) {
    return this.authService.signupService(body.name, body.email, body.password);
  }
}
