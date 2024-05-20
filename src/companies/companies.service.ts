import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Companies } from './companies.model';

interface FindAllAParams {
  search?: string;
  page: number;
  perPage: number;
}

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);
  constructor(private readonly prisma: PrismaService) {}

  async create(companyData: Companies): Promise<Companies> {
    return await this.prisma.companies.create({ data: companyData });
  }

  async findAll({
    search,
    page,
    perPage,
  }: FindAllAParams): Promise<{ companies: Companies[]; total: number }> {
    console.log(search, page, perPage);
    const skip = (page - 1) * perPage;
    const companiesPromise = this.prisma.companies.findMany({
      where: {
        OR: search
          ? [
              { companyName: { contains: search, mode: 'insensitive' } },
              { howCanWeHelp: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
      skip: skip,
      take: perPage,
    });
    const countPromise = this.prisma.companies.count({
      where: {
        OR: search
          ? [
              { companyName: { contains: search, mode: 'insensitive' } },
              { howCanWeHelp: { contains: search, mode: 'insensitive' } },
            ]
          : undefined,
      },
    });

    try {
      const [companiesData, totalCount] = await this.prisma.$transaction([
        companiesPromise,
        countPromise,
      ]);
      // console.log('Resolved companies data:', companiesData);
      // console.log('Resolved count:', totalCount);
      return { companies: companiesData, total: totalCount };
    } catch (err) {
      this.logger.error(`Error in transaction: ${err.message}`);
      throw err;
    }
  }

  async getById(id: number): Promise<Companies | null> {
    try {
      return this.prisma.companies.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error finding person by id: ${error.message}`);
      throw error;
    }
  }
}
