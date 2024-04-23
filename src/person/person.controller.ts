import { Body, Controller, Post, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.model';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() personData: Person): Promise<any> {
    return this.personService.create(personData);
  }

  async findAll(@Query('gender') gender?: string): Promise<Person[]> {
    return this.personService.findAll(gender);
  }
}
