import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PrismaService],
  imports: [AuthModule, MailerModule],
})
export class PersonModule {}
