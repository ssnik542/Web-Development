import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "../config/config";

export interface AuthRequest extends Request {
  userId: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Auth token is required" });
  }
  const parseToken = token.split(" ")[1];
  // Verify the token is valid
  try {
    const decoded = verify(parseToken, config.jwtSecret as string);
    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
};
export default authenticate;
