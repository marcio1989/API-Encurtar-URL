import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { AuthCredentialsDto } from '../auth/dtos/auth-crendentiais.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async createUser({ nick, password }: AuthCredentialsDto) {
        if (await this.findUserByNick(nick)) {
            throw new ConflictException('Já existe um usuário cadastrado com esse Nick');
        }
        try {
            const passwordHash = await hash(password, 10);
            const user = await this.userModel.create({
                nick,
                password: passwordHash
            })
            return user;

        }
        catch (err) {
            console.log(err);
            throw new InternalServerErrorException(JSON.stringify(err));
        }
    }

    async validateUser({ nick, password }: AuthCredentialsDto) {
        const user = await this.findUserByNick(nick);
        if (user && await compare(password, user.password)) {
            return user;
        }
        throw new BadRequestException('Credenciais inválidas');
    }

    async findUserByNick(nick: string) {
        return this.userModel.findOne({
            nick
        });
    }

    async findUserById(_id: string) {
        return this.userModel.findById(_id);
    }
}
