import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<number> {
    const newUser = this.userRepo.create({ ...createUserDto });
    await this.userRepo.save(newUser);
    return newUser.id;
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email: email } });
  }
}
