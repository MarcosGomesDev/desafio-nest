import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  assetId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;
}
