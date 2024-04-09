import { Test, TestingModule } from '@nestjs/testing';
import { PersonService } from './person.service';
import { PrismaService } from '../../prisma/prisma.service';
import { validPersonData, incompletePersonData } from './test-data';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonService, PrismaService],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a person', async () => {
      const personData = validPersonData;
      const createdPerson = validPersonData;
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdPerson);

      expect(await service.create(personData as any)).toBe(createdPerson);
    });

    it('should fail when incomplete data is provided', async () => {
      const personData: any = incompletePersonData;
      try {
        await service.create(personData);

        fail('The creation should have failed due to incomplete data');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
