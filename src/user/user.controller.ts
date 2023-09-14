import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
