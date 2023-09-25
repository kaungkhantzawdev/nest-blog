import { BadRequestException, Injectable } from '@nestjs/common';
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

    const payload = { sub: createdUser.email, username: createdUser.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        email: createdUser.email,
        name: createdUser.name,
      },
    };
  }
}
