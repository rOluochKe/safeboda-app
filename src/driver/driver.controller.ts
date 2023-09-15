import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/drivers')
@UseGuards(JwtAuthGuard)
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
