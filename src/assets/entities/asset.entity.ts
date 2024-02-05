import { Order } from '../../orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateAssetDto } from '../dto/create-asset.dto';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  symbol: string;

  @OneToMany(() => Order, (order) => order.asset_id)
  orders: Order[];

  static create(input: CreateAssetDto) {
    const asset = new Asset();
    asset.symbol = input.symbol;
    return asset;
  }
}
