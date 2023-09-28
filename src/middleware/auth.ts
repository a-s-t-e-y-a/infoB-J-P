import jwt from 'jsonwebtoken';

import { Response, Request, NextFunction } from 'express';
import  {CustomError}  from '../utlis/throwError';
import { errorResponse } from '../utlis/responseError';

interface Authenticate extends Request {
  userId: string;
}

export async function verifyToken(
  req: Authenticate,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.cookies.jwt == undefined) {
      throw new CustomError(
        'Please login first',
        401,
        'Unauthorized error'
       
      );
    }
 
    const token = req.cookies.jwt;

    jwt.verify(token, 'BEARER', (err, decoded) => {
      if (err) {
        throw new CustomError(
          'Token verification failed',
          401,
          'Unauthorized error'
       
        );
      }
  
      req.userId = decoded.user.id;

      next();
    });
  } catch (err) {
    console.log(err)
    return errorResponse(res, err);
  }
}
