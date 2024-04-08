import { Injectable } from '@nestjs/common';
import { Person } from './person.model';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(pepe: Person): Promise<any> {
    console.log('pepe ', pepe);
    return await this.prisma.person.create({
      data: {
        ...pepe,
        references: {
          createMany: { data: pepe.references },
        },
        studies: { createMany: { data: pepe.studies } },
        workExperiences: { createMany: { data: pepe.workExperiences } },
        languages: { createMany: { data: pepe.languages } },
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
