import mongoose from "mongoose";
import { Book } from "./bookTypes";

const bookSchema = new mongoose.Schema<Book>(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    coverImage: { type: String, required: true },
    file: { type: String, required: true },
    genre: { type: String, required: true },
    hide: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const BOOK = mongoose.model<Book>("Book", bookSchema);
