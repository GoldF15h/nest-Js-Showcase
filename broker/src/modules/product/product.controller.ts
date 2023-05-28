import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { AdminAuthGuard, UserAuthGuard } from '../auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // create product
  @UseGuards(AdminAuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  // get product
  @UseGuards(UserAuthGuard)
  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  // get all products
  @UseGuards(UserAuthGuard)
  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  // update product
  @UseGuards(AdminAuthGuard)
  @Put()
  async updateProduct(@Body() updateProductDto: UpdateProductDto) {
    return await this.productService.updateProduct(updateProductDto);
  }

  // delete product
  @UseGuards(AdminAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }
}
