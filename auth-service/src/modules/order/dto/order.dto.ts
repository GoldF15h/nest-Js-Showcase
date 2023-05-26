export class CreateOrderDto {
  orderId: string;
  customerId: string;
  productIds: string[];
}

export class UpdateOrderDto extends CreateOrderDto {
  id: string;
}
