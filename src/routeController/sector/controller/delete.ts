import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();
export async function deleteSector(req: Request, res: Response) {
    try {
      const sectorId = parseInt(req.params.id);
  
      const sector = await prisma.sector.delete({
        where: {
          id: sectorId,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Sector deleted successfully',
        data: sector,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }