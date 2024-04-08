import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [CompaniesModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
