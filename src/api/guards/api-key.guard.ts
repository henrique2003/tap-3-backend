// auth/api-key.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const apiKeyHeader = request.headers['x-api-key'];

    if (
      typeof apiKeyHeader !== 'string' ||
      apiKeyHeader !== process.env.SERVICE_API_KEY
    ) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
