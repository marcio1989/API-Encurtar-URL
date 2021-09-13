import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dtos/auth-crendentiais.dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    async singIn(authCredentialsDto: AuthCredentialsDto) {
        const user = await this.userService.validateUser(authCredentialsDto);
        user.password = undefined;
        const token = this.getToken(user);
        return { user, token };
    }

    async singUp(authCredentialsDto: AuthCredentialsDto) {
        const user = await this.userService.createUser(authCredentialsDto);
        user.password = undefined;
        const token = this.getToken(user);
        return { user, token };
    }

    getToken(user: UserDocument) {
        const payload: IJwtPayload = {
            id: user.id,
            nick: user.nick
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
}
