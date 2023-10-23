import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { PoolingBoothInput } from 'src/interfaces/pooling';
import { CustomError } from '../../../utlis/throwError';
import { Authenticate } from 'src/interfaces/requestInterface';

const prisma = new PrismaClient();

export async function createPoolingBooth(req:Authenticate, res: Response) {
  try {
    const { name, sectorId, karykartadId } = req.body as PoolingBoothInput;
    const poolingBoothFind = await prisma.poolingBooth.findMany({
      where: {
        name: name,
      },
    });
    if (poolingBoothFind.length > 0) {
      throw new CustomError(
        'Pooling booth already added to sector ',
        500,
        'Bad request'
      );
    }
    const karyakartaFind = await prisma.karykarta.findUnique({
      where: {
        id: Number(karykartadId),
      },
    });
    if (karyakartaFind) {
      if (karyakartaFind.role == 'karyakarta') {
        const poolingBooth = await prisma.poolingBooth.create({
          data: {
            name,
            karykarta: {
              connect: {
                id: Number(karykartadId),
              },
            },
            sector: {
              connect: { id: Number(sectorId) },
            },
            author:{connect:{id:req.userId}}
          },
        });
        await prisma.karykarta.update({
          where: {
            id: Number(karykartadId),
          },
          data: {
            role: 'adhyakshaBooth',
          },
        });
        responseSuccess(res, {
          status: 201,
          message: 'PoolingBooth created successfully',
          data: poolingBooth,
        });
      } else {
        throw new CustomError(
          'This karykarta role is already defined ',
          404,
          'Bad request'
        );
      }
    } else {
      const poolingBooth = await prisma.poolingBooth.create({
        data: {
          name,
          sector: {
            connect: { id: Number(sectorId) },
          },
          author:{connect:{id:req.userId}}
        },
      });
      responseSuccess(res, {
        status: 201,
        message: 'PoolingBooth created successfully',
        data: poolingBooth,
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
