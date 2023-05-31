import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomerDto';

@Injectable()
export class CustomerService {
  createCustomer(createCustomerDto: CreateCustomerDto) {
    return createCustomerDto;
  }

  getCustomerById(id: string) {
    return { id };
  }
}
