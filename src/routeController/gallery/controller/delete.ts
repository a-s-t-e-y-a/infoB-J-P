import { Response } from "express";
import { Authenticate } from "src/interfaces/requestInterface";
import { PrismaClient } from '@prisma/client';
import { CustomError } from "../../../utlis/throwError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";

const prisma = new PrismaClient();

export async function deleteImage(req: Authenticate, res: Response) {
  try {
    const imageId = req.params.id;

    // Check if the image exists
    const image = await prisma.gallery.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new CustomError("Image not found", 404, "NOT FOUND");
    }

    // Perform the deletion
   const data =  await prisma.gallery.delete({
      where: { id: imageId },
    });

    responseSuccess(res, {
      message: "Image deleted successfully",
      status: 200,
      data:data
    });
  } catch (err) {
    errorResponse(res, err);
  }
}

