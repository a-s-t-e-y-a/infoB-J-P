import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
// import { CustomError } from '../../../utlis/throwError';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function createKarykarta(req: Request, res: Response) {
  try {
    const {
      name,
      address,
      mobileNumber,
      dob,
      religion,
      gender,
      previousParty,
      mundalId,
      sectorId,
      poolingBoothId,
    } = req.body as KarykartaInput;

    const karykarta = await prisma.karykarta.create({
      data: {
        name,
        address,
        mobileNumber,
        dob,
        religion,
        gender,
        previousParty: previousParty || 'None', // Default to "None" if not provided
        role: 'karyakarta', // Default role
        // Connect related entities based on their IDs
        mundal: {
          connect: { id: mundalId },
        },
        sector: {
          connect: { id: sectorId },
        },
        poolingBooth: {
          connect: { id: poolingBoothId },
        },
      },
      include: {
        mundal: true, // Include the mundal data in the response
        sector: true, // Include the sector data in the response
        poolingBooth: true, // Include the poolingBooth data in the response
      },
    });

    responseSuccess(res, {
      status: 200,
      message: 'Karykarta created successfully',
      data: karykarta,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

interface KarykartaInput {
  name: string;
  address: string;
  mobileNumber: string;
  dob: string;
  religion: string;
  gender: string;
  previousParty?: string;
  mundalId?: number;
  sectorId?: number;
  poolingBoothId?: number;
}
