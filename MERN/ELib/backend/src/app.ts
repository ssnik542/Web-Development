import express from "express";
import cors from "cors";
import ErrorHandler from "./middleware/ErrorHandler";
import userRouter from "./User/userRouter";
import bookRouter from "./Book/bookRouter";
import { config } from "./config/config";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(ErrorHandler);
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

export default app;
