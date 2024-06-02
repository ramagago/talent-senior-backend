import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { CommunicationModule } from 'src/communication/communication.module';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
  imports: [AuthModule, CommunicationModule],
})
export class PersonModule {}
