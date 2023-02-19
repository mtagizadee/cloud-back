import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { getAccessToken } from '../helpers';
import { LocalJwtService } from '../services/local-jwt.service';
import { TCoockies } from '../types/coockies.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly localJwt: LocalJwtService,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      const accessToken: string = getAccessToken(request);
      const refreshToken = (request.cookies as TCoockies)['refresh_token'];

      const payload = this.localJwt.verifyPair(
        { accessToken, refreshToken },
        response
      );

      request.user = await this.usersService.findOne({ id: payload.id });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
