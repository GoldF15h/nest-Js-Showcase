import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('PRODUCT') private productClient: ClientProxy,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Types.ObjectId> {
    try {
      const productResponse$ = this.productClient.send(
        'product_create',
        createProductDto,
      );
      return await lastValueFrom(productResponse$);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductById(productId: string) {
    try {
      const productResponse$ = this.productClient.send(
        'product_get_by_id',
        productId,
      );
      return await lastValueFrom(productResponse$);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getAllProducts() {
    try {
      const productResponse$ = this.productClient.send('product_get_all', {});
      return await lastValueFrom(productResponse$);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateProduct(updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const productResponse$ = this.productClient.send(
        'product_update',
        updateProductDto,
      );
      return await lastValueFrom(productResponse$);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async deleteProductById(productId: string): Promise<Product> {
    try {
      const productResponse$ = this.productClient.send(
        'product_delete',
        productId,
      );
      return await lastValueFrom(productResponse$);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
