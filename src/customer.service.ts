import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomerDto';
import Redis from 'ioredis';
import { Customer } from './domain/customer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {
  async createCustomer(createCustomerDto: CreateCustomerDto) {
    const customer: Customer = {
      id: uuidv4(),
      name: createCustomerDto.name,
      document: createCustomerDto.document,
    };

    const redis = new Redis();
    const jsonString = JSON.stringify(customer);
    await redis.set(`customer:${customer.id}`, jsonString);
    return customer;
  }

  async getCustomerById(id: string) {
    const redis = new Redis();
    const key = `customer:${id}`;
    const customer = await redis.get(key);

    if (customer) {
      return JSON.parse(customer);
    }
  }
}
