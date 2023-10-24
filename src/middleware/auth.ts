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
    let token: string | undefined;

    if (req.cookies.jwt !== undefined) {
      // If the token is in cookies, use it
      token = req.cookies.jwt;
    } else if (req.headers.authorization) {
      // If the token is in the 'Authorization' header (e.g., "Bearer <token>")
      const authHeader = req.headers.authorization;
      token = authHeader
    }

    if (!token) {
      throw new CustomError('Token not found', 401, 'Unauthorized error');
    }

    jwt.verify(token, 'BEARER', (err, decoded) => {
      if (err) {
        throw new CustomError('Token verification failed', 401, 'Unauthorized error');
      }
      console.log(decoded)
      req.userId = decoded.user.id;

      next();
    });
  } catch (err) {
    console.log(err);
    return errorResponse(res, err);
  }
}
