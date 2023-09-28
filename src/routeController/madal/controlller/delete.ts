import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function deleteMundal(req: Request, res: Response) {
    try {
      const mundalId = parseInt(req.params.id);
  
      const mundal = await prisma.mundal.delete({
        where: {
          id: mundalId,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Mundal deleted successfully',
        data: mundal,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  