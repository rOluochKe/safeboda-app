import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('api/v1/drivers')
@ApiTags('drivers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post(':id/toggle-availability')
  async toggleAvailability(@Param('id') driverId: number) {
    return this.driverService.toggleAvailability(driverId);
  }

  @Post(':id/accept-ride/:rideId')
  async acceptRideRequest(
    @Param('id') driverId: number,
    @Param('rideId') rideId: number,
  ) {
    return this.driverService.acceptRideRequest(driverId, rideId);
  }
}
