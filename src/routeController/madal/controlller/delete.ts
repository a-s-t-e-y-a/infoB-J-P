import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function deleteMundal(req: Request, res: Response) {
    try {
      const mundalId = parseInt(req.params.id);
  
     
        // Delete Mundal and all related data
       const mundal = await prisma.mundal.delete({
          where: { id: mundalId },
          include: {
            karyakarta: true, // Include related Karyakarta
            Sector: {
              include: {
                village: true, // Include related poolingBooth
              },
            },
          },
        });
        console.log(`Mundal with ID ${mundalId} and related data deleted successfully.`);
     
  
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
  
