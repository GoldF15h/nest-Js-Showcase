import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  productName: string;

  @IsString()
  @IsNotEmpty()
  productType: string;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  productType?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;
}
