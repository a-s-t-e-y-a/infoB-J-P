import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';
import { errorResponse } from '../../../utlis/responseError';
import jwt from 'jsonwebtoken'
import { setCookie } from 'nookies';
const prisma = new PrismaClient();

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body as User;
    
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    
    if (!user) {
      throw new CustomError('User not found', 404, 'Not Found');
    }
    
    const passwordMatch = await bcryptjs.compare(password, user.hash);
    
    if (passwordMatch) {
      // Passwords match, user is authenticated.
      
      const signedInfo = jwt.sign({ user }, 'BEARER');
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      res.cookie('jwt', signedInfo, {
        httpOnly: true,
        maxAge: 3600000, 
        domain:'13.127.246.15'
      });
      responseSuccess(res, {
        status: 200,
        message: 'Login successful',
        data: user,
        
      });
    } else {
      // Passwords do not match, return an error.
      throw new CustomError('Incorrect password', 401, 'Unauthorized');
    }
  } catch (err) {
    console.log(err);
    errorResponse(res, err);
  }
}

interface User {
  email: string;
  password: string;
}
