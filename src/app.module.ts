import { config } from 'dotenv';
config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { RideModule } from './ride/ride.module';
import { AuthMiddlewareModule } from './auth/middlewares/auth-middleware.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    RideModule,
    AuthMiddlewareModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
