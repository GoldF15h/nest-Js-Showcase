import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async getProductById(productId: string) {
    return this.productModel.findOne({ _id: productId, isDeleted: false });
  }

  async getAllProducts() {
    return this.productModel.find({ isDeleted: false });
  }

  async updateProduct(
    productId: string,
    newProductData: UpdateProductDto,
  ): Promise<Product> {
    return this.productModel.findByIdAndUpdate(productId, newProductData, {
      new: true,
    });
  }

  async deleteProductById(productId: string): Promise<Product> {
    return this.productModel.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true },
    );
  }
}
