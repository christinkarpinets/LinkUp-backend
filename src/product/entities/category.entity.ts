import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'bytea' })
  image: Buffer;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
