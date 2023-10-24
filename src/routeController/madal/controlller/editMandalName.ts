import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { MundalInput } from "src/interfaces/mundal";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";
import { CustomError } from "../../../utlis/throwError";
import { info } from "console";

const prisma = new PrismaClient();
export async function editName(req:Request, res:Response){
  try {
    const data = await prisma.mundal.findUnique({
      where:{
        id:Number(req.params.id)
      }
    })
    if(!data){
      throw new CustomError('Data do not exist',404 ,'BAD REQUEST')
    }
      const info = await prisma.mundal.update({
        where:{
          id:Number(req.params.id)
        },
        data:{
          name:req.body.name
        }
      })
    
    responseSuccess(res , {
      message:'data update scucess',
      data:info,
      status:200
    })
  }catch(error){
    errorResponse(res , error)
  }
}
