import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomerDto';
import { Customer } from './domain/customer';
import { v4 as uuidv4 } from 'uuid';
import { SSOClient } from './clients/sso.client';
import RedisClient from './clients/redis.client';

@Injectable()
export class CustomerService {
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const { access_token } = await new SSOClient().getAccessToken();
    if (!access_token) throw new UnauthorizedException('Unauthorized');

    const customer: Customer = {
      id: uuidv4(),
      name: createCustomerDto.name,
      document: createCustomerDto.document,
    };

    const redis = await RedisClient.getRedisConnection();
    const jsonString = JSON.stringify(customer);
    await redis.set(`customer:${customer.id}`, jsonString);
    return customer;
  }

  async getCustomerById(id: string) {
    const { access_token } = await new SSOClient().getAccessToken();
    if (!access_token) throw new UnauthorizedException('Unauthorized');

    const redis = await RedisClient.getRedisConnection();
    const key = `customer:${id}`;
    const customer = await redis.get(key);
    if (customer) {
      return JSON.parse(customer);
    }
    throw new NotFoundException('Customer not found');
  }
}
