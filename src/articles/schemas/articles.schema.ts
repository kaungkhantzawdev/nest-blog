import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  featuredPhoto: string;

  @Prop({ type: Array, required: true })
  photos: [];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
