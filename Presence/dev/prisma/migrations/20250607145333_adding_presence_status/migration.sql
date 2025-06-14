/*
  Warnings:

  - Added the required column `status` to the `Presence` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusPresence" AS ENUM ('Present', 'Absent');

-- AlterTable
ALTER TABLE "Presence" ADD COLUMN     "status" "StatusPresence" NOT NULL;
