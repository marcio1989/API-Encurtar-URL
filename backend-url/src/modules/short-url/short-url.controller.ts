import { Body, Controller, Get, Post, UseGuards, Query, ValidationPipe, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { IJwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ShortUrlDto } from './dtos/create-short-url.dto';
import { ShortUrlService } from './short-url.service';


@Controller('short-url')
export class ShortUrlController {

    constructor(
        private shortUrlService: ShortUrlService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    async createUrl(
        @Body(ValidationPipe) { url }: ShortUrlDto,
        @GetUser() user: IJwtPayload
    ) {
        return this.shortUrlService.createUrl(user, url);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('')
    async getMyUrls(
        @GetUser() user: IJwtPayload
    ) {
        return this.shortUrlService.getMyUrls(user);
    }
    @Get('/:code')
    async getUrlByCode(
        @Param('code') code :  string 
    ) {
        return this.shortUrlService.getUrlByCode(code);
    }
}
