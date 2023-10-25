-- DropForeignKey
ALTER TABLE "village" DROP CONSTRAINT "village_sectorId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "image" TEXT;

-- AddForeignKey
ALTER TABLE "village" ADD CONSTRAINT "village_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
