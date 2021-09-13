import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true
  })
  nick: string;

  @Prop({
    required: true
  })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);