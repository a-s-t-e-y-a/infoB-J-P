-- AlterTable
ALTER TABLE "village" ADD COLUMN     "sectorId" INTEGER;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
