import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { USER } from "./user.model";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import createHttpError from "http-errors";
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(createError(400, "Missing field"));
  }

  try {
    const user = await USER.findOne({ email });
    if (user) {
      const error = createError(400, "User already exist this email");
      return res.status(400).json({
        message: "Email is already in use",
      });
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  let userNew;
  try {
    userNew = await USER.create({ name, email, password: hashPassword });
  } catch (error) {
    return next(createHttpError(500, "Error while creating user"));
  }
  const token = sign(
    {
      sub: userNew?._id,
    },
    config.jwtSecret as string,
    {
      expiresIn: "7d",
    }
  );
  return res.json({ accessToken: token });
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(400, "Missing field"));
  }

  try {
    const user = await USER.findOne({ email });
    if (!user) {
      const error = createError(400, "User does not exist with this email");
      return res.status(400).json({
        message: "User does not exist",
      });
    } else {
      const isValidPass = await bcrypt.compare(password, user.password);
      if (isValidPass) {
        const token = sign(
          {
            sub: user?._id,
          },
          config.jwtSecret as string,
          {
            expiresIn: "7d",
          }
        );
        return res.json({ accessToken: token });
      } else {
        return res.status(400).json({
          message: "Inavlid password",
        });
      }
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }
};
