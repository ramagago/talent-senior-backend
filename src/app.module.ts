import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CompaniesModule, PersonModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
