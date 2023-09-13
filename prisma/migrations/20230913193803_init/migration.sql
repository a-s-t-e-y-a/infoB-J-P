/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mandal` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `dob` VARCHAR(191) NOT NULL,
    ADD COLUMN `mandal` VARCHAR(191) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` VARCHAR(191) NOT NULL,
    ADD COLUMN `village` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Post`;

-- CreateTable
CREATE TABLE `Mundal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `adhyaksha` INTEGER NOT NULL,
    `upaadhyaksha` INTEGER NOT NULL,
    `mahamantri` INTEGER NOT NULL,
    `mantri` INTEGER NOT NULL,
    `koshadhyaksha` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sanyojak` INTEGER NOT NULL,
    `prabhari` INTEGER NOT NULL,
    `mundalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `poolingBooth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `adhyaksha` VARCHAR(191) NOT NULL,
    `mundalId` INTEGER NOT NULL,
    `sectorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `karykarta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `mobileNumber` VARCHAR(191) NOT NULL,
    `dob` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `previousParty` VARCHAR(191) NULL DEFAULT 'None',
    `mundalId` INTEGER NOT NULL,
    `sectorId` INTEGER NOT NULL,
    `poolingBoothid` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sector` ADD CONSTRAINT `Sector_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poolingBooth` ADD CONSTRAINT `poolingBooth_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `poolingBooth` ADD CONSTRAINT `poolingBooth_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_mundalId_fkey` FOREIGN KEY (`mundalId`) REFERENCES `Mundal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_sectorId_fkey` FOREIGN KEY (`sectorId`) REFERENCES `Sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `karykarta` ADD CONSTRAINT `karykarta_poolingBoothid_fkey` FOREIGN KEY (`poolingBoothid`) REFERENCES `poolingBooth`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
