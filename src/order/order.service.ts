import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatus } from './entities/order-status.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderStatus)
    private orderStatusRepo: Repository<OrderStatus>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOneById(createOrderDto.userId);
    const item = await this.productService.findOne(createOrderDto.productId);
    const status = await this.findOrCreateOrderStatus(
      createOrderDto.orderStatusName,
    );

    const order = this.orderRepo.create({
      user: user,
      totalPrice: item.price,
      status: status,
    });

    const orderItem = this.orderItemRepo.create({
      product: item,
      quantity: createOrderDto.quantity,
    });
    await this.orderItemRepo.save(orderItem);

    order.orderItems = [orderItem];
    await this.orderRepo.save(order);
  }

  private async findOrCreateOrderStatus(name: string): Promise<OrderStatus> {
    const status = this.orderStatusRepo.findOne({ where: { name: name } });
    if (status) {
      return status;
    }
    const newStatus = this.orderStatusRepo.create({ name: name });
    await this.orderStatusRepo.save(newStatus);
    return this.orderStatusRepo.findOne({ where: { name: name } });
  }

  async findOneOrder(id: number): Promise<Order | undefined> {
    return this.orderRepo.findOne({ where: { id: id } });
  }

  async updateItemInOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const product = await this.productService.findOne(updateOrderDto.productId);
    const curOrder = await this.findOneOrder(id);
    const orderItem = await this.orderItemRepo
      .createQueryBuilder('ordIt')
      .where('ordIt.order.id = :id', { id: id })
      .andWhere('ordIt.id = :prodId', { prodId: updateOrderDto.productId })
      .getOne();

    const priceDifference =
      (updateOrderDto.newQuantity - updateOrderDto.oldQuantity) * product.price;
    curOrder.totalPrice += priceDifference;
    this.orderRepo.save(curOrder);

    orderItem.quantity = updateOrderDto.newQuantity;
    this.orderItemRepo.save(orderItem);
  }

  async removeItem(orderId: number, productId: number) {
    const curOrder = await this.findOneOrder(orderId);
    const product = await this.productService.findOne(productId);
    curOrder.orderItems = curOrder.orderItems.filter(
      (item) => item.id !== productId,
    );
    this.orderRepo.save(curOrder);

    this.orderItemRepo.delete({ product: product });
  }
}
