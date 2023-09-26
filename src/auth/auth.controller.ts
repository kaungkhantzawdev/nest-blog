import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { BaseResponseInterceptor } from '../interceptors/base-response.interceptor';
import { ResponseMessage } from '../dtos/response-message.decorator';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UseInterceptors(BaseResponseInterceptor)
  @ResponseMessage('Hello sign in')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signupService(body.name, body.email, body.password);
  }

  @Post('/sign-in')
  @UseInterceptors(BaseResponseInterceptor)
  @ResponseMessage('Hello sign in')
  singIn(@Body() body: SignInDto) {
    return this.authService.singInService(body.email, body.password);
  }
}
