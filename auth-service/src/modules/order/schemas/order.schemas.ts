import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/product/schemas/product.schemas';
import { User } from 'src/modules/user/schemas/user.schemas';

@Schema()
export class Order {
  @Prop()
  orderId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop()
  timeStamp: Date;

  @Prop([{ type: Types.ObjectId, ref: 'Product' }])
  products: Product[];

  @Prop({ default: false })
  isDeleted: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
