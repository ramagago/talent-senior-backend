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

  async findAll(gender?: string): Promise<Person[]> {
    // Define un objeto para almacenar los criterios de búsqueda
    const searchCriteria: any = {};

    // Si se proporciona el parámetro de género, lo agregamos como criterio de búsqueda
    if (gender) {
      searchCriteria.gender = gender;
    }

    // Obtenemos todas las personas que cumplan con los criterios de búsqueda
    const persons = await this.prisma.person.findMany({
      where: searchCriteria,
    });
    // Creamos una lista para almacenar los datos de cada persona
    const talents: Person[] = [];

    // Iteramos sobre cada persona
    for (const person of persons) {
      // Obtenemos los datos relacionados con esta persona
      const references = await this.prisma.reference.findMany({
        where: {
          personId: person.id,
        },
      });

      const languages = await this.prisma.language.findMany({
        where: {
          personId: person.id,
        },
      });

      const studies = await this.prisma.study.findMany({
        where: {
          personId: person.id,
        },
      });

      const workExperiences = await this.prisma.workExperience.findMany({
        where: {
          personId: person.id,
        },
      });

      // Creamos un objeto de tipo Person con los datos obtenidos
      const talent: Person = {
        id: person.id,
        dni: person.dni,
        dniNumber: person.dniNumber,
        birthday: person.birthday,
        name: person.name,
        surname: person.surname,
        about: person.about,
        address: person.address,
        cp: person.cp,
        email: person.email,
        gender: person.gender,
        phone: person.phone,
        countyPD: person.countyPD,
        cityPD: person.cityPD,
        languages: languages,
        references: references,
        studies: studies,
        workExperiences: workExperiences,
      };

      // Agregamos el objeto Person a la lista de talents
      talents.push(talent);
    }

    // Devolvemos la lista de talents
    return talents;
  }
}
