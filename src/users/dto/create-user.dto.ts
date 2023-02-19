import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { passwordConstants } from '../constants/password.constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(passwordConstants.minLength, passwordConstants.maxLength)
  readonly password: string;
}
