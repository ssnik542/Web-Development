import { connectDB } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Event from "@/lib/database/models/event.model";
import USER from "@/lib/database/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: USER,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export async function GET(req: Request, res: NextApiResponse) {
  await connectDB();
  let data;
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  let limit: number = Number(searchParams.get("limit")) || 6;
  const page = searchParams.get("page");
  const category = searchParams.get("category");
  try {
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };
    const skipAmount = (Number(page) - 1) * limit;
    data = await Event.find(conditions)
      .populate("category")
      .populate({ path: "organizer", model: USER, select: "_id name" })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const eventsCount = await Event.countDocuments(conditions);
    const totalPages = Math.ceil(eventsCount / limit);

    return NextResponse.json({ data, totalPages }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, { status: 500 });
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  await connectDB();
  const response = await req.json();
  try {
    const result = await Event.create(response);
    return NextResponse.json(
      {
        result,
        success: "true",
      },
      { status: 200 }
    );
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
