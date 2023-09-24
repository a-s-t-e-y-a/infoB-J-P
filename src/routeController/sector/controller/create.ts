import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';
import { SectorInput } from 'src/interfaces/sector';

const prisma = new PrismaClient();
// Create a Sector
export async function createSector(req: Request, res: Response) {
    try {
      const { name, shaktikendraSanyojak, shaktikendraprabhari, mundalId } =
        req.body as SectorInput;
  
      const sector = await prisma.sector.create({
        data: {
          name,
          shaktikendraSanyojak,
          shaktikendraprabhari,
          // Connect the sector to a Mundal using the mundalId
          mundal: {
            connect: { id: mundalId },
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
  