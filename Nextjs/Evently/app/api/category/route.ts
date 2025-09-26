import { connectDB } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  let data: [] | {} = [];
  try {
    await connectDB();
    data = await Category.find();
  } catch (error) {
    data = { success: false };
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    await connectDB();
    const response = await req.json();
    const newCategory = await Category.create({
      name: response.name,
    });
    return NextResponse.json(newCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { Error: "Not able to create new Catgeory" },
      { status: 500 }
    );
  }
}
