import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';


const prisma = new PrismaClient();
export async function deletePoolingBooth(req: Request, res: Response) {
    try {
      const poolingBoothId = parseInt(req.params.id);
  
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