import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { CommunicationModule } from './communication/communication.module';

@Module({
  imports: [
    CompaniesModule,
    PersonModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommunicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
