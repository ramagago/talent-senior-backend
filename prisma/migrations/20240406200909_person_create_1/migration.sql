/*
  Warnings:

  - You are about to drop the column `referenceType` on the `Reference` table. All the data in the column will be lost.
  - Added the required column `referenceRole` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "referenceType",
ADD COLUMN     "referenceRole" TEXT NOT NULL;
