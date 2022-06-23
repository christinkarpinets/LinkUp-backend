import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private prodRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  homePage() {
    return {
      categories: this.findAllCategories(),
      products: this.findAllProducts(),
    };
  }

  findProdByCategory(category: string) {
    return this.prodRepo
      .createQueryBuilder('prod')
      .where('prod.category = :category', { category: category });
  }

  findAllCategories() {
    return this.categoryRepo.find();
  }

  findAllProducts() {
    return this.prodRepo.find();
  }

  async findOne(id: number): Promise<Product | undefined> {
    return this.prodRepo.findOne({ where: { id: id } });
  }
}
