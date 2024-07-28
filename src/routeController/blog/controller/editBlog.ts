import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../../../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();

export const updatePost = async (req: Authenticate, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: id, authorId: req.userId },
      data: {
        title,
        content,
      },
    });

    responseSuccess(res, {
      data: updatedPost,
      status: 200,
      message: "Post updated successfully",
    });
  } catch (error) {
    errorResponse(res, error);
  }
};


