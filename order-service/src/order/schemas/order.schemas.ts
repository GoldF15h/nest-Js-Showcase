import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Users {
  @Prop()
  userName: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  isDeleted: boolean;
}

@Schema()
export class Product {
  @Prop()
  productName: string;

  @Prop()
  productType: string;

  @Prop()
  quantity: number;

  @Prop({ default: false })
  isDeleted: boolean;
}

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
