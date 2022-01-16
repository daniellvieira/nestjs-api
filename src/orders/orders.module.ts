import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { DatabaseModule } from '../database/database.module';
import { ordersProviders } from './orders.providers';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    ClientsModule.register([{
      name: 'KAFKA_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'payments-group-producer',
        },
      },
    }])
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ...ordersProviders,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory:async (kafkaService: ClientKafka) => {
        return kafkaService.connect();
      },
      inject: ['KAFKA_SERVICE']
    }
  ]
})
export class OrdersModule {}
