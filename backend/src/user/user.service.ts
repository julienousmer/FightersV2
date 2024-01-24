import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(login: string, password: string) {
    return this.userRepository.insert({ username: login, password: password });
  }

  async getUser(login: string, password: string) {
    return this.userRepository.findOne({
      where: { username: login, password: password },
    });
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
