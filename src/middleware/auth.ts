import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/errorThrow';
import { responseError } from 'apps/akku/src/utils/responseError';
import { Response, Request, NextFunction } from 'express';

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
        'Unauthorized error',
        401
      );
    }
 
    const token = req.cookies.jwt;

    jwt.verify(token, 'BEARER', (err, decoded) => {
      if (err) {
        throw new CustomError(
          'Token verification failed',
          'Unauthorized error',
          401
        );
      }
      req.userId = decoded.find.id;
      console.log(decoded.find.id)
      next();
    });
  } catch (err) {
    return responseError(res, err);
  }
}
