import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

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
}
