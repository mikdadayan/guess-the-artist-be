import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "LNOACMOfYvwswDFlUDkJtznZVMie6TjM";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IUser;
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Not authorized" });
  }
};
