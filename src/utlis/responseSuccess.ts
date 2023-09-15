import { Response } from "express"
interface SuccessInterface {
    data :Record<string , any>
    status : number,
    message: string
}

export async function responseSuccess(res:Response ,sucess:SuccessInterface) {
    return res.status(sucess.status).json({
        message: sucess.message,
        data:sucess.data
    })
}