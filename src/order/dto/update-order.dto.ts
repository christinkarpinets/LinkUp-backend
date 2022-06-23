import { IsNotEmpty, IsNumber, IsPositive } from '@nestjs/class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  oldQuantity: number;

  @IsNumber()
  @IsNotEmpty()
  newQuantity: number;
}
