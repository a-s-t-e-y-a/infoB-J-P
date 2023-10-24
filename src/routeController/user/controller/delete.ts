import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { errorResponse } from '../../../utlis/responseError';
import { Authenticate } from 'src/interfaces/requestInterface';
import { responseSuccess } from '../../../utlis/responseSuccess';
import { CustomError } from '../../../utlis/throwError';

const prisma = new PrismaClient();

export async function deleteUser(req: Authenticate, res: Response) {
  try {
    const id = parseInt(req.params.id);

    // Use prisma.user.findUnique to find the user
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new CustomError('Data does not exist', 404, 'Not Found');
    }

    // Use await, not awaist to delete the user
    const data_delete = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    responseSuccess(res, {
      data: data_delete, // Use data_delete instead of data
      message: 'Data deleted successfully', // Corrected spelling
      status: 200,
    });
  } catch (error) {
    errorResponse(res, error);
  }
}

