import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { passwordConstants } from '../../users/constants/password.constants';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(passwordConstants.minLength, passwordConstants.maxLength)
  readonly password: string;
}
