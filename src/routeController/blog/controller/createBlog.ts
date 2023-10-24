import {  Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "src/utlis/responseError";
import { responseSuccess } from "src/utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();

export const createPost = async (req: Authenticate, res: Response) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author:{connect:{id:req.userId}},
        published:true
      },
    });

    responseSuccess(res, {
      data: post,
      status: 201,
      message: "Post created successfully",
    });
  } catch (error) {
    errorResponse(res, error);
  }
};
