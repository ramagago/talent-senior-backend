import request from 'supertest';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';

import { ConfigModule } from 'config/config.module';
import { AuthModule } from 'auth/auth.module';
import { UsersModule } from 'users/users.module';
import { User } from 'users/user.entity';
import { UsersService } from 'users/users.service';
import { OrdersService } from 'orders/orders.service';
import { OrdersModule } from 'orders/orders.module';
import { Order } from 'orders/order.entity';
import applyGlobalConfig from 'apply-global-conf';
import ormAsyncOptions from 'test/orm-config';

import * as UserFixture from '../fixtures/user.fixture';
import * as OrderFixture from '../fixtures/order.fixture';

describe('POST /orders', () => {
  let app: INestApplication;
  let users;
  let orders;
  let token;

  const performCreateOrder = (order, token) =>
    request(app.getHttpServer())
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(order);

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(ormAsyncOptions),
        TypeOrmModule.forFeature([User, Order]),
        AuthModule,
        ConfigModule,
        OrdersModule,
        UsersModule,
      ],
      providers: [UsersService, OrdersService],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();

    users = module.get<UsersService>(UsersService);
    orders = module.get<OrdersService>(OrdersService);

    const mockUser = UserFixture.fakeOne();

    await users.createOne(null, mockUser);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ phone: mockUser.phone, password: mockUser.password });

    token = res.header['access-token'];
  });

  afterAll(async () => app.close());

  describe('when using correct data', () => {
    it('should return 201 and save the order', async () => {
      const order = OrderFixture.fakeOne();
      await performCreateOrder(order, token).expect(201);
      expect((await orders.find())[0]).toMatchObject(order);
    });
  });

  describe('when sending fake token', () => {
    it('should return 401', async () => {
      await performCreateOrder(OrderFixture.fakeOne(), 'fake token').expect(
        401,
      );
    });
  });
});
