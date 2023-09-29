import { Request, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { errorResponse } from '../../../utlis/responseError';
import { CustomError } from '../../../utlis/throwError';
import { Workbook } from 'excel4node';
const prisma = new PrismaClient();

export async function getKarykarta(req: Request, res: Response) {
  try {
    const { mundalId, role, previousParty, download, gender, religion } =
      req.query;
    if (role) {
      if (role && !Object.values(Role).includes(role as Role)) {
        throw new CustomError('Enter a valid role number', 400, 'Bad request');
      }
    }

    const karykartas = await prisma.karykarta.findMany({
      where: {
        mundalId: mundalId ? parseInt(mundalId.toString()) : undefined,
        role: role ? (role as Role) : undefined,
        previousParty: previousParty ? previousParty.toString() : undefined,
        gender: gender ? gender.toString() : undefined,
        religion: religion ? religion.toString() : undefined,
      },
      include: {
        mundal: true,
        sector: true,
        poolingBooth: true,
      },
    });
    console.log(karykartas);
    if (Boolean(download) == true) {
      const wb = new Workbook();
      const ws = wb.addWorksheet('Sheet 1');
      const style = wb.createStyle({
        font: {
          color: '#000000',
          size: 12,
          bold: true,
        },
        alignment: { horizontal: 'center', vertical: 'center' },
      });
      const style2 = wb.createStyle({
        font: {
          color: '#000000',
          size: 12,
        },
        alignment: { horizontal: 'center', vertical: 'center' },
      });
      ws.cell(1, 1).string('Id').style(style);
      ws.cell(1, 2).string('Name').style(style);
      ws.cell(1, 3).string('Address').style(style);
      ws.cell(1, 4).string('Mobile Number').style(style);
      ws.cell(1, 5).string('Date of birth').style(style);
      ws.cell(1, 6).string('Religion').style(style);
      ws.cell(1, 7).string('Gender').style(style);
      ws.cell(1, 8).string('Previous Party').style(style);
      ws.cell(1, 9).string('Mundal Id').style(style);
      ws.cell(1, 10).string('Role').style(style);
      ws.cell(1, 11).string('Mundal Name').style(style);
      let count = 2;
      karykartas.map((info) => {
        ws.cell(count, 1).number(info.id).style(style2);
        ws.cell(count, 2).string(info.name).style(style2);
        ws.cell(count, 3).string(info.address).style(style2);
        ws.cell(count, 4).string(info.mobileNumber).style(style2);
        ws.cell(count, 5).string(info.dob).style(style2);
        ws.cell(count, 6).string(info.religion).style(style2);
        ws.cell(count, 7).string(info.gender).style(style2);
        ws.cell(count, 8).string(info.previousParty).style(style2);
        ws.cell(count, 9).number(info.mundal.id).style(style2);
        ws.cell(count, 10).string(info.role).style(style2);
        ws.cell(count, 11).string(info.mundal.name).style(style2);
        count++;
      });
      wb.write('report.xlsx', res);
    } else {
      responseSuccess(res, {
        status: 200,
        message: 'Karykartas retrieved successfully',
        data: karykartas,
      });
    }
  } catch (err) {
    console.error(err);
    errorResponse(res, err);
  }
}
export async function getPreviousParty(req: Request, res: Response) {
  try {
    const data = await prisma.karykarta.groupBy({
      by: ['previousParty'],
    });
    responseSuccess(res, {
      status: 200,
      message: 'Karykartas retrieved successfully',
      data: data,
    });
  } catch (err) {
    errorResponse(res, err);
  }
}
