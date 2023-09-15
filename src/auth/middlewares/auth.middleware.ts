import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
      // No token provided
      this.logger.error('Unauthorized - Token missing');
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    const [tokenType, token] = authorizationHeader.split(' ');

    if (tokenType !== 'Bearer' || !token) {
      // Invalid token format
      this.logger.error('Unauthorized - Invalid token format');
      return res
        .status(401)
        .json({ message: 'Unauthorized - Invalid token format' });
    }

    try {
      const user = await this.authService.validateToken(token);

      if (!user) {
        // Invalid token
        this.logger.error('Unauthorized - Invalid token');
        return res
          .status(401)
          .json({ message: 'Unauthorized - Invalid token' });
      }

      // Attach the user object to the request for use in route handlers
      req['user'] = user;

      // Continue with the request
      next();
    } catch (error) {
      // Token validation failed
      this.logger.error('Unauthorized - Token validation failed');
      return res
        .status(401)
        .json({ message: 'Unauthorized - Token validation failed' });
    }
  }
}
