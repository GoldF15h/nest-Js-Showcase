import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  // get product
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  // get all products
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  // update product
  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(
      updateProductDto.id,
      updateProductDto,
    );
  }

  // delete product
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }
}
