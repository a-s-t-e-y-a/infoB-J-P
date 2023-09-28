import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../.././../utlis/responseError';
import { SectorInput } from 'src/interfaces/sector';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();
// Create a Sector
export async function createSector(req: Request, res: Response) {
  try {
    const { name, mundalId } = req.body as SectorInput;
    const sectorFind = await prisma.sector.findMany({
      where: {
        name: name,
      },
    });
    if (sectorFind.length > 0) {
      throw new CustomError(
        'Sector with this name already exist or alreday connected with mandal',
        404,
        'Bad request'
      );
    }
    const sector = await prisma.sector.create({
      data: {
        name,
        // Connect the sector to a Mundal using the mundalId
        mundal: {
          connect: { id: Number(mundalId) },
        },
      },
    });

    responseSuccess(res, {
      status: 201,
      message: 'Sector created successfully',
      data: sector,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
