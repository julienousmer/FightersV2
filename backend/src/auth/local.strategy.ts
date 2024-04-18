import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('validate local strategy');
    console.log(username);
    console.log(password);
    const user: User | null = await this.authService.validateUser(username, password);

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
