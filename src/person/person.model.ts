export class Person {
  id: number;
  dni: string;
  dniNumber: string;
  birthday: Date;
  name: string;
  surname: string;
  about: string;
  address: string;
  cp?: string;
  email: string;
  gender?: string;
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
  level: string;
  title: string;
  institute: string;
  fieldOfStudy: string;
  currentlyStudying?: boolean;
  startStudyDate: Date;
  endStudyDate?: Date;
  countyStudy?: string;
  cityStudy?: string;
}

export class WorkExperienceModel {
  id: number;
  role: string;
  company: string;
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
