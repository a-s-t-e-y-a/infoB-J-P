import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';
import { responseSuccess } from '../../../utlis/responseSuccess';

const prisma = new PrismaClient();

export async function getUser(req:Authenticate , res:Response){
  try{
  const data = await prisma.user.findMany({})
    responseSuccess(res , {
      data:data,
      message:'all user fetched' , 
      status:200
    })
  }catch(error){
    errorResponse(res , error)
  }
}
