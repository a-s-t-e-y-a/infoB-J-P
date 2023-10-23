import {Response} from 'express'
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';
import { CustomError } from 'src/utlis/throwError';

const prisma = new PrismaClient();
interface villageInterface{
  name: string,
  sectorId :number
}
export async function updateVillage(req: Authenticate, res: Response) {
  try {
    const villageId = parseInt(req.params.id); // Assuming you're passing the village ID in the URL
    const { name, sectorId } = req.body as villageInterface;
    const village = await prisma.village.findUnique({
      where: {
        id: villageId,
      },
    });
    if (!village) {
      throw new CustomError('Village not found', 404, 'Not Found');
    }
    const updatedVillage = await prisma.village.update({
      where: {
        id: villageId,
      },
      data: {
        name,
        sector: { connect: { id: Number(sectorId) } },
      },
    });
    responseSuccess(res, {
      data: updatedVillage,
      message: 'Village updated successfully',
      status: 200,
    });
  } catch (error) {
    errorResponse(res, error);
  }
}

