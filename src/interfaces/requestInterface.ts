import { Request } from 'express';
export interface Authenticate extends Request {
    userId: number;
    sessionId: string
  }
