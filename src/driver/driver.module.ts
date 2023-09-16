import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Ride } from '../ride/ride.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Ride])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
