import { Response } from "express"
interface ErrorInterface {
    status:number ,
    name : string,
    message: string
}

export async function errorResponse(res:Response,err:ErrorInterface) {
    return res.status(err.status).json({
        message: err.message,
        type : err.name
    })
}