/*
  Warnings:

  - You are about to drop the `Persona` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Persona";

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "dniNumber" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "about" TEXT,
    "address" TEXT,
    "cp" TEXT,
    "email" TEXT,
    "genero" TEXT,
    "phone" TEXT,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "languageName" TEXT NOT NULL,
    "spokenLevel" INTEGER NOT NULL,
    "readLevel" INTEGER NOT NULL,
    "writtenLevel" INTEGER NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" SERIAL NOT NULL,
    "referenceType" TEXT NOT NULL,
    "referenceName" TEXT NOT NULL,
    "referenceSurname" TEXT NOT NULL,
    "referencePhone" TEXT NOT NULL,
    "referenceCompany" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "startStudyDate" TIMESTAMP(3) NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "workField" TEXT NOT NULL,
    "positionLevel" TEXT NOT NULL,
    "peopleInCharge" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyWebsite" TEXT,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
