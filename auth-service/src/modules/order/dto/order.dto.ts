import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds: string[];

  @IsString()
  @IsNotEmpty()
  customerId: string;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  orderId?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds?: string[];

  @IsOptional()
  @IsString()
  customerId?: string;
}
