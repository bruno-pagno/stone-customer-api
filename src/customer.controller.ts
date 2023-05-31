import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/createCustomerDto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }
}
