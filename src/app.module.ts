import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { AssetsModule } from './assets/assets.module';
import { Order } from './orders/entities/order.entity';
import { Asset } from './assets/entities/asset.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'desafio.sqlite',
      entities: [Asset, Order],
      synchronize: true,
      logging: true,
    }),
    OrdersModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
