import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.model';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() personData: Person): Promise<any> {
    console.log(personData);
    const pepe = {
      ...personData,
      references: personData.references,
      studies: personData.studies,
      languages: personData.languages,
      workExperiences: personData.workExperiences,
    };
    return this.personService.create(pepe);
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }
}
