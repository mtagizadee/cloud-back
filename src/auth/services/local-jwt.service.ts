import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import {
  TJwtPair,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from '../types/jwt.type';
import { v4 } from 'uuid';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class LocalJwtService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Generates an access token
   * @param payload - The payload to generate the access token with
   * @param salt - The secret to generate the access token with
   * @returns The access token
   */
  generateAccessToken(payload: TAccessTokenPayload, salt: string): string {
    return this.jwt.sign(payload, {
      secret: salt,
      expiresIn: '1d',
    });
  }

  /**
   * Generates a refresh token
   * @param payload - The payload to generate the refresh token with
   * @returns The refresh token
   */
  generateRefreshToken(payload: TRefreshTokenPayload): string {
    return this.jwt.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '7d',
    });
  }

  /**
   * Generates a pair of access and refresh tokens
   * @param payload - The payload to generate the access and refresh tokens with
   * @returns  The access and refresh tokens
   */
  generatePair(payload: TAccessTokenPayload): TJwtPair {
    const salt: string = v4();

    return {
      accessToken: this.generateAccessToken(payload, salt),
      refreshToken: this.generateRefreshToken({ salt }),
    };
  }

  verify(tokens: TJwtPair): boolean {
    try {
      const refreshPayload: TRefreshTokenPayload = this.jwt.verify(
        tokens.refreshToken,
        { secret: jwtConstants.secret }
      );

      this.jwt.verify(tokens.accessToken, { secret: refreshPayload.salt });

      return true;
    } catch (error) {
      throw new ForbiddenException('The token pair is invalid.');
    }
  }
}
