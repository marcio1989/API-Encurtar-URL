import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

export type ShortUrlDocument = ShortUrl & Document;
@Schema()
export class ShortUrl {
  @Prop({
    required: true
  })
  code: string;

  @Prop({
    required: true
  })
  original: string;

  @Prop({
    required: true
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: User.name,
    required: true
  })
  user: User;
}

export const ShortUrlSchema = SchemaFactory.createForClass(ShortUrl);