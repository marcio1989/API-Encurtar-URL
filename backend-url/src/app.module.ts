import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ShortUrlModule } from './modules/short-url/short-url.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URL_MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    }),
    ShortUrlModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
