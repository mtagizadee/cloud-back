import { applyDecorators } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TDecorator } from '../types/decorator.type';

type TDocumentedControllerOptions = {
  name: string;
  path?: string;
};

export const DocumentedController: TDecorator<TDocumentedControllerOptions> = ({
  name,
  path,
}) => {
  return applyDecorators(ApiTags(name), Controller(path ?? name));
};
