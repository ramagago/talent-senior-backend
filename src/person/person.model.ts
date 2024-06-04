import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Person {
  id: number;
  @IsNotEmpty()
  dni: string;
  @IsNotEmpty()
  dniNumber: string;
  birthday: Date;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  surname: string;
  @IsString()
  @IsNotEmpty()
  about: string;
  address: string;
  cp?: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  gender?: string;
  @IsNotEmpty()
  phone: string;
  countyPD?: string;
  cityPD?: string;
  liveAbroad?: boolean;
  currentCountry?: string;
  currentCity?: string;

  languages: LanguageModel[];
  references: ReferenceModel[];
  studies: StudyModel[];
  workExperiences: WorkExperienceModel[];
}

export class LanguageModel {
  id: number;
  languageName: string;
  spokenLevel: number;
  readLevel: number;
  writtenLevel: number;
}

export class ReferenceModel {
  id: number;
  referenceRole: string;
  referenceName: string;
  referenceSurname: string;
  referencePhone: string;
  referenceCompany: string;
  referenceType: string;
}

export class StudyModel {
  id: number;
  @IsNotEmpty()
  @IsString()
  levelOfStudy: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  institute: string;
  @IsNotEmpty()
  @IsString()
  fieldOfStudy: string;
  currentlyStudying?: boolean;
  startStudyDate: Date;
  endStudyDate?: Date;
  countyStudy?: string;
  cityStudy?: string;
}

export class WorkExperienceModel {
  id: number;
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  company: string;
  @IsNotEmpty()
  workField: string;
  positionLevel?: string;
  peopleInCharge?: string;
  task?: string;
  salary?: string;
  startWorkDate: Date;
  currentlyWorking?: boolean;
  endWorkDate?: Date;
  skills: string[];
}
