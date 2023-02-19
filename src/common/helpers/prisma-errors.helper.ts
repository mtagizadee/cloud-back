import { Prisma } from '@prisma/client';

export class PrismaErrors {
  static isPrismaError(error: Error): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError;
  }

  static isUniqueConstraintError(
    error: Prisma.PrismaClientKnownRequestError
  ): boolean {
    return error.code === 'P2002';
  }
}
