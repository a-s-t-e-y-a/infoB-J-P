import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../.././../utlis/responseError';
import { SectorInput } from 'src/interfaces/sector';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';
import karykarta from 'src/routeController/karyakarta/route';
import { Authenticate } from 'src/interfaces/requestInterface';

const prisma = new PrismaClient();
// Create a Sector
export async function createSector(req:Authenticate, res: Response) {
  try {
    const { name, mundalId, sanyojakId, prabhariID } = req.body as SectorInput;
    const sectorFind = await prisma.sector.findMany({
      where: {
        name: name,
      },
    });
    if (sectorFind.length > 0) {
      throw new CustomError(
        'Sector with this name already exist or alreday connected with mandal',
        404,
        'Bad request'
      );
    }
    const karykartaIds: number[] = [];

    if (sanyojakId !== undefined) {
      karykartaIds.push(Number(sanyojakId));
    }

    if (prabhariID !== undefined) {
      karykartaIds.push(Number(prabhariID));
    }
    if(sanyojakId== prabhariID){
      throw new  CustomError('Sanyojak and prabhari cant be same',404,'Bad request')
    }
    console.log(karykartaIds)
    const karykartas = await prisma.karykarta.findMany({
      where: {
        id: {
          in: karykartaIds,
        },
      },
    });
    console.log(karykartas);
    if (karykartas.every((karykarta) => karykarta.role === 'karyakarta')) {
      if (karykartas.every((karykarta) => karykarta.mundalId == mundalId))  {
        let sector;
        if (sanyojakId !== undefined && prabhariID !== undefined) {
          sector = await prisma.sector.create({
            data: {
              name,
              author:{connect:{id:req.userId}},
              mundal: {
                connect: { id: Number(mundalId) },
              },
              karykarta: {
                connect: [
                  { id: Number(sanyojakId) },
                  { id: Number(prabhariID) },
                ],
              },
            },
          });
        } else if (sanyojakId) {
          sector = await prisma.sector.create({
            data: {
              name,
              mundal: {
                connect: { id: Number(mundalId) },
              },
              karykarta: {
                connect: { id: Number(sanyojakId) },
              },
              author:{connect:{id:req.userId}}
            },
          });
        } else if (prabhariID) {
          sector = await prisma.sector.create({
            data: {
              name,
              mundal: {
                connect: { id: Number(mundalId) },
              },
              karykarta: {
                connect: { id: Number(prabhariID) },
              },
              author:{connect:{id:req.userId}}
            },
          });
        }

        if (sanyojakId) {
          await prisma.karykarta.update({
            where: {
              id: Number(sanyojakId),
            },
            data: {
              role: 'shaktikendraSanyojak',
            },
          });
        }
        if (prabhariID) {
          await prisma.karykarta.update({
            where: {
              id: Number(prabhariID),
            },
            data: {
              role: 'shaktikendraprabhari',
            },
          });
        }

        const sectorAgain = await prisma.sector.findUnique({
          where: {
            id: Number(sector.id),
          },
          include: {
            karykarta: true,
            mundal: true,
          },
        });
        responseSuccess(res, {
          status: 201,
          message: 'Sector created successfully',
          data: sectorAgain,
        });
      } else {
        throw new CustomError(
          'Sector and karykarta should belong to same mandal',
          404,
          'Bad request'
        );
      }
    } else {
      throw new CustomError(
        'This karykarta also assigned a role',
        404,
        'Bad Request'
      );
    }
    console.log(karykartas[0]);
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
