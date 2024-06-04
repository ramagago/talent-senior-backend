import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Companies } from './companies.model';
import { CompaniesService } from './companies.service';
import { ApiKeyGuard } from 'src/auth/auth.apiKey.guard';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() companyData: Companies): Promise<any> {
    return this.companiesService.create(companyData);
  }

  @Get()
  async findAll(
    @Query('search') search,
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
  ): Promise<{ data: Companies[]; total: number }> {
    const result = await this.companiesService.findAll({
      search,
      page: parseInt(page),
      perPage: parseInt(perPage),
    });
    return { data: result.companies, total: result.total };
  }

  @UseGuards(ApiKeyGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Companies | null> {
    return this.companiesService.getById(id);
  }
  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.companiesService.delete(id);
  }

  @UseGuards(ApiKeyGuard)
  @Delete()
  async deleteMany(@Body('ids') ids: number[]): Promise<void> {
    await this.companiesService.deleteMany(ids);
  }
}
