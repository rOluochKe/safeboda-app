import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Ride } from '../ride/ride.entity';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isAvailable: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Ride)
  @JoinColumn()
  activeRide: Ride;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];
}
