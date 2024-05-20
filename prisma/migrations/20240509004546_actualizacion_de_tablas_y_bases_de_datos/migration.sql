/*
  Warnings:

  - Added the required column `termsAndConditions` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "termsAndConditions" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "currentCity" TEXT,
ADD COLUMN     "currentCountry" TEXT,
ADD COLUMN     "liveAbroad" BOOLEAN;

-- AlterTable
ALTER TABLE "Reference" ALTER COLUMN "referenceCompany" DROP NOT NULL,
ALTER COLUMN "referenceRole" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "studySitutation" TEXT;
