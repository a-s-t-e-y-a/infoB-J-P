import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';
import { responseSuccess } from '../../../utlis/responseSuccess';

const prisma = new PrismaClient();
export async function getMundalById(req: Request, res: Response) {
  try {
    const mundalId = parseInt(req.params.id);

    const mundal = await prisma.mundal.findUnique({
      where: {
        id: mundalId,
      },
      include: {
        karyakarta: true,
        Sector: {
          include: {
            poolingBooth: true,
          }
        },
      },
    });

    if (!mundal) {
      throw new CustomError('Mundal doesnit found', 404, 'Bad request');
    }

    responseSuccess(res, {
      status: 200,
      message: 'Mundal retrieved successfully',
      data: mundal,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

export async function getAllMundals(req: Request, res: Response) {
  try {
    const mundals = await prisma.mundal.findMany({
      include: {
        karyakarta: true,
        Sector: {
          include: {
            poolingBooth: true,
          }
        },
      },
    });
    

    responseSuccess(res, {
      status: 200,
      message: 'All Mundals retrieved successfully',
      data: mundals,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
