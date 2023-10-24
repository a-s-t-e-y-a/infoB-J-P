import {Response} from 'express'
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();

export async function deleteVillage(req: Authenticate, res: Response) {
  try {
    const villageId = parseInt(req.params.id); // Assuming you're passing the village ID in the URL
    const village = await prisma.village.findUnique({
      where: {
        id: villageId,
      },
    });
    if (!village) {
      throw new CustomError('Village not found', 404, 'Not Found');
    }
    const data = await prisma.village.delete({
      where: {
        id: villageId,
      },
    });
    responseSuccess(res, {
      data:data,
      message: 'Village deleted successfully',
      status: 200,
    });
  } catch (error) {
    errorResponse(res, error);
  }
}

