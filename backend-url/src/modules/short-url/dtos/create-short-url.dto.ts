import { IsUrl } from 'class-validator';

export class ShortUrlDto {
    @IsUrl({
        require_host: true,
        require_protocol: true,
        require_valid_protocol: true
    }, { message: 'Url inválida' })
    url: string;
}