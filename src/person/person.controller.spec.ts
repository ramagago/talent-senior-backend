import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person } from './person.model';
import { incompletePersonData, validPersonData } from './test-data';
import { PrismaService } from '../../prisma/prisma.service';

describe('PersonController', () => {
  let controller: PersonController;
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [PersonService, PrismaService],
    }).compile();

    controller = module.get<PersonController>(PersonController);
    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a person', async () => {
      const personData: Person = Object.assign(new Person(), validPersonData);

      jest.spyOn(service, 'create').mockResolvedValueOnce(personData);

      expect(await controller.create(personData)).toBe(personData);
    });

    it('should fail when incomplete data is provided', async () => {
      const personData: Partial<Person> = Object.assign(
        new Person(),
        incompletePersonData,
      );
      try {
        await controller.create(personData as any);

        fail('The creation should have failed due to incomplete data');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
