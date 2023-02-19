import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { TJwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class LocalJwtService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Generates an access token
   * @param payload - The payload to generate the access token with
   * @returns The access token
   */
  generateAccessToken(payload: TJwtPayload): string {
    return this.jwt.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1d',
    });
  }

  /**
   * Generates a refresh token
   * @param payload - The payload to generate the refresh token with
   * @returns The refresh token
   */
  generateRefreshToken(payload: TJwtPayload): string {
    return this.jwt.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
  }
}
