import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Asset } from '../assets/entities/asset.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Asset)
    private assetsRepo: Repository<Asset>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const asset = await this.assetsRepo.findBy({ id: createOrderDto.assetId });

    if (!asset) {
      throw new BadGatewayException('Asset not found');
    }

    const order = Order.create({
      price: createOrderDto.price,
      asset_id: createOrderDto.assetId,
    });

    await this.orderRepo.save(order);

    return order;
  }

  findAll() {
    return this.orderRepo.find({});
  }
}
