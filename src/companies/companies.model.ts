import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class Companies {
  id: number;
  @IsString()
  @IsNotEmpty()
  companyName: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  companyEmail: string;
  @IsNotEmpty()
  companyPhone: string;
  companyWebsite?: string;
  howCanWeHelp?: string;
  termsAndConditions: boolean;
}
