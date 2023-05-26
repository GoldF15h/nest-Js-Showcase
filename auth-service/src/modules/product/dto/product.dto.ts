export class CreateProductDto {
  productName: string;
  productType: string;
  quantity: number;
}

export class UpdateProductDto extends CreateProductDto {
  id: string;
}
