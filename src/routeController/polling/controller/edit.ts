import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import { MundalInput } from 'src/interfaces/mundal';
import { responseSuccess } from 'src/utlis/responseSuccess';
import { errorResponse } from 'src/utlis/responseError';

const prisma = new PrismaClient();