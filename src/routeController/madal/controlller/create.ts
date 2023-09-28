import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { MundalInput } from 'src/interfaces/mundal';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();
export async function createMundal(req: Request, res: Response) {
  try {
    const { name } = req.body as MundalInput;
    const mundalFind = await prisma.mundal.findMany({
      where:{
        name:name
      }
    })
    if(mundalFind.length>0){
      throw new CustomError('Data with this name already exist', 404 , 'Bad request')
    }
    const mundal = await prisma.mundal.create({
      data: {
        name,
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
