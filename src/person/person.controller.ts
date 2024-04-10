import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.model';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() personData: Person): Promise<any> {
    const person = {
      ...personData,
      references: personData.references,
      studies: personData.studies,
      languages: personData.languages,
      workExperiences: personData.workExperiences,
    };
    return this.personService.create(person);
  }

  @Get()
  async findAll(@Query('gender') gender?: string): Promise<Person[]> {
    return this.personService.findAll(gender);
  }
}
