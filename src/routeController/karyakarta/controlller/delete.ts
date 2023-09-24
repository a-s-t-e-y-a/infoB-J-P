import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';


const prisma = new PrismaClient();
export async function deleteKarykarta(req: Request, res: Response) {
    try {
      const karykartaId = parseInt(req.params.id);
  
      const karykarta = await prisma.karykarta.delete({
        where: {
          id: karykartaId,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Karykarta deleted successfully',
        data: karykarta,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
 