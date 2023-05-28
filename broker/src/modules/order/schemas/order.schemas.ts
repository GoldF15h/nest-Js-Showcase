import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schemas/product.schemas';
import { Users } from 'src/modules/users/schemas/users.schemas';

@Schema()
export class Order {
  @Prop()
  orderId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  customer: Users;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Product[];

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop({ default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
