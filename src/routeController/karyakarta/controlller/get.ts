import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function getKarykarta(req: Request, res: Response) {
  try {
    const { mundalId, sectorId, poolingBoothId, previousParty } = req.query;

    const karykartas = await prisma.karykarta.findMany({
      where: {
        mundalId: mundalId ? parseInt(mundalId.toString()) : undefined,
        sectorId: sectorId ? parseInt(sectorId.toString()) : undefined,
        poolingBoothid: poolingBoothId
          ? parseInt(poolingBoothId.toString())
          : undefined,
        previousParty: previousParty
          ? {
              contains: previousParty.toString(),
            }
          : undefined,
      },
      include: {
        mundal: true, // Include the mundal data in the response
        sector: true, // Include the sector data in the response
        poolingBooth: true, // Include the poolingBooth data in the response
      },
    });

    responseSuccess(res, {
      status: 200,
      message: 'Karykartas retrieved successfully',
      data: karykartas,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
