import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from 'src/utlis/throwError';

const prisma = new PrismaClient();

// Get a karykarta by ID
export async function getKarykartaById(req: Request, res: Response) {
  try {
    const karykartaId = parseInt(req.params.id);

    const karykarta = await prisma.karykarta.findUnique({
      where: {
        id: karykartaId,
      },
      include: {
        mundal: true,
        sector: true,
        poolingBooth: true,
      },
    });

    if (!karykarta) {
      throw new CustomError('Kareykarta doesnt exist', 404,'Bad request' )
    }

    responseSuccess(res, {
      status: 200,
      message: 'Karykarta retrieved successfully',
      data: karykarta,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}