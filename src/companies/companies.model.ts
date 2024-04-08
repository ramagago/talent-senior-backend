import { IsEmail, IsNotEmpty } from 'class-validator';

export class Companies {
  id: number;
  companyName: string;
  name: string;
  surname: string;
  @IsEmail()
  companyEmail: string;
  companyPhone: string;
  @IsNotEmpty()
  companyWebsite?: string;
  currentlyWorking?: boolean;
  howCanWeHelp?: string;
}
