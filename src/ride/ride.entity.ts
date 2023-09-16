import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Driver } from '../driver/driver.entity';

@Entity()
export class Ride {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pickupLocation: string;

  @Column()
  destination: string;

  @Column({ default: 'pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.rides)
  user: User;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;
}
