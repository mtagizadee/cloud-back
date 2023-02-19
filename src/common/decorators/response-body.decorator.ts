import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ResponseBodyInterceptor } from '../interceptors/response-body.interceptor';
import { TDecorator } from '../types/decorator.type';

export const ResponseBody: TDecorator<any> = (dto) => {
  return applyDecorators(UseInterceptors(new ResponseBodyInterceptor(dto)));
};
