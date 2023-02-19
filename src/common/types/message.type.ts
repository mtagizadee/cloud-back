import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty({
    type: String,
    example: 'The operation was successful.',
    description: 'The message of the response.',
  })
  readonly message: string;
}
