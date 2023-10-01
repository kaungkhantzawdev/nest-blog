import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { CreateArticleDto } from './dtos/create-article.dto';
import { ArticlesService } from './articles.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const date = new Date();
@Controller('articles')
export class ArticlesController {
  constructor(private articleService: ArticlesService) {}
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
  @Post('/upload')
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
        { name: 'cover_photo', maxCount: 1 },
        { name: 'detail_photos', maxCount: 5 },
      ],
      {
        storage: diskStorage({
          destination: './upload/article',
          filename: (req, file, cb) => {
            const filename: string =
              path.parse(file.originalname).name.replace(/\s/g, '') +
              '_photo_' +
              date.getTime();
            const extname: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extname}`);
          },
        }),
      },
    ),
  )
  @Post()
  createArticle(
    @UploadedFiles()
    files: {
      cover_photo?: Express.Multer.File[];
      detail_photos?: Express.Multer.File[];
    },
    @Body() body: CreateArticleDto,
  ) {
    const featuredPhoto = files.cover_photo[0].path;
    const photos = [];

    if (files.detail_photos.length > 0) {
      files.detail_photos.forEach((file) => {
        photos.push(file.path);
      });
    }

    return this.articleService.create({
      title: body.title,
      description: body.description,
      featuredPhoto,
      photos,
    });
  }
}
