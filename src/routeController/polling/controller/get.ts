import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();

export async function getPoolingBoothById(req: Request, res: Response) {
    try {
      const poolingBoothId = parseInt(req.params.id);
  
      const poolingBooth = await prisma.poolingBooth.findUnique({
        where: {
          id: poolingBoothId,
        },
        include: {
          // mundal: true,
          sector: true,
          karykarta: true,
        },
      });
  
      if (!poolingBooth) {
        throw new CustomError('Pooling booth doesnit found',  404,'Bad request')
      }
  
      responseSuccess(res, {
        status: 200,
        message: 'PoolingBooth retrieved successfully',
        data: poolingBooth,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }

  // Get all PoolingBooths with optional filters for sectorId and mundalId
export async function getAllPoolingBooths(req: Request, res: Response) {
    try {
      const { sectorId, mundalId } = req.query;
  
      const filters: Record<string, any> = {}; // Define the types for sectorId and mundalId
  
      // If sectorId is provided, filter by it
      if (sectorId) {
        filters.sectorId = parseInt(sectorId.toString());
      }
  
      // If mundalId is provided, filter by it
      if (mundalId) {
        filters.mundalId = parseInt(mundalId.toString());
      }
  
      const poolingBooths = await prisma.poolingBooth.findMany({
        where: filters,
        include:{
          sector:true
        }
      });
  
      responseSuccess(res, {
        status: 200,
        message: 'PoolingBooths retrieved successfully',
        data: poolingBooths,
      });
    } catch (err) {
      console.error(err);
      errorResponse(res, err);
    }
  }