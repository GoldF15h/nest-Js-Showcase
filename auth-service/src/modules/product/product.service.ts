import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Types.ObjectId> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      return (await createdProduct.save())._id;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductById(productId: string) {
    try {
      return this.productModel.findOne(
        { _id: productId, isDeleted: false },
        '-_id -__v',
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getAllProducts() {
    try {
      return this.productModel.find({ isDeleted: false });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateProduct(
    productId: string,
    newProductData: UpdateProductDto,
  ): Promise<Product> {
    try {
      return this.productModel.findByIdAndUpdate(productId, newProductData, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteProductById(productId: string): Promise<Product> {
    try {
      return this.productModel.findByIdAndUpdate(
        productId,
        { isDeleted: true },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
