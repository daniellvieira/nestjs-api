import { Sequelize } from 'sequelize-typescript';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'db',
        port: 3306,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
      });
      sequelize.addModels([Order, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
