import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { Ride } from '../ride/ride.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) {}

  async toggleAvailability(driverId: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${driverId} not found`);
    }

    driver.isAvailable = !driver.isAvailable;

    await this.driverRepository.save(driver);

    return driver;
  }

  async acceptRideRequest(driverId: number, rideId: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${driverId} not found`);
    }

    if (driver.activeRide) {
      throw new ConflictException('Driver already has an active ride');
    }

    const ride = await this.rideRepository.findOne({
      where: { id: rideId },
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${rideId} not found`);
    }

    // Update the ride status to 'accepted'
    ride.status = 'accepted';

    // Assign the ride to the driver
    ride.driver = driver;

    // Save the changes to the ride entity
    await this.rideRepository.save(ride);

    // Update the driver's activeRide
    driver.activeRide = ride;

    // Save the changes to the driver entity
    await this.driverRepository.save(driver);

    return driver;
  }
}
