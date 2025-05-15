import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const verifyJWT: any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied. No Token Provided" });

  try {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret)
      throw new Error("JWT_SECRET_KEY is not defined in environment");
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret);
    // req.user = decoded;
    (req as any).user = decoded;

    console.log("The decoded user is", (req as any).user);
    // console.log("The decoded user is", req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default verifyJWT;

