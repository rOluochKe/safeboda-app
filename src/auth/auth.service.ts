import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    // Implement your user validation logic here
    // This should include checking the user's email and password
    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ access_token: string; user: User }> {
    const { email, password } = loginDto;

    const user = await this.userService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user);

    // Return both the access token and user data
    return { access_token: accessToken, user };
  }

  async findUserById(userId: number): Promise<User | null> {
    try {
      const user = await this.userService.findById(userId);
      return user || null;
    } catch (error) {
      return null;
    }
  }

  generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    try {
      const token = this.jwtService.sign(payload, { algorithm: 'HS256' });
      return token;
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.findUserById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
