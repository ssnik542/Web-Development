import mongoose from "mongoose";

let cached = (global as any).mongoose || { conn: null, promise: null };
const MONGODB_URI = process.env.MONGODB_URI;
export const connectDB = async () => {
  if (cached.conn) return cached.conn;
  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(`${MONGODB_URI}/Evently`, {
        bufferCommands: false,
      });
    cached.conn = await cached.promise;
  } catch (error) {
    console.log("Error while Connect to DB", error);
  }
};
