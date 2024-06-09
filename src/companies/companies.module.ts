import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { ApiKeyService } from 'src/auth/apiKey.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, PrismaService, ApiKeyService],
  imports: [MailerModule],
})
export class CompaniesModule {}
