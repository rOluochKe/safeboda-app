import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Ride } from './ride.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from './decorators/role.decorator';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';

@Controller('api/v1/rides')
@UseGuards(JwtAuthGuard)
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post()
  @UseGuards(AuthMiddleware)
  @Roles('user')
  async createRide(
    @Body() createRideDto: CreateRideDto,
    @Req() request,
  ): Promise<Ride> {
    const user = request.user;
    return this.rideService.createRide(createRideDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllRides(): Promise<Ride[]> {
    return this.rideService.getAllRides();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getRideById(@Param('id') id: number): Promise<Ride> {
    return this.rideService.getRideById(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @Roles('driver')
  async updateRideStatus(
    @Param('id') id: number,
    @Body('status') status: string,
  ): Promise<Ride> {
    return this.rideService.updateRideStatus(id, status);
  }
}
