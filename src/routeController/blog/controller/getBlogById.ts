import {  Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "src/utlis/responseError";
import { responseSuccess } from "src/utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";
import { CustomError } from "src/utlis/throwError";

const prisma = new PrismaClient();

export const getPostById = async (req: Authenticate, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id), authorId: req.userId }
    });

    if (post) {
      responseSuccess(res, {
        data: post,
        status: 200,
        message: "Post found",
      });
    } else {
     throw new  CustomError('Post not found', 404 , 'Bad request')
    }
  } catch (error) {
    errorResponse(res, error);
  }
};
