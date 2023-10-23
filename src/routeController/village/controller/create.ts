import {Response} from 'express'
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';

const prisma = new PrismaClient();
interface villageInterface{
  name : string,
  sectorId: string
}
export async function createVillage (req : Authenticate , res: Response){
  try {
    const {name , sectorId} =req.body as villageInterface
    const village  = await prisma.village.findMany({
      where:{
        name : name
      }
    })
    if (village.length>0){
      throw new CustomError('Village with this name already exist', 500 , 'Bad request')
    }
    const villageData  =  await prisma.village.create({
      data:{
        name, 
        sector:{connect:{id: Number(sectorId)}},
        author:{connect:{id:req.userId}}
      }
    })
    responseSuccess(res ,{
      data:villageData,
      message :'Village created successfully',
      status:200
    })
  }catch(error){
    errorResponse(res, error)
  }
}
