import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
// import { CustomError } from 'src/utlis/throwError';

const prisma = new PrismaClient();
export async function editKarykarta(req: Request, res: Response) {
    try {
      const karykartaId = parseInt(req.params.id);
      const updatedData = req.body as KarykartaInput;
  
      const karykarta = await prisma.karykarta.update({
        where: {
          id: karykartaId,
        },
        data: updatedData,
        include: {
          mundal: true,
          sector: true,
          poolingBooth: true,
        },
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Karykarta updated successfully',
        data: karykarta,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  interface KarykartaInput {
    name?: string;
    address?: string;
    mobileNumber?: string;
    dob?: string;
    religion?: string;
    gender?: string;
    previousParty?: string;
    mundalId?: number;
    sectorId?: number;
    poolingBoothId?: number;
  }