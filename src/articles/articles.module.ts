import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesRepository } from './articles.repository';
import { MulterModule } from '@nestjs/platform-express';
import { Article, ArticleSchema } from './schemas/articles.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MulterModule.register({ dest: `./upload` }),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, ArticlesRepository],
})
export class ArticlesModule {}
