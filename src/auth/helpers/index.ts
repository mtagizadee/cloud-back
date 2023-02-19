import { UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const getAccessToken = (req: Request): string => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith('Bearer '))
    throw new UnauthorizedException('Provided authorization is invalid.');

  return authHeader.split(' ')[1];
};
