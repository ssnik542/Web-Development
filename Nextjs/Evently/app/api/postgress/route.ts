import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
// import { db } from "../../../lib/prisma";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request, res: NextApiRequest) {
  const db = new PrismaClient();
  try {
    const user = await db.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@gmail.com",
      },
    });

    return NextResponse.json({
      message: user,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}
