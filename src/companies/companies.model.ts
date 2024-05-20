import { IsEmail } from 'class-validator';

export class Companies {
  id: number;
  companyName: string;
  name: string;
  surname: string;
  @IsEmail()
  companyEmail: string;
  companyPhone: string;
  companyWebsite?: string;
  howCanWeHelp?: string;
  termsAndConditions: boolean;
}
