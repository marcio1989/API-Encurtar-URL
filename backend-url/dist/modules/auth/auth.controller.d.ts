import { AuthService} from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-crendentiais.dto';

export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    singUp(AuthCredentialsDto: AuthCredentialsDto): Priomise<{
        user: import("../..schemas/user.schema").UserDocument;
        token: string;
    }>;
    singIn(AuthCredentialsDto: AuthCredentialsDto): Promise<{
        user: import("../..schemas/user.schemas").UserDocument;
        token: string;
    }>;
    
}