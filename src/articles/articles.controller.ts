import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const date = new Date();
@Controller('articles')
export class ArticlesController {
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') +
            '_photo_' +
            date.getTime();
          const extname: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extname}`);
        },
      }),
    }),
  )
  @Post()
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
