import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { PoolingBoothInput } from 'src/interfaces/pooling';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();

export async function createPoolingBooth(req: Request, res: Response) {
    try {
      const { name, sectorId } =
        req.body as PoolingBoothInput;
      const poolingBoothFind = await prisma.poolingBooth.findMany({
        where:{
          name :name
        }
      })
      if(poolingBoothFind.length>0){
        throw new CustomError('Pooling booth already added to sector ', 500 , 'Bad request')
      }
      const poolingBooth = await prisma.poolingBooth.create({
        data: {
          name,
          // adhyakshaBooth,
          // mundal: {
          //   connect: { id: mundalId },
          // },
          sector: {
            connect: { id: Number(sectorId) },
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