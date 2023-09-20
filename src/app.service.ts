import { Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(@Res() res: Response): Response {
    return res.json({ hello: 'Hello World!' });
  }
}
