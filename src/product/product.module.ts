import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, OrderItem])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
