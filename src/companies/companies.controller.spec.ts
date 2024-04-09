import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Companies } from './companies.model';
import { incompleteCompanyData, validCompanyData } from './test-data';
import { PrismaService } from '../../prisma/prisma.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CompaniesService, PrismaService],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const companyData: Companies = validCompanyData;
      const createdCompany: Companies = validCompanyData;
      jest.spyOn(service, 'create').mockResolvedValueOnce(createdCompany);

      expect(await controller.create(companyData)).toBe(createdCompany);
    });
  });
  it('should fail when incomplete data is provided', async () => {
    const companyData: Partial<Companies> = incompleteCompanyData;
    try {
      await controller.create(companyData as any);

      fail('The creation should have failed due to incomplete data');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
