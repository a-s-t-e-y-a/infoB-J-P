import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();
export async function getSectorById(req: Request, res: Response) {
    try {
      const sectorId = parseInt(req.params.id);
  
      const sector = await prisma.sector.findUnique({
        where: {
          id: sectorId,
        },
        include: {
          mundal: true,
          karykarta: true,
          poolingBooth: true,
        },
      });
  
      if (!sector) {
        throw new CustomError('sector doesnit found',  404,'Bad request')
      }
  
      responseSuccess(res, {
        status: 200,
        message: 'Sector retrieved successfully',
        data: sector,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }

  export async function getAllSectors(req: Request, res: Response) {
    try {
      const { mundalId } = req.query;
      
      const where = {};
      
      // If mundalId is provided, filter by it
      if (mundalId) {
        where['mundalId'] = parseInt(mundalId.toString());
      }
      
      const sectors = await prisma.sector.findMany({
        where,
        include:{
          mundal:true,
          poolingBooth:true
        }
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'Sectors retrieved successfully',
        data: sectors,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }
  