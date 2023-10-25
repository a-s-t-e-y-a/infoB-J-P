import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "../../../utlis/responseError";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { Authenticate } from "src/interfaces/requestInterface";

const prisma = new PrismaClient();

export const createPost = async (req: Authenticate, res: Response) => {
  console.log(req.body.title)
  const title = req.body.title;
  const content = req.body.content
  console.log(req.uploadedFileName)
  try {
    const post = await prisma.post.create({
      data: {
        title:title,
        content: content,
        author: { connect: { id: req.userId } },
        published: true,
        image:`https://shivam-practics-bucket.s3.ap-south-1.amazonaws.com/${req.uploadedFileName}`,
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
