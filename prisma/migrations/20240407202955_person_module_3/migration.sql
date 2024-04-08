/*
  Warnings:

  - You are about to drop the column `currentlyWorking` on the `Companies` table. All the data in the column will be lost.
  - You are about to drop the column `genero` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `companyPhone` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `companyWebsite` on the `Study` table. All the data in the column will be lost.
  - Made the column `about` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Person` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `referenceType` to the `Reference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startWorkDate` to the `WorkExperience` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "currentlyWorking";

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "genero",
ADD COLUMN     "cityPD" TEXT,
ADD COLUMN     "countyPD" TEXT,
ADD COLUMN     "gender" TEXT,
ALTER COLUMN "about" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reference" ADD COLUMN     "referenceType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "companyPhone",
DROP COLUMN "companyWebsite",
ADD COLUMN     "cityStudy" TEXT,
ADD COLUMN     "countyStudy" TEXT,
ADD COLUMN     "endStudyDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "WorkExperience" ADD COLUMN     "currentlyWorking" BOOLEAN,
ADD COLUMN     "endWorkDate" TIMESTAMP(3),
ADD COLUMN     "salary" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "startWorkDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "task" TEXT,
ALTER COLUMN "positionLevel" DROP NOT NULL,
ALTER COLUMN "peopleInCharge" DROP NOT NULL;
