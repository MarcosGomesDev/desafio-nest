import { Asset } from '../../assets/entities/asset.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderStatus {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export type CreateOrderCommand = {
  asset_id: number;
  price: number;
};

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Asset, (asset) => asset.orders, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinColumn({ name: 'asset_id' })
  asset_id: Asset;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  status: OrderStatus = OrderStatus.PENDING;

  static create(input: CreateOrderCommand) {
    const order = new Order();
    order.asset_id = { id: input.asset_id } as Asset;
    order.price = input.price;
    return order;
  }
}
