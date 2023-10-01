import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/articles.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    console.log(createArticleDto);
    return createArticleDto;
  }
}
