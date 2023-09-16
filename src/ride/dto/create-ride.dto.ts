import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRideDto {
  @ApiProperty({
    description: 'The pickup location for the ride',
    example: '123 Main Street, City',
  })
  @IsNotEmpty()
  @IsString()
  pickupLocation: string;

  @ApiProperty({
    description: 'The destination for the ride',
    example: '456 Elm Avenue, Town',
  })
  @IsNotEmpty()
  @IsString()
  destination: string;
}
