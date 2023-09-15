/*
  Warnings:

  - You are about to drop the column `prabhari` on the `Sector` table. All the data in the column will be lost.
  - You are about to drop the column `sanyojak` on the `Sector` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `karykarta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `adhyaksha` on the `poolingBooth` table. All the data in the column will be lost.
  - Added the required column `shaktikendraSanyojak` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shaktikendraprabhari` to the `Sector` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adhyakshaBooth` to the `poolingBooth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Sector` DROP COLUMN `prabhari`,
    DROP COLUMN `sanyojak`,
    ADD COLUMN `shaktikendraSanyojak` INTEGER NOT NULL,
    ADD COLUMN `shaktikendraprabhari` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `karykarta` MODIFY `role` ENUM('karyakarta', 'adhyaksha', 'koshadhyaksha', 'mahamantri', 'mantri', 'upaadhyaksha', 'adhyakshaBooth', 'shaktikendraSanyojak', 'shaktikendraprabhari') NOT NULL DEFAULT 'karyakarta';

-- AlterTable
ALTER TABLE `poolingBooth` DROP COLUMN `adhyaksha`,
    ADD COLUMN `adhyakshaBooth` VARCHAR(191) NOT NULL;
