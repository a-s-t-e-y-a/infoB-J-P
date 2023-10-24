import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const { email, phoneNumber, dob, password, name } = req.body as User;

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      throw new CustomError('User not found', 404, 'Not Found');
    }

    // If the email is being updated, check for duplicates
    if (email !== existingUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: {
          email: email,
          NOT: {
            id: userId,
          },
        },
      });

      if (emailExists) {
        throw new CustomError('Email already exists', 400, 'Bad Request');
      }
    }

    // Hash the new password if it has been provided
    let hashedPassword = existingUser.password;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcryptjs.hash(password, saltRounds);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
        phoneNumber: phoneNumber,
        dob: dob,
        name: name,
        password: hashedPassword,
      },
    });

    responseSuccess(res, {
      status: 200,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (err) {
    errorResponse(res, err);
  }
}

interface User {
  email: string;
  name: string;
  phoneNumber: string;
  dob: string;
  password: string;
}

