import {
  IsArray,
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsMongoId,
  IsBoolean,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  orderId: string;

  @IsMongoId()
  customer: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;

  @IsArray()
  @IsMongoId({ each: true })
  products: string[];

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateOrderDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  @IsNotEmpty()
  orderId?: string;

  @IsOptional()
  @IsMongoId()
  customer?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  products?: string[];

  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @IsOptional()
  @IsString()
  status?: string;
}
