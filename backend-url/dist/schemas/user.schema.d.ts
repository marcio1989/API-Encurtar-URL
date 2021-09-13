import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    nick: string;
    password: string;
}
export declare const UserSchema: mongoose.Schema<Document<User, any, any>, mongoose.Model<Document<User, any, any>, any, any>, undefined, {}>;
