import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dtos/auth-crendentiais.dto';
export declare class AuthService {
    private jwtService;
    private userService;
    constructor(jwtService: JwtService, userService: UserService);
    singIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        user: UserDocument;
        token: string;
    }>;
    singUp(authCredentialsDto: AuthCredentialsDto): Promise<{
        user: UserDocument;
        token: string;
    }>;
    getToken(user: UserDocument): string;
}
