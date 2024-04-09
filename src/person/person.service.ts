import { Injectable } from '@nestjs/common';
import { Person } from './person.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(person: Person): Promise<any> {
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
  }

  async findAll(): Promise<any> {
    const [persons, references, languages, studies, workExperiences] =
      await Promise.all([
        this.prisma.person.findMany(),
        this.prisma.reference.findMany(),
        this.prisma.language.findMany(),
        this.prisma.study.findMany(),
        this.prisma.workExperience.findMany(),
      ]);

    const talent = {
      ...persons,
      references,
      languages,
      studies,
      workExperiences,
    };

    return talent;
  }
}
