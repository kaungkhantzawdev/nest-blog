import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/articles.schema';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dtos/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    console.log(createArticleDto);
    const article = new this.articleModel(createArticleDto);
    return this.articleModel.create(article);
  }
}
