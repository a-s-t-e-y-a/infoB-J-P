-- DropForeignKey
ALTER TABLE `karykarta` DROP FOREIGN KEY `karykarta_mundalId_fkey`;

-- DropForeignKey
ALTER TABLE `karykarta` DROP FOREIGN KEY `karykarta_poolingBoothid_fkey`;

-- DropForeignKey
ALTER TABLE `karykarta` DROP FOREIGN KEY `karykarta_sectorId_fkey`;

-- AlterTable
ALTER TABLE `Mundal` MODIFY `adhyaksha` INTEGER NOT NULL DEFAULT 0,
    MODIFY `upaadhyaksha` INTEGER NOT NULL DEFAULT 0,
    MODIFY `mahamantri` INTEGER NOT NULL DEFAULT 0,
    MODIFY `mantri` INTEGER NOT NULL DEFAULT 0,
    MODIFY `koshadhyaksha` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `karykarta` MODIFY `mundalId` INTEGER NULL,
    MODIFY `sectorId` INTEGER NULL,
    MODIFY `poolingBoothid` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_poolingBoothid_fkey` FOREIGN KEY (`poolingBoothid`) REFERENCES `poolingBooth`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
