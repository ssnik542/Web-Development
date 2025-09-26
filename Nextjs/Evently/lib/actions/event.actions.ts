import {
  CreateEventParams,
  DeleteEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { connectDB } from "../database";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import USER from "../database/models/user.model";

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: USER,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Category, select: "_id name" });
};

// create
export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    const newEvent = await fetch("http://localhost:3000/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        organizer: userId,
        category: event.categoryId,
      }),
    });
    const data = await newEvent.json();
    return data.result;
  } catch (error) {
    handleError(error);
  }
}

// delete
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
  try {
    // TODO: Implement proper error handling for status codes other than 2xx
    const response = await fetch(
      `http://localhost:3000/api/events/${eventId}`,
      {
        method: "DELETE",
      }
    );
    const evenet = await await response.json();
    if (evenet.deletedEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    const Event = await fetch(`http://localhost:3000/api/events/${eventId}`, {
      cache: "no-store",
    });
    const x = await Event.json();
    return x.newUser;
  } catch (error) {
    handleError(error);
  }
}

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) {
  try {
    const events = await fetch(
      `http://localhost:3000/api/events?category=${category}&query=${query}&limit=${limit}&page=${page}`,
      { cache: "no-store" }
    );
    return await events.json();
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) {
  try {
    await connectDB();
    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);
    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    const Event = await fetch(`http://localhost:3000/api/events/${event._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, ...event }),
    });
    return await Event.json();
  } catch (error) {
    handleError(error);
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    const events = await fetch(
      `http://localhost:3000/api/user?userId=${userId}&limit=${limit}&page=${page}`,
      { cache: "no-store" }
    );
    return await events.json();
  } catch (error) {
    handleError(error);
  }
}
