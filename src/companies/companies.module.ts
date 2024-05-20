import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { ApiKeyService } from 'src/auth/apiKey.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService, ApiKeyService],
})
export class CompaniesModule {}
