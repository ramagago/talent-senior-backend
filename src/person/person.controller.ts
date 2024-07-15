import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Query,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.model';
import { ApiKeyGuard } from 'src/auth/auth.apiKey.guard';
import { ToLowerCase } from './pipes/ToLowerCase.pipe';
import { MailerService } from 'src/mailer/mailer.service';
import { SendEmailDto } from 'src/mailer/mailer.interface';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly mailerService: MailerService,
  ) {}

  @Post()
  async create(@Body() personData: Person): Promise<any> {
    const person = await this.personService.create(personData);
    const dto1: SendEmailDto = {
      from: {
        name: 'Talento Senior',
        address: 'info@talentosenior.uy',
      },
      recipients: [
        { name: person.name + ' ' + person.surname, address: person.email },
      ],
      subject: 'Registro Exitoso',
      html: `<p>Hola <strong>${
        person.name + ' ' + person.surname
      }</strong> su registro se ha realizado con éxito. <br><br> Muchas gracias.</p>`,
    };
    this.mailerService.sendEmail(dto1);
    const dto2: SendEmailDto = {
      from: {
        name: 'Talento Senior',
        address: 'info@talentosenior.uy',
      },
      recipients: [
        {
          name: person.name + ' ' + person.surname,
          address: 'info@talentosenior.uy',
        },
      ],
      subject: 'Se ha registrado un nuevo talento',
      html: `<p>Hola Equipo de Talento Senior, <br><br> <strong>${
        person.name + ' ' + person.surname
      }</strong> se acaba de registrar como <strong>talento</strong> en la web. <br><br> Muchas gracias.</p>`,
    };
    this.mailerService.sendEmail(dto2);

    return person;
  }

  @UseGuards(ApiKeyGuard)
  @Get()
  async findAll(
    @Query('search') search,
    @Query('sortField') sortField: string,
    @Query('sortOrder', ToLowerCase) sortOrder: 'asc' | 'desc',
    @Query('page') page: string = '1',
    @Query('perPage') perPage: string = '10',
    @Query('positionLevel') positionLevel: string = '',
    @Query('levelOfStudy') levelOfStudy: string = '',
    @Query('gender') gender: string = '',
    @Query('languageName') languageName: string = '',
    @Query('countyPD') countyPD: string = '',
    @Query('workField') workField: string = '',
    @Query('ageMin') ageMin: number,
    @Query('ageMax') ageMax: number,
  ): Promise<{ data: Person[]; total: number }> {
    return this.personService.findAll({
      search,
      sortField,
      sortOrder,
      page: parseInt(page),
      perPage: parseInt(perPage),
      positionLevel,
      levelOfStudy,
      gender,
      languageName,
      countyPD,
      workField,
      ageMin,
      ageMax,
    });
  }

  @UseGuards(ApiKeyGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Person | null> {
    return this.personService.getById(id);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    await this.personService.delete(id);
    return { success: true };
  }

  @UseGuards(ApiKeyGuard)
  @Delete()
  async deleteMany(@Body() ids: number[]): Promise<{ success: boolean }> {
    await this.personService.deleteMany(ids);
    return { success: true };
  }
}
