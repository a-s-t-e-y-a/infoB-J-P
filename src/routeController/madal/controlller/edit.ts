import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { MundalInput } from 'src/interfaces/mundal';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();
// Edit a Mundal by ID
export async function editMundal(req: Request, res: Response) {
    try {
      const mundalId = parseInt(req.params.id);
      const updatedData = req.body as MundalInput;
  
      const mundal = await prisma.mundal.update({
        where: {
          id: mundalId,
        },
        data: updatedData,
        include: {
          karyakarta: true,
          Sector: true,
          // poolingBooth: true,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Mundal updated successfully',
        data: mundal,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  