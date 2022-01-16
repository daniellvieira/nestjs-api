import { Sequelize } from 'sequelize-typescript';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: 'bookstore',
      });
      sequelize.addModels([Order, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
