import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './auth.middleware';
import { AuthModule } from '../auth.module';

@Module({
  imports: [AuthModule],
})
export class AuthMiddlewareModule implements NestModule {
  private excludedRoutes = ['api/v1/auth/login', 'api/v1/users/register'];

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        ...this.excludedRoutes.map((route) => ({
          path: route,
          method: RequestMethod.ALL,
        })),
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
