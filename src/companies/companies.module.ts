import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService],
})
export class CompaniesModule {}
