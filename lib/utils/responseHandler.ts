import { Response } from "express";

export const successResponse = (
  res: Response,
  message: string,
  data: any = {},
  statusCode = 200
) => {
  return res
    .status(statusCode)
    .json({ success: true, statusCode, message, data });
};


export const errorResponse = (res:Response,message:string,statusCode=500)=>{
  return res.status(statusCode).json({success:false,statusCode,message})
}