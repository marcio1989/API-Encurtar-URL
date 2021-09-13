import { IsNotEmpty } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty({ message: 'Nick deve ser passado' })
  nick: string;

  @IsNotEmpty({ message: 'Senha deve ser passada' })
  password: string;
}
