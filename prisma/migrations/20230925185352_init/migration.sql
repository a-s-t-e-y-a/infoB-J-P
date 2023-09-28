/*
  Warnings:

  - You are about to drop the column `adhyaksha` on the `Mundal` table. All the data in the column will be lost.
  - You are about to drop the column `koshadhyaksha` on the `Mundal` table. All the data in the column will be lost.
  - You are about to drop the column `mahamantri` on the `Mundal` table. All the data in the column will be lost.
  - You are about to drop the column `mantri` on the `Mundal` table. All the data in the column will be lost.
  - You are about to drop the column `upaadhyaksha` on the `Mundal` table. All the data in the column will be lost.
  - You are about to drop the column `shaktikendraSanyojak` on the `Sector` table. All the data in the column will be lost.
  - You are about to drop the column `shaktikendraprabhari` on the `Sector` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Mundal` DROP COLUMN `adhyaksha`,
    DROP COLUMN `koshadhyaksha`,
    DROP COLUMN `mahamantri`,
    DROP COLUMN `mantri`,
    DROP COLUMN `upaadhyaksha`;

-- AlterTable
ALTER TABLE `Sector` DROP COLUMN `shaktikendraSanyojak`,
    DROP COLUMN `shaktikendraprabhari`;
