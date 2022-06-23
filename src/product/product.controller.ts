import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  homePage() {
    return this.productService.homePage();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
