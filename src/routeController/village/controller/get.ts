import {Response} from 'express'
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();


export async function getVillages(req: Authenticate, res: Response) {
  try {
    const villages = await prisma.village.findMany({
      include:{sector:true}
    });
    responseSuccess(res, {
      data: villages,
      message: 'Villages retrieved successfully',
      status: 200,
    });
  } catch (error) {
    errorResponse(res, error);
  }
}
export async function getVillageById(req: Authenticate, res: Response) {
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
    responseSuccess(res, {
      data: village,
      message: 'Village retrieved successfully',
      status: 200,
    });
  } catch (error) {
    errorResponse(res, error);
  }
}

