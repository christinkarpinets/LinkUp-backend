import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
