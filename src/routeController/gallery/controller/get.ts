import { Response } from "express";
import { Authenticate } from "src/interfaces/requestInterface";
import { PrismaClient } from '@prisma/client';
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";

const prisma = new PrismaClient();


export async function getGallery(req: Authenticate, res: Response) {
  try {
    const data = await prisma.gallery.findMany();
    responseSuccess(res, {
      data,
      message: "Gallery images retrieved successfully",
      status: 200,
    });
  } catch (err) {
    errorResponse(res, err);
  }
}

