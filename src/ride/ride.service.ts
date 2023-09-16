import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ride } from './ride.entity';
import { CreateRideDto } from './dto/create-ride.dto';
import { User } from '../user/user.entity';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private readonly rideRepository: Repository<Ride>,
  ) {}

  async createRide(createRideDto: CreateRideDto, user: User): Promise<Ride> {
    try {
      const { pickupLocation, destination } = createRideDto;

      const ride = this.rideRepository.create({
        pickupLocation,
        destination,
        status: 'pending',
        user,
      });

      return await this.rideRepository.save(ride);
    } catch (error) {
      throw error;
    }
  }

  async getAllRides(): Promise<Ride[]> {
    return await this.rideRepository.find();
  }

  async getRideById(id: number): Promise<Ride> {
    return await this.rideRepository.findOne({ where: { id } });
  }

  async updateRideStatus(id: number, status: string): Promise<Ride> {
    const ride = await this.getRideById(id);

    ride.status = status;
    return await this.rideRepository.save(ride);
  }
}
