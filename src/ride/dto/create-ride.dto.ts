import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRideDto {
  @IsNotEmpty()
  @IsString()
  pickupLocation: string;

  @IsNotEmpty()
  @IsString()
  destination: string;
}
