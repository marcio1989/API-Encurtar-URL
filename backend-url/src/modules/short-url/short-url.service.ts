import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShortUrl, ShortUrlDocument } from 'src/schemas/short-url.schema.';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import * as moment from 'moment';
@Injectable()
export class ShortUrlService {
    constructor(
        @InjectModel(ShortUrl.name)
        private shortUrlModel: Model<ShortUrlDocument>,
        private userService: UserService
    ) { }

    async createUrl(user: IJwtPayload, url: string) {
        try {
            const shortUrl = await this.shortUrlModel.create({
                code: randomBytes(2).toString('hex'),
                original: url,
                user: user.id,
                createdAt: moment().toDate()
            })
            const urlFrontEnd = `${process.env.URL_FRONTEND}/${shortUrl.code}`
            return urlFrontEnd;
        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException(JSON.stringify(err));
        }
    }

    async getMyUrls({ id }: IJwtPayload) {
        const user = await this.userService.findUserById(id);
        const urls = await this.shortUrlModel.find({
            user
        })
            .select('_id code original createdAt')
            .sort('-createdAt')
        urls.forEach(url => {
            url.code = `${process.env.URL_FRONTEND}/${url.code}`
        })
        return urls;
    }

    async getUrlByCode(code: string) {
        const url = await this.shortUrlModel.findOne({
            code
        })
            .select('_id code original createdAt')
        return url;
    }
}
