import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function getKarykarta(req: Request, res: Response) {
  try {
    const { mundalId, role, previousParty } = req.query;

    const karykartas = await prisma.karykarta.findMany({
      where: {
        mundalId: mundalId ? parseInt(mundalId.toString()) : undefined,
        role: role ? (role as Role) : undefined,
        previousParty: previousParty ? previousParty.toString() : undefined,
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
