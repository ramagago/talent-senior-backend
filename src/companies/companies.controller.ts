import { Body, Controller, Get, Post } from '@nestjs/common';
import { Companies } from './companies.model';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() companyData: Companies): Promise<any> {
    return this.companiesService.create(companyData);
  }

  @Get()
  async findAll(): Promise<Companies[]> {
    return this.companiesService.findAll();
  }
}
