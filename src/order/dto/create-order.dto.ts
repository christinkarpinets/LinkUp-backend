import {
  IsAlphanumeric,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from '@nestjs/class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsAlphanumeric()
  @IsNotEmpty()
  orderStatusName: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
