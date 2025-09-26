import Joi from "joi";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/database";
import USER from "@/lib/database/models/user.model";
import JwtService from "@/lib/services/JwtService";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import CustomErrorHandler from "@/lib/services/CustomErrorHandler";

export async function POST(req: Request, res: NextApiResponse) {
  await connectDB();
  const { email, password } = await req.json();

  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return NextResponse.json(error);
  }

  let access_token;
  try {
    const user = await USER.findOne({ email: email }).select(
      "-__v -createdAt -updatedAt"
    );
    if (!user) {
      return NextResponse.json(CustomErrorHandler.wrongCredential());
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(CustomErrorHandler.wrongCredential());
    }
    access_token = JwtService.sign({
      _id: user._id,
    });

    return NextResponse.json(user, {
      headers: { cookies: access_token },
    });
  } catch (error) {
    return NextResponse.json(
      {
        Error: "Internal ",
        success: "false",
      },
      { status: 500 }
    );
  }
}
