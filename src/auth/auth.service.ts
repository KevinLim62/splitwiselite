import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { passwordMatch } from 'src/utils/hashing';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isMatch = await passwordMatch(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const { password: pass, createdAt, updatedAt, ...result } = user;
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return {
      ...result,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
