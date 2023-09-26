import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nestblog'),
    JwtModule.register({
      global: true,
      secret: 'abc',
      signOptions: { expiresIn: '1hr' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
