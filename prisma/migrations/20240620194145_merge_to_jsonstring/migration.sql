/*
  Warnings:

  - You are about to drop the column `description` on the `SavedBouquet` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `SavedBouquet` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SavedBouquet` table. All the data in the column will be lost.
  - Added the required column `flowers` to the `SavedBouquet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedBouquet" DROP COLUMN "description",
DROP COLUMN "img",
DROP COLUMN "name",
ADD COLUMN     "flowers" TEXT NOT NULL;
