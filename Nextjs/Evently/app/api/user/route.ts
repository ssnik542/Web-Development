import { connectDB } from "@/lib/database";
import Category from "@/lib/database/models/category.model";
import Event from "@/lib/database/models/event.model";
import USER from "@/lib/database/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: USER,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

export async function GET(req: Request, res: any) {
  const { searchParams } = new URL(req.url);
  const page: number = Number(searchParams.get("page"));
  const userId = searchParams.get("userId");
  let limit: number = Number(searchParams.get("limit")) || 6;
  try {
    await connectDB();
    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);
    const totalPages = Math.ceil(eventsCount / limit);
    return NextResponse.json({ events, totalPages }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
