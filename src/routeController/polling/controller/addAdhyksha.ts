import {  Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../.././../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { CustomError } from "../../../utlis/throwError";
import { Authenticate } from "src/interfaces/requestInterface";
import { errorMonitor } from "stream";

const prisma = new PrismaClient();


export async function Booth(req:Authenticate,res:Response){
  try{
    const adhyakshaBooth :string = req.body.adhyakshaBooth
    const id :string = req.body.id

    if(adhyakshaBooth!=""){
      const data = await prisma.karykarta.update({
        where:{
          id:Number(adhyakshaBooth)
        },
        data:{
          role:'adhyakshaBooth',
          poolingBoothid:Number(id)
        }
      })
      responseSuccess(res,{
        message:'Data updated successfully',
        data:data,
        status:200
      })
    }else{
      throw new CustomError('Please select any one',404,'BAD REQUEST')
    }
  }catch(err){
    console.log(err)
    errorResponse(res,err)
  }
}
