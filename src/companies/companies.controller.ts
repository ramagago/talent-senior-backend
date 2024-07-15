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
import { MailerService } from 'src/mailer/mailer.service';
import { SendEmailDto } from 'src/mailer/mailer.interface';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly mailerService: MailerService,
  ) {}

  @Post()
  async create(@Body() companyData: Companies): Promise<any> {
    const company = await this.companiesService.create(companyData);
    const dto1: SendEmailDto = {
      from: {
        name: 'Talento Senior',
        address: 'info@talentosenior.uy',
      },
      recipients: [
        {
          name: company.name + ' ' + company.surname,
          address: company.companyEmail,
        },
      ],
      subject: 'Registro Exitoso',
      html: `<p>Hola <strong>${
        company.name + ' ' + company.surname
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
          name: company.name + ' ' + company.surname,
          address: 'info@talentosenior.uy',
        },
      ],
      subject: 'Se ha registrado una nueva empresa',
      html: `<p>Hola Equipo de Talento Senior, <br><br> <strong>${
        company.name + ' ' + company.surname
      }</strong> acaba de registrar la empresa <strong> ${
        company.companyName
      }</strong>  en la web. <br><br> Muchas gracias.</p>`,
    };
    this.mailerService.sendEmail(dto2);
    return company;
  }

  @UseGuards(ApiKeyGuard)
  @Get()
  async findAll(
    @Query('q') search,
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
