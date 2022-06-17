import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from './entities/order-status.entity';
import { OrderItem } from './entities/order-item.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderStatus, OrderItem, User, Product]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
