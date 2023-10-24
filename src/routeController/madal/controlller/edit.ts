import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { MundalInput } from "src/interfaces/mundal";
import { responseSuccess } from "../../../utlis/responseSuccess";
import { errorResponse } from "../../../utlis/responseError";
import { CustomError } from "../../../utlis/throwError";

const prisma = new PrismaClient();

// Common function for role updates
async function updateRole(
  req: Request,
  res: Response,
  roleName: any,
  roleLimit: number
) {
  try {
    const getTotal = await prisma.karykarta.findMany({
      where: {
        role: roleName,
        mundalId: Number(req.body.mundalId),
      },
    });

    if (getTotal.length >= roleLimit) {
      throw new CustomError(
        `Cannot change role, ${roleName} limit exceeded`,
        500,
        "Bad request"
      );
    }

    const data = await prisma.karykarta.updateMany({
      where: {
        id: Number(req.params.id),
      },
      data: {
        role: roleName,
      },
    });

    responseSuccess(res, {
      message: "Data updated",
      data: data,
      status: 200,
    });
  } catch (error) {
    throw new CustomError(error.message, 500, "Error");
  }
}

// Edit a Mundal by ID
export async function editMundal(req: Request, res: Response) {
  try {
    const role: string = req.body.role;

    if (role === "karyakarta") {
      const data = await prisma.karykarta.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          role: "karyakarta",
        },
      });
      responseSuccess(res, {
        data: data,
        message: "Data update done",
        status: 200,
      });
    } else if (role === "adhyaksha") {
      const getTotal = await prisma.karykarta.findMany({
        where: {
          role: "adhyaksha",
          mundalId: Number(req.body.mundalId),
        },
      });

      if (getTotal.length === 1) {
        throw new CustomError(
          "Cannot change role, adhykhasha already exists",
          500,
          "Bad request"
        );
      } else {
        await updateRole(req, res, "adhyaksha", 1);
      }
    } else if (role === "koshadhyaksha") {
      await updateRole(req, res, "koshadhyaksha", 1);
    } else if (role === "mahamantri") {
      await updateRole(req, res, "mahamantri", 2);
    } else if (role === "mantri") {
      await updateRole(req, res, "mantri", 4);
    } else if (role === "upaadhyaksha") {
      await updateRole(req, res, "upaadhyaksha", 4);
    } else {
      throw new CustomError("Invalid role specified", 400, "InvalidRole");
    }
  } catch (error) {
    errorResponse(res, error);
  }
}

