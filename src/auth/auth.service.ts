import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user.id);
    return { access_token: accessToken };
  }

  generateToken(userId: number) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
