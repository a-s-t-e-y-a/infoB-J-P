-- CreateEnum
CREATE TYPE "Role" AS ENUM ('karyakarta', 'adhyaksha', 'koshadhyaksha', 'mahamantri', 'mantri', 'upaadhyaksha', 'adhyakshaBooth', 'shaktikendraSanyojak', 'shaktikendraprabhari');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mundal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mundal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mundalId" INTEGER,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poolingBooth" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sectorId" INTEGER,

    CONSTRAINT "poolingBooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "karykarta" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "previousParty" TEXT DEFAULT 'None',
    "mundalId" INTEGER,
    "sectorId" INTEGER,
    "poolingBoothid" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'karyakarta',

    CONSTRAINT "karykarta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "poolingBooth_sectorId_key" ON "poolingBooth"("sectorId");

-- AddForeignKey
ALTER TABLE "Sector" ADD CONSTRAINT "Sector_mundalId_fkey" FOREIGN KEY ("mundalId") REFERENCES "Mundal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poolingBooth" ADD CONSTRAINT "poolingBooth_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karykarta" ADD CONSTRAINT "karykarta_mundalId_fkey" FOREIGN KEY ("mundalId") REFERENCES "Mundal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karykarta" ADD CONSTRAINT "karykarta_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "karykarta" ADD CONSTRAINT "karykarta_poolingBoothid_fkey" FOREIGN KEY ("poolingBoothid") REFERENCES "poolingBooth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
