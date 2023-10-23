import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';
import { errorResponse } from '../../../utlis/responseError';

const prisma = new PrismaClient();

export async function creatUser(req: Request, res: Response) {
  try {
    const { email, phoneNumber, dob, password, name, village } =
      req.body as User;
    const email_ = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!email_) {
      const saltRounds = 10;

      bcryptjs.genSalt(saltRounds, async function (err, salt) {
        bcryptjs.hash(password, salt, async function (err, hash) {
          const data_ = await prisma.user.create({
            data: {
              email: email,
              phoneNumber: phoneNumber,
              dob: dob,
              name: name,
              password: hash,
            },
          });


          responseSuccess(res, {
            status: 200,
            message: 'Success',
            data: data_,
          });
        });
      });
    } else {
      throw new CustomError('Email already exist', 400, 'Bad Request');
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, err);
  }
}
interface User {
  email: string;
  name: string;
  phoneNumber: string;
  dob: string;
  village: string;
  password: string;
}
