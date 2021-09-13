import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { AuthCredentialsDto } from '../auth/dtos/auth-crendentiais.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    createUser({ nick, password }: AuthCredentialsDto): Promise<UserDocument>;
    validateUser({ nick, password }: AuthCredentialsDto): Promise<UserDocument>;
    findUserByNick(nick: string): Promise<UserDocument>;
    findUserById(_id: string): Promise<UserDocument>;
}
