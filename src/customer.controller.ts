import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/createCustomerDto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body(new ValidationPipe()) createCustomerDto: CreateCustomerDto,
  ) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get(':id')
  async getCustomerById(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }
}
