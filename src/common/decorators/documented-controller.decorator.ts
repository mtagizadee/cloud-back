import { applyDecorators } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TDecorator } from '../types/decorator.type';

type TDocumentedControllerOptions = {
  name: string;
  path?: string;
};

export const DocumentedController: TDecorator<
  TDocumentedControllerOptions | string
> = (args) => {
  const argsAreString = typeof args === 'string';

  return applyDecorators(
    ApiTags(argsAreString ? args : args.name),
    Controller(argsAreString ? args : args.path ?? args.name)
  );
};
