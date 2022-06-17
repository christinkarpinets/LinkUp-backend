import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('money')
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;

  @ManyToOne(() => OrderStatus, (status) => status.orders)
  @JoinColumn()
  status: OrderStatus;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];
}
