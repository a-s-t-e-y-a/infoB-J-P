import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { MundalInput } from 'src/interfaces/mundal';
import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';

const prisma = new PrismaClient();
export async function editSector(req: Request, res: Response) {
    try {
      const sectorId = parseInt(req.params.id);
      const updatedData = req.body as SectorInput;
  
      const sector = await prisma.sector.update({
        where: {
          id: sectorId,
        },
        data: updatedData,
        include: {
          mundal: true,
          karykarta: true,
          poolingBooth: true,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Sector updated successfully',
        data: sector,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  