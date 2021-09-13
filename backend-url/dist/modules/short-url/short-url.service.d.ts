import { ShortUrlDocument } from 'src/schemas/short-url.schema.';
import { Model } from 'mongoose';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
export declare class ShortUrlService {
    private shortUrlModel;
    private userService;
    constructor(shortUrlModel: Model<ShortUrlDocument>, userService: UserService);
    createUrl(user: IJwtPayload, url: string): Promise<string>;
    getMyUrls({ id }: IJwtPayload): Promise<ShortUrlDocument[]>;
    getUrlByCode(code: string): Promise<ShortUrlDocument>;
}
