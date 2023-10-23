import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../../../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();
export const deletePost = async (req: Authenticate, res: Response) => {
  const { id } = req.params;

  try {
    const data = await prisma.post.delete({
      where: { id: Number(id), authorId: req.userId },
    });

    responseSuccess(res, {
      data:data,
      status: 204,
      message: "Post deleted successfully",
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
