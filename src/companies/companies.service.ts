import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Companies } from './companies.model';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(companyData: Companies): Promise<Companies> {
    return await this.prisma.companies.create({ data: companyData });
  }

  async findAll(): Promise<Companies[]> {
    return this.prisma.companies.findMany();
  }
}
