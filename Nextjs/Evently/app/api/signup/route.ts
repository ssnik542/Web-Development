import Joi from "joi";
import bcrypt from "bcrypt";
import { connectDB } from "@/lib/database";
import USER from "@/lib/database/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import CustomErrorHandler from "@/lib/services/CustomErrorHandler";
import JwtService from "@/lib/services/JwtService";
import { cookies } from "next/headers";
export async function POST(req: Request, res: NextApiResponse) {
  const { name, email, password } = await req.json();

  // validation
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    repeat_password: Joi.ref("password"),
  });
  const { error } = registerSchema.validate({ name, email, password });

  if (error) {
    return NextResponse.json(error);
  }

  // check if user is in the database already
  try {
    const exist = await USER.exists({ email });
    if (exist) {
      return NextResponse.json(
        CustomErrorHandler.alreadyUserExist("This Email is already Registered")
      );
    }
  } catch (error) {
    console.log("ERROR IN CHECKING IF THE EMAIL EXISTS : ", error);
    return NextResponse.json(error);
  }

  //Hash Password
  const hashedPsd = await bcrypt.hash(password, 10);
  let access_token;
  try {
    await connectDB();
    const user = await USER.create({
      name,
      email,
      password: hashedPsd,
    });

    access_token = JwtService.sign({
      _id: user._id,
    });
    // const x = cookies().set("access_token", access_token, {
    //   maxAge: 60 * 60 * 24, // one day in seconds
    //   httpOnly: true, // prevent client-side access
    //   sameSite: "strict", // prevent cross-site requests
    // });
    return NextResponse.json(user, {
      headers: { "user-Cookie": access_token },
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
