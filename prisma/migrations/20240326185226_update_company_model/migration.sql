/*
  Warnings:

  - Added the required column `currentlyWorking` to the `Companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `howCanWeHelp` to the `Companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Companies" ADD COLUMN     "currentlyWorking" BOOLEAN NOT NULL,
ADD COLUMN     "howCanWeHelp" TEXT NOT NULL;
