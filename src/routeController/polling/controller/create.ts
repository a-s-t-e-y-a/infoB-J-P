import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';
import { PoolingBoothInput } from 'src/interfaces/pooling';

const prisma = new PrismaClient();

export async function createPoolingBooth(req: Request, res: Response) {
    try {
      const { name, adhyakshaBooth, mundalId, sectorId } =
        req.body as PoolingBoothInput;
  
      const poolingBooth = await prisma.poolingBooth.create({
        data: {
          name,
          adhyakshaBooth,
          mundal: {
            connect: { id: mundalId },
          },
          sector: {
            connect: { id: sectorId },
          },
        },
      });
  
      responseSuccess(res, {
        status: 201,
        message: 'PoolingBooth created successfully',
        data: poolingBooth,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }