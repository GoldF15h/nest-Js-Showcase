import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { EventPattern, RpcException } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern('product_create')
  async createProduct(createProductDto: CreateProductDto) {
    try {
      return await this.productService.createProduct(createProductDto);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('product_get_by_id')
  async getProduct(id: string) {
    try {
      return await this.productService.getProductById(id);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('product_get_all')
  async getAllProducts() {
    try {
      return await this.productService.getAllProducts();
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('product_update')
  async updateProduct(updateProductDto: UpdateProductDto) {
    try {
      return await this.productService.updateProduct(
        updateProductDto.id,
        updateProductDto,
      );
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @EventPattern('product_delete')
  async deleteProduct(productId: string) {
    try {
      return await this.productService.deleteProductById(productId);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
