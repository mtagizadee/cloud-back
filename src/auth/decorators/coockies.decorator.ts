import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TCoockies } from '../types/coockies.type';

export const Cookies = createParamDecorator(
  (data: keyof TCoockies, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  }
);
