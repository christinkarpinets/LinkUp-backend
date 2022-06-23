import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from '@nestjs/class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @IsAlpha()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  @IsAlpha()
  lastName: string;
}
