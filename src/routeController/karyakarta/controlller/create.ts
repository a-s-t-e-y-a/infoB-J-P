import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';

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
      role,
      // sectorId,
      // poolingBoothId,
    } = req.body as KarykartaInput;

    // const karykartaData: any = {
    //   name,
    //   address,
    //   mobileNumber,
    //   dob,
    //   religion,
    //   gender,
    //   previousParty: previousParty || 'None',
    //   role: 'karyakarta',
    // };

    // // Conditionally connect related entities based on their IDs
    // if (mundalId) {
    //   karykartaData.mundal = {
    //     connect: { id: mundalId },
    //   };
    // }
    // if (sectorId) {
    //   karykartaData.sector = {
    //     connect: { id: sectorId },
    //   };
    // }
    // if (poolingBoothId) {
    //   karykartaData.poolingBooth = {
    //     connect: { id: poolingBoothId },
    //   };
    // }
    // if(role){
    //   if(role ==)
    // }
    if (role) {
      const karyakartaRoleFind = await prisma.mundal.findUnique({
        where: {
          id: mundalId,
        },
        include: {
          karyakarta: true,
        },
      });
      console.log(role);
      console.log(karyakartaRoleFind);
      if (role == 'adhyaksha') {
        karyakartaRoleFind.karyakarta.map((info) => {
          if (info.role == 'adhyaksha') {
            throw new CustomError(
              'adhyaksha in this mandal already exist',
              400,
              'Bad request'
            );
          }
        });
      } else if (role == 'koshadhyaksha') {
        karyakartaRoleFind.karyakarta.map((info) => {
          if (info.role == 'koshadhyaksha') {
            throw new CustomError(
              'koshadhyaksha in this mandal already exist',
              400,
              'Bad request'
            );
          }
        });
      } else if (role == 'upaadhyaksha') {
        console.log(role)
        let count = 0;
        karyakartaRoleFind.karyakarta.map((info) => {
          if (info.role == 'upaadhyaksha') {
            count++;
            if (count == 4) {
              throw new CustomError(
                'upaadhyaksha in this mandal already exist',
                400,
                'Bad request'
              );
            }
          }
        });
      } else {
        const karykarta = await prisma.karykarta.create({
          data: {
            name,
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundal: { connect: { id: mundalId } },
            role,
          },
          include: {
            mundal: true,
            sector: true,
            poolingBooth: true,
          },
        });

        responseSuccess(res, {
          status: 200,
          message: 'Karykarta created successfully',
          data: karykarta,
        });
      }

      console.log(karyakartaRoleFind);
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}

enum CustomRole {
  karyakarta = 'karyakarta',
  adhyaksha = 'adhyaksha',
  koshadhyaksha = 'koshadhyaksha',
  mahamantri = 'mahamantri',
  mantri = 'mantri',
  upaadhyaksha = 'upaadhyaksha',
  adhyakshaBooth = 'adhyakshaBooth',
  shaktikendraSanyojak = 'shaktikendraSanyojak',
  shaktikendraprabhari = 'shaktikendraprabhari',
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
  role: CustomRole;
}
