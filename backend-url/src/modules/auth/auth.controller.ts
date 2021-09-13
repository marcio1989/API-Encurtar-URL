import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-crendentiais.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authSerive: AuthService
    ) { }

    @Post('/singup')
    async singUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ){
        return this.authSerive.singUp(authCredentialsDto);
    }

    @Post('/singin')
    async singIn(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ){
        return this.authSerive.singIn(authCredentialsDto);
    }

}
