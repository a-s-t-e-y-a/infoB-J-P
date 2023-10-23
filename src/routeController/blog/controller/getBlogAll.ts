import {  Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "src/utlis/responseError";
import { responseSuccess } from "src/utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();

export const getAllPosts = async (req: Authenticate, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: req.userId
      }
    });

    responseSuccess(res, {
      data: posts,
      status: 200,
      message: "Data fetched successfully",
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
