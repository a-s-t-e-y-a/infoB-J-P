-- DropForeignKey
ALTER TABLE `Sector` DROP FOREIGN KEY `Sector_mundalId_fkey`;

-- DropForeignKey
ALTER TABLE `karykarta` DROP FOREIGN KEY `karykarta_mundalId_fkey`;

-- DropForeignKey
ALTER TABLE `poolingBooth` DROP FOREIGN KEY `poolingBooth_sectorId_fkey`;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poolingBooth` ADD CONSTRAINT `poolingBooth_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
