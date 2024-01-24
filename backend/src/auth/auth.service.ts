import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.getUser(login, password);
    return user ?? null;
  }

  async login(user: User) {
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
