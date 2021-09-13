import { Document } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
export declare type ShortUrlDocument = ShortUrl & Document;
export declare class ShortUrl {
    code: string;
    original: string;
    createdAt: Date;
    user: User;
}
export declare const ShortUrlSchema: mongoose.Schema<Document<ShortUrl, any, any>, mongoose.Model<Document<ShortUrl, any, any>, any, any>, undefined, {}>;
