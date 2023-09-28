-- AlterTable
ALTER TABLE `karykarta` ADD COLUMN `sectorId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
