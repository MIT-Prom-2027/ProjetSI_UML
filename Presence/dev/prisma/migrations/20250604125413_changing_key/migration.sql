/*
  Warnings:

  - A unique constraint covering the columns `[titre]` on the table `Matiere` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Matiere_titre_key" ON "Matiere"("titre");
