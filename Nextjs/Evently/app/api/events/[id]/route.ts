import { connectDB } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import USER from "@/lib/database/models/user.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import CustomErrorHandler from "@/lib/services/CustomErrorHandler";

export async function DELETE(req: Request, res: any) {
  await connectDB();
  const id = res.params.id;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    return NextResponse.json(
      {
        deletedEvent,
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

export async function GET(req: Request, res: any) {
  await connectDB();
  const id = res.params.id;
  try {
    const event = await Event.findById(id).populate("category");
    const user = await USER.findById(event.organizer).select(
      "-__v -password -createdAt -updatedAt"
    );
    const newUser = { ...event._doc, organizer: user };
    return NextResponse.json(
      {
        newUser,
        success: "true",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        Error: error,
        success: "false",
      },
      { status: 500 }
    );
  }
}

// @desc     Update an event
export async function PUT(req: Request, res: any) {
  const event = await req.json();
  try {
    await connectDB();
    const id = res.params.id;

    // const eventToUpdate = await Event.findById(id);
    // if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
    //   return NextResponse.json(CustomErrorHandler.unAuthorized());
    // }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { ...event },
      { new: true }
    );

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(CustomErrorHandler.notFound());
  }
}
