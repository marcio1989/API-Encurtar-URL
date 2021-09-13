import { Module } from '@nestjs/common';
import { ShortUrlService } from './short-url.service';
import { ShortUrlController } from './short-url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlSchema } from 'src/schemas/short-url.schema.';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from '../user/user.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: ShortUrl.name, schema: ShortUrlSchema },
      { name: User.name, schema: UserSchema },
    ])
  ],
  providers: [ShortUrlService, UserService],
  controllers: [ShortUrlController]
})
export class ShortUrlModule { }
