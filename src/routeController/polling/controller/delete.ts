import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function deletePoolingBooth(req: Request, res: Response) {
  try {
    const poolingBoothId = parseInt(req.params.id);

    // First, update the associated karyakarta records
    await prisma.karykarta.updateMany({
      where: {
        poolingBoothid: poolingBoothId,
      },
      data: {
        role: 'karyakarta',
        poolingBoothid: null,
      },
    });

    // Then, delete the poolingBooth
    const poolingBooth = await prisma.poolingBooth.delete({
      where: {
        id: poolingBoothId,
      },
    });

    responseSuccess(res, {
      status: 200,
      message: 'PoolingBooth deleted successfully',
      data: poolingBooth,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

