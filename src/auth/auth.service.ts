import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signupService(name: string, email: string, input_password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email has already used.');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(input_password, salt);

    const createdUser = await this.usersService.create({
      name,
      email,
      password,
    });

    const payload = { email: createdUser.email, username: createdUser.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        email: createdUser.email,
        name: createdUser.name,
      },
    };
  }

  async singInService(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email or password is invalid.');
    }
    const payload = { email: user.email, username: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }
}
