import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Person } from './person.model';
import { PrismaService } from '../../prisma/prisma.service';
import { isArray } from 'class-validator';

interface FindAllAParams {
  search?: string;
  sortField?: string;
  sortOrder: string;
  page: number;
  perPage: number;
  positionLevel: string;
  levelOfStudy?: string;
  languageName?: string;
  gender?: string;
  cityPD?: string;
  skills?: string;
  countyPD?: string;
  workField?: string;
  ageMin?: number;
  ageMax?: number;
}

@Injectable()
export class PersonService {
  private readonly logger = new Logger(PersonService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(person: Person): Promise<any> {
    try {
      return this.prisma.person.create({
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
    skills,
    positionLevel,
    levelOfStudy,
    gender,
    languageName,
    countyPD,
    workField,
    ageMin,
    ageMax,
  }: FindAllAParams): Promise<{ data: Person[]; total: number }> {
    const skip = (page - 1) * perPage;
    const AND = [];
    const countiesToExclude = [
      'MONTEVIDEO',
      'CANELONES',
      'MALDONADO',
      'ROCHA',
      'ARTIGAS',
      'SALTO',
      'PAYSANDU',
      'RIVERA',
      'RIO NEGRO',
      'TACUAREMBO',
      'TREINTA Y TRES',
      'LAVALLEJA',
      'CERRO LARGO',
      'FLORIDA',
      'FLORES',
      'DURAZNO',
      'COLONIA',
      'SAN JOSE',
      'SORIANO',
    ];

    if (search)
      AND.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { surname: { contains: search, mode: 'insensitive' } },
          { dniNumber: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          {
            studies: {
              some: {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { institute: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          },
          {
            workExperiences: {
              some: {
                OR: [
                  { company: { contains: search, mode: 'insensitive' } },
                  { role: { contains: search, mode: 'insensitive' } },
                  { workField: { contains: search, mode: 'insensitive' } },
                  { skills: { contains: search, mode: 'insensitive' } },
                ],
              },
            },
          },
        ],
      });

    if (positionLevel && isArray(positionLevel)) {
      AND.push({
        workExperiences: { some: { positionLevel: { in: positionLevel } } },
      });
    } else if (positionLevel)
      AND.push({
        workExperiences: { some: { positionLevel: { equals: positionLevel } } },
      });

    if (workField && isArray(workField)) {
      AND.push({
        workExperiences: { some: { workField: { in: workField } } },
      });
    } else if (workField)
      AND.push({
        workExperiences: { some: { workField: { equals: workField } } },
      });

    if (levelOfStudy && isArray(levelOfStudy)) {
      AND.push({
        studies: { some: { levelOfStudy: { in: levelOfStudy } } },
      });
    } else if (levelOfStudy)
      AND.push({
        studies: { some: { levelOfStudy: { equals: levelOfStudy } } },
      });

    if (gender && isArray(gender)) {
      AND.push({
        gender: { in: gender },
      });
    } else if (gender)
      AND.push({
        gender: { equals: gender },
      });

    if (countyPD && isArray(countyPD)) {
      if (countyPD.find((item) => item === 'liveAbroad'))
        AND.push({
          OR: [
            { countyPD: { in: countyPD } },
            { countyPD: { notIn: countiesToExclude } },
          ],
        });
      else {
        AND.push({ countyPD: { in: countyPD } });
      }
    } else if (countyPD)
      if (countyPD === 'liveAbroad') {
        AND.push({ countyPD: { notIn: countiesToExclude } });
      } else
        AND.push({
          countyPD: { equals: countyPD },
        });
    if (languageName && isArray(languageName)) {
      AND.push({
        languages: { some: { languageName: { in: languageName } } },
      });
    } else if (languageName)
      AND.push({
        languages: { some: { languageName: { equals: languageName } } },
      });

    if (skills) {
      AND.push({ skills: { equals: skills } });
    }

    if (ageMin !== undefined) {
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - ageMin);
      AND.push({
        birthday: { lte: minDate },
      });
    }

    if (ageMax !== undefined) {
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - ageMax);
      AND.push({
        birthday: { gte: maxDate },
      });
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
        AND,
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
  async delete(id: number): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.reference.deleteMany({ where: { personId: id } }),
        this.prisma.study.deleteMany({ where: { personId: id } }),
        this.prisma.workExperience.deleteMany({ where: { personId: id } }),
        this.prisma.language.deleteMany({ where: { personId: id } }),
        this.prisma.person.delete({ where: { id } }),
      ]);
    } catch (error) {
      this.logger.error(`Error deleting person: ${error.message}`);
      throw new HttpException(
        'Error deleting person',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMany(ids: number[]): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.reference.deleteMany({ where: { personId: { in: ids } } }),
        this.prisma.study.deleteMany({ where: { personId: { in: ids } } }),
        this.prisma.workExperience.deleteMany({
          where: { personId: { in: ids } },
        }),
        this.prisma.language.deleteMany({ where: { personId: { in: ids } } }),
        this.prisma.person.deleteMany({ where: { id: { in: ids } } }),
      ]);
    } catch (error) {
      this.logger.error(`Error deleting many persons: ${error.message}`);
      throw new HttpException(
        'Error deleting many persons',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
