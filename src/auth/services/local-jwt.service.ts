import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  TJwtPair,
  TAccessTokenPayload,
  TRefreshTokenPayload,
} from '../types/jwt.type';
import { v4 } from 'uuid';
import { jwtConstants } from '../constants/jwt.constants';
import { JwtErrors } from '../helpers/jwt-errors.helper';
import { Response } from 'express';

@Injectable()
export class LocalJwtService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Generates an access token
   * @param payload - The payload to generate the access token with
   * @param salt - The secret to generate the access token with
   * @returns The access token
   */
  private generateAccessToken(
    payload: TAccessTokenPayload,
    salt: string
  ): string {
    return this.jwt.sign(payload, {
      secret: salt,
      expiresIn: '15m',
    });
  }

  /**
   * Generates a refresh token
   * @param payload - The payload to generate the refresh token with
   * @returns The refresh token
   */
  private generateRefreshToken(payload: TRefreshTokenPayload): string {
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
      refreshToken: this.generateRefreshToken({ ...payload, salt }),
    };
  }

  /**
   * Generates a new access token based on the refresh token's salt
   * @param params - The parameters to verify the access and refresh tokens with
   */
  private resetAccessToken(params: {
    payload: TAccessTokenPayload;
    salt: string;
    response: Response;
  }): void {
    const newAccessToken = this.generateAccessToken(
      params.payload,
      params.salt
    );

    params.response.setHeader('Authorization', newAccessToken);
  }

  /**
   * Verifies the refresh token
   * @param refreshToken - The refresh token to verify
   * @returns The payload of the refresh token
   */
  private verifyRefreshToken(refreshToken: string): TRefreshTokenPayload {
    try {
      const refreshPayload: TRefreshTokenPayload = this.jwt.verify(
        refreshToken,
        { secret: jwtConstants.secret }
      );

      return refreshPayload;
    } catch (error) {
      if (JwtErrors.isTokenExpiredError(error))
        throw new UnauthorizedException('The refresh token has expired.');

      throw new ForbiddenException('The refresh token is invalid.');
    }
  }

  /**
   * Verifies the access token
   * @param params - The parameters to verify the access token with
   * @returns - True if the access token is valid
   */
  private verifyAccessToken(params: {
    accessToken: string;
    payload: TAccessTokenPayload;
    salt: string;
    response: Response;
  }): void {
    const { accessToken, salt, response, payload } = params;

    try {
      this.jwt.verify(accessToken, { secret: salt });
    } catch (error) {
      if (JwtErrors.isTokenExpiredError(error)) {
        this.resetAccessToken({ payload, salt, response });

        throw new UnauthorizedException('The access token has expired.');
      }

      throw new ForbiddenException('The access token is invalid.');
    }
  }

  /**
   * Verifies a pair of tokens
   * @param tokens - The pair of tokens to verify
   * @param response - The response to set the new access token to
   * @returns - True if the pair of tokens is valid
   */
  verifyPair(tokens: TJwtPair, response: Response): TAccessTokenPayload {
    try {
      const refreshPayload: TRefreshTokenPayload = this.verifyRefreshToken(
        tokens.refreshToken
      );

      this.verifyAccessToken({
        payload: { id: refreshPayload.id },
        accessToken: tokens.accessToken,
        salt: refreshPayload.salt,
        response,
      });

      return { id: refreshPayload.id };
    } catch (error) {
      throw error;
    }
  }
}
