/*
  Warnings:

  - You are about to drop the column `sectorId` on the `poolingBooth` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "poolingBooth" DROP CONSTRAINT "poolingBooth_sectorId_fkey";

-- AlterTable
ALTER TABLE "poolingBooth" DROP COLUMN "sectorId",
ADD COLUMN     "poolingBoothId" INTEGER;

-- AddForeignKey
ALTER TABLE "poolingBooth" ADD CONSTRAINT "poolingBooth_poolingBoothId_fkey" FOREIGN KEY ("poolingBoothId") REFERENCES "village"("id") ON DELETE CASCADE ON UPDATE CASCADE;
