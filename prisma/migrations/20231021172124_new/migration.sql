/*
  Warnings:

  - You are about to drop the column `village` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Mundal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `karykarta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `poolingBooth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mundal" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Sector" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "village";

-- AlterTable
ALTER TABLE "karykarta" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "poolingBooth" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "village" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "village_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mundal" ADD CONSTRAINT "Mundal_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poolingBooth" ADD CONSTRAINT "poolingBooth_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karykarta" ADD CONSTRAINT "karykarta_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
