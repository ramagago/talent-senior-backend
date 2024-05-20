import { Injectable, Logger } from '@nestjs/common';
import { Person } from './person.model';
import { PrismaService } from '../../prisma/prisma.service';
import { isArray } from 'class-validator';

interface FindAllAParams {
  search?: string;
  sortField?: string;
  sortOrder: string;
  page: number;
  perPage: number;
  filter: string;
  cityPD?: string;
  skills?: string;
}

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(person: Person): Promise<any> {
    try {
      return await this.prisma.person.create({
        data: {
          ...person,
          references: {
            createMany: { data: person.references },
          },
          studies: { createMany: { data: person.studies } },
          workExperiences: { createMany: { data: person.workExperiences } },
          languages: { createMany: { data: person.languages } },
        },
      });
    } catch (error) {
      this.logger.error(`Error creating person: ${error.message}`);
      throw error;
    }
  }

  async findAll({
    search,
    sortField,
    sortOrder,
    page,
    perPage,
    cityPD,
    skills,
  }: FindAllAParams): Promise<{ data: Person[]; total: number }> {
    const skip = (page - 1) * perPage;
    console.log([sortField]);
    const AND = [];
    if (search)
      AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { surname: { contains: search, mode: 'insensitive' } },
          {
            studies: {
              some: { title: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      });

    if (cityPD && isArray(cityPD)) {
      AND.push({ cityPD: { in: cityPD } });
    } else if (cityPD) {
      AND.push({ cityPD: { equals: cityPD } });
    }

    if (skills) {
      AND.push({ skills: { equals: skills } });
    }

    const findMany = this.prisma.person.findMany({
      where: {
        AND,
      },
      orderBy: {
        [sortField]: sortOrder,
      },

      skip: skip,
      take: perPage,
      include: {
        references: true,
        studies: true,
        workExperiences: true,
        languages: true,
      },
    });
    const count = this.prisma.person.count({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { surname: { contains: search, mode: 'insensitive' } },
          {
            studies: {
              some: { title: { contains: search, mode: 'insensitive' } },
            },
          },
        ],
      },
    });
    try {
      const [data, totalCount] = await this.prisma.$transaction([
        findMany,
        count,
      ]);
      return { data, total: totalCount };
    } catch (err) {
      this.logger.error(`Error in transaction: ${err.message}`);
      throw err;
    }
  }

  async getById(id: number): Promise<Person | null> {
    try {
      return this.prisma.person.findUnique({
        where: { id },
        include: {
          references: true,
          studies: true,
          workExperiences: true,
          languages: true,
        },
      });
    } catch (error) {
      this.logger.error(`Error finding person by id: ${error.message}`);
      throw error;
    }
  }
}
