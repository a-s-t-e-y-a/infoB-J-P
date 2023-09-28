/*
  Warnings:

  - You are about to drop the column `sectorId` on the `karykarta` table. All the data in the column will be lost.
  - You are about to drop the column `adhyakshaBooth` on the `poolingBooth` table. All the data in the column will be lost.
  - You are about to drop the column `mundalId` on the `poolingBooth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mundalId]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sectorId]` on the table `poolingBooth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Sector` DROP FOREIGN KEY `Sector_mundalId_fkey`;

-- DropForeignKey
ALTER TABLE `karykarta` DROP FOREIGN KEY `karykarta_sectorId_fkey`;

-- DropForeignKey
ALTER TABLE `poolingBooth` DROP FOREIGN KEY `poolingBooth_mundalId_fkey`;

-- DropForeignKey
ALTER TABLE `poolingBooth` DROP FOREIGN KEY `poolingBooth_sectorId_fkey`;

-- AlterTable
ALTER TABLE `Sector` MODIFY `mundalId` INTEGER NULL;

-- AlterTable
ALTER TABLE `karykarta` DROP COLUMN `sectorId`;

-- AlterTable
ALTER TABLE `poolingBooth` DROP COLUMN `adhyakshaBooth`,
    DROP COLUMN `mundalId`,
    MODIFY `sectorId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Sector_mundalId_key` ON `Sector`(`mundalId`);

-- CreateIndex
CREATE UNIQUE INDEX `poolingBooth_sectorId_key` ON `poolingBooth`(`sectorId`);

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poolingBooth` ADD CONSTRAINT `poolingBooth_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
