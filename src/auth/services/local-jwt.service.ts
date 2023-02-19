import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { TJwtPair, TJwtPayload } from '../types/jwt.type';

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

  /**
   * Generates a pair of access and refresh tokens
   * @param payload - The payload to generate the access and refresh tokens with
   * @returns  The access and refresh tokens
   */
  generatePair(payload: TJwtPayload): TJwtPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }
}
