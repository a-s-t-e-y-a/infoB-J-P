import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { MundalInput } from 'src/interfaces/mundal';
import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';

const prisma = new PrismaClient();
export async function createMundal(req: Request, res: Response) {
    try {
      const { name, adhyaksha, upaadhyaksha, mahamantri, mantri, koshadhyaksha } =
        req.body as MundalInput;
  
      const mundal = await prisma.mundal.create({
        data: {
          name,
          adhyaksha,
          upaadhyaksha,
          mahamantri,
          mantri,
          koshadhyaksha,
        },
      });
  
      responseSuccess(res, {
        status: 201,
        message: 'Mundal created successfully',
        data: mundal,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  