import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async login(loginDto: LoginUserDto): Promise<any> {
    const user = await this.userService.findOneByEmail(loginDto.email);

    if (user && user.password === loginDto.password) {
      const { password, ...rest } = user;
      //return rest;
      return this.signToken(user.email, user.id);
    }

    return new UnauthorizedException();
  }

  async register(createUserDto: CreateUserDto): Promise<number> {
    const newUser = this.userRepo.create({ ...createUserDto });
    await this.userRepo.save(newUser);
    return newUser.id;
  }

  async signToken(email: string, id: number) {
    const payload = { email, sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
        secret: this.configService.get<string>('JWT_SECRET'),
      }),
    };
  }
}
