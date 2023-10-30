import { Response } from "express";
import { Authenticate } from "src/interfaces/requestInterface";
import { PrismaClient } from '@prisma/client';
import { CustomError } from "../../../utlis/throwError";
import { responseSuccess } from "../../..//utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";

const prisma = new PrismaClient();


export async function postGallery (req: Authenticate, res: Response)  {
    try {
    console.log(req.uploadedFileName)
      const data = await prisma.gallery.findMany({});
      if (data.length > 10) {
        throw new CustomError("Image exceed", 404, "BAD REQUETS");
      }
      const info = await prisma.gallery.create({
        data: {
          name: `https://shivam-practics-bucket.s3.ap-south-1.amazonaws.com/${req.uploadedFileName}`,
          author: {
            connect: { id: req.userId },
          },
        },
      });
      responseSuccess(res, {
        data: info,
        message: "upload done",
        status: 200,
      });
    } catch (err) {
    console.log(err)
      errorResponse(res, err);
    }
  }
