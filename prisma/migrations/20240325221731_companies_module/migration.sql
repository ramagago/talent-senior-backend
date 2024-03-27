/*
  Warnings:

  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Empresa";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyWebsite" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);
