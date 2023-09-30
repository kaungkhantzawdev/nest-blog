import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { BaseResponseInterceptor } from '../interceptors/base-response.interceptor';
import { ResponseMessage } from '../dtos/response-message.decorator';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req) {
    // Handle the authenticated user here.
    console.log('google user', req.user);
    const { displayName, emails, id } = req.user.profile;
    return this.authService.signupService(displayName, emails[0].value, id);
  }
}
