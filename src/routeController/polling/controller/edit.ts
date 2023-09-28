import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { PoolingBoothInput } from 'src/interfaces/pooling';

const prisma = new PrismaClient();
export async function editPoolingBooth(req: Request, res: Response) {
    try {
      const poolingBoothId = parseInt(req.params.id);
      const updatedData = req.body as PoolingBoothInput;
  
      const poolingBooth = await prisma.poolingBooth.update({
        where: {
          id: poolingBoothId,
        },
        data: updatedData,
        include: {
          // mundal: true,
          sector: true,
          karykarta: true,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'PoolingBooth updated successfully',
        data: poolingBooth,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }