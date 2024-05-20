import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.model';
import { ApiKeyGuard } from 'src/auth/auth.apiKey.guard';
import { ToLowerCase } from './pipes/ToLowerCase.pipe';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() personData: Person): Promise<any> {
    return this.personService.create(personData);
  }

  // @UseGuards(ApiKeyGuard)
  @Get()
  async findAll(
    @Query('search') search,
    @Query('sortField') sortField: string,
    @Query('sortOrder', ToLowerCase) sortOrder: 'asc' | 'desc',
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
    @Query('filter') filter: string = '',
  ): Promise<{ data: Person[]; total: number }> {
    // const sortOrderLow: string = sortOrder.toLowerCase();
    return this.personService.findAll({
      search,
      sortField,
      sortOrder,
      page: parseInt(page),
      perPage: parseInt(perPage),
      filter,
    });
  }

  @UseGuards(ApiKeyGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Person | null> {
    return this.personService.getById(id);
  }
}
