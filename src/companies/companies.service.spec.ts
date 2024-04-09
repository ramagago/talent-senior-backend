import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { PrismaService } from '../../prisma/prisma.service';
import { incompleteCompanyData, validCompanyData } from './test-data';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService, PrismaService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      const companyData = validCompanyData;
      jest
        .spyOn(prismaService.companies, 'create')
        .mockResolvedValueOnce(companyData);

      const createdCompany = await service.create(validCompanyData);

      expect(createdCompany).toEqual(companyData);
    });
    it('should fail when incomplete data is provided', async () => {
      const incompleteData = incompleteCompanyData;

      await expect(
        service.create(incompleteData as any),
      ).rejects.toThrowError();
    });
  });
});
