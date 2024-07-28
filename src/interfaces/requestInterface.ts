import { Request } from 'express';
export interface Authenticate extends Request {
    userId: string;
    sessionId: string
    uploadedFileName:string
  }
