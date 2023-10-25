import {  Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../.././../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { CustomError } from "../../../utlis/throwError";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();

export async function addRole(req: Authenticate, res: Response) {
  try {
    const prabhari: string = req.body.prabhari;
    const sanyojak: string = req.body.sanyojak;
    const sector: number = req.body.sector;

    if (prabhari === "" && sanyojak === "") {
      throw new CustomError(
        "Both prabhari and sanyojak cannot be empty",
        400,
        "Bad Request",
      );
    }

    const updatedData = await updateKarykarta(
      prabhari,
      "shaktikendraprabhari",
      sector,
    );
    if (updatedData) {
      responseSuccess(res, {
        message: "Data added successfully",
        data: updatedData,
        status: 200,
      });
      return;
    }

    const updatedSanyojakData = await updateKarykarta(
      sanyojak,
      "shaktikendraSanyojak",
      sector,
    );
    if (updatedSanyojakData) {
      responseSuccess(res, {
        message: "Data added successfully",
        data: updatedSanyojakData,
        status: 200,
      });
      return;
    }
  } catch (error) {
    errorResponse(res, error);
  }
}

async function updateKarykarta(id: string, role: any, sector: number) {
  if (id) {
    const data = await prisma.karykarta.update({
      where: {
        id: Number(id),
      },
      data: {
        role: role,
        sectorId: sector,
      },
    });
    return data;
  }
  return null;
}
