import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
})
export class PersonModule {}
