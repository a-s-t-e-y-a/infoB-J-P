import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';
import { CountRole } from '../services/upaadhyakashaCount';
import { Create } from '../services/prismaCreate';
import { KarykartaInput } from 'src/interfaces/karykarta';
import { Authenticate } from 'src/interfaces/requestInterface';

const prisma = new PrismaClient();

export async function createKarykarta(req: Authenticate, res: Response) {
  let id = req.userId
  console.log(req.userId)
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
    } = req.body as KarykartaInput;
    if(mobileNumber.length!=10){
      throw new CustomError('Mobile no is incorrect', 500,'BAD REQUEST')
    }
    if (role) {
      const karyakartaRoleFind = await prisma.mundal.findUnique({
        where: {
          id: mundalId,
        },
        include: {
          karyakarta: true,
        },
      });
      if (role == 'adhyaksha') {
        if ((await CountRole(role, karyakartaRoleFind)) == true) {
          throw new CustomError(
            'adhyaksha in this mandal already exist',
            400,
            'Bad request'
          );
        } else {
          const karykarta = await Create(
            name,
            id, 
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundalId,
            role
          );

          responseSuccess(res, {
            status: 200,
            message: 'Karykarta created successfully',
            data: karykarta,
          });
        }
      } else if (role == 'koshadhyaksha') {
        if ((await CountRole(role, karyakartaRoleFind)) == true) {
          throw new CustomError(
            'koshadhyaksha in this mandal already exist',
            400,
            'Bad request'
          );
        } else {
          const karykarta = await Create(
            name,
            id,
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundalId,
            role,
            
          );

          responseSuccess(res, {
            status: 200,
            message: 'Karykarta created successfully',
            data: karykarta,
          });
        }
      } else if (role == 'upaadhyaksha') {
        if ((await CountRole(role, karyakartaRoleFind)) == true) {
          throw new CustomError(
            'upaadhyaksha in this mandal already exist',
            400,
            'Bad request'
          );
        } else {
          const karykarta = await Create(
            name,
            id,
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundalId,
            role,
          );

          responseSuccess(res, {
            status: 200,
            message: 'Karykarta created successfully',
            data: karykarta,
          });
        }
      } else if (role == 'mahamantri') {
        if ((await CountRole(role, karyakartaRoleFind)) == true) {
          throw new CustomError(
            'mahamantri in this mandal already exist',
            400,
            'Bad request'
          );
        } else {
          const karykarta = await Create(
            name,
            id,
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundalId,
            role,
          );

          responseSuccess(res, {
            status: 200,
            message: 'Karykarta created successfully',
            data: karykarta,
          });
        }
      } else if (role == 'mantri') {
        if ((await CountRole(role, karyakartaRoleFind)) == true) {
          throw new CustomError(
            'mantri in this mandal already exist',
            400,
            'Bad request'
          );
        } else {
          const karykarta = await Create(
            name,
            id,
            address,
            mobileNumber,
            dob,
            religion,
            gender,
            previousParty,
            mundalId,
            role,
          );

          responseSuccess(res, {
            status: 200,
            message: 'Karykarta created successfully',
            data: karykarta,
          });
        }
      } else if(role == 'karyakarta'){
        const karykarta = await Create(
          name,
          id,
          address,
          mobileNumber,
          dob,
          religion,
          gender,
          previousParty,
          mundalId,
          role,
        );

        responseSuccess(res, {
          status: 200,
          message: 'Karykarta created successfully',
          data: karykarta,
        });
      }
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
