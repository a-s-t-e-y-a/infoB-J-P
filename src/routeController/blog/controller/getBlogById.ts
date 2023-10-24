import {  Response } from "express";
import { PrismaClient } from "@prisma/client"
import { errorResponse } from "../../../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";
import { CustomError } from "../../../utlis/throwError";

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
