/*
  Warnings:

  - Added the required column `companyPhone` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "companyPhone" TEXT NOT NULL,
ADD COLUMN     "companyWebsite" TEXT,
ADD COLUMN     "currentlyStudying" BOOLEAN;
