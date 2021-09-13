import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ShortUrlDto } from './dtos/create-short-url.dto';
import { ShortUrlService } from './short-url.service';
export declare class ShortUrlController {
    private shortUrlService;
    constructor(shortUrlService: ShortUrlService);
    createUrl({ url }: ShortUrlDto, user: IJwtPayload): Promise<string>;
    getMyUrls(user: IJwtPayload): Promise<import("../../schemas/short-url.schema.").ShortUrlDocument[]>;
    getUrlByCode(code: string): Promise<import("../../schemas/short-url.schema.").ShortUrlDocument>;
}
