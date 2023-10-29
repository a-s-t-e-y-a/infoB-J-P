/*
  Warnings:

  - You are about to drop the column `poolingBoothId` on the `poolingBooth` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "poolingBooth" DROP CONSTRAINT "poolingBooth_poolingBoothId_fkey";

-- AlterTable
ALTER TABLE "poolingBooth" DROP COLUMN "poolingBoothId",
ADD COLUMN     "villageId" INTEGER;

-- AddForeignKey
ALTER TABLE "poolingBooth" ADD CONSTRAINT "poolingBooth_villageId_fkey" FOREIGN KEY ("villageId") REFERENCES "village"("id") ON DELETE CASCADE ON UPDATE CASCADE;
