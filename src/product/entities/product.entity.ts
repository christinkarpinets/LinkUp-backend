import { OrderItem } from 'src/order/entities/order-item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('money')
  price: number;

  @Column('text')
  description: string;

  @Column()
  brand: string;

  @Column()
  vendor: string;

  @Column('int')
  soldCount: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;

  @OneToMany(() => OrderItem, (item) => item.product)
  orderItems: OrderItem[];
}
