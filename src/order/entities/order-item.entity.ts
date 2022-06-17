import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems)
  @JoinColumn()
  product: Product;

  @Column('int')
  quantity: number;
}
