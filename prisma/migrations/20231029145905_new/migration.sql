-- AlterTable
ALTER TABLE "poolingBooth" ADD COLUMN     "mundalId" INTEGER;

-- AlterTable
ALTER TABLE "village" ADD COLUMN     "mundalId" INTEGER;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_mundalId_fkey" FOREIGN KEY ("mundalId") REFERENCES "Mundal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poolingBooth" ADD CONSTRAINT "poolingBooth_mundalId_fkey" FOREIGN KEY ("mundalId") REFERENCES "Mundal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
