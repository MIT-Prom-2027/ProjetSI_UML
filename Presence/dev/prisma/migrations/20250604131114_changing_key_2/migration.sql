/*
  Warnings:

  - You are about to drop the column `date` on the `Cours` table. All the data in the column will be lost.
  - Added the required column `date_deb` to the `Cours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_fin` to the `Cours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cours" DROP COLUMN "date",
ADD COLUMN     "date_deb" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_fin" TIMESTAMP(3) NOT NULL;
