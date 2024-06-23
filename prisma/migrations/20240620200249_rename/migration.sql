/*
  Warnings:

  - You are about to drop the column `flowers` on the `SavedBouquet` table. All the data in the column will be lost.
  - Added the required column `bouquet` to the `SavedBouquet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedBouquet" DROP COLUMN "flowers",
ADD COLUMN     "bouquet" TEXT NOT NULL;
