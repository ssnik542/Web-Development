import express from "express";
import {
  deleteBook,
  getAllBooks,
  getBookById,
  getBooks,
  updateBook,
  updateBookFlag,
  uploadBook,
} from "./bookController";
import multer from "multer";
import path from "path";
import authenticate from "../middleware/authenticate";
const bookRouter = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  // upto 10mb limit
  limits: { fileSize: 3e7 },
});

bookRouter.post(
  "/upload",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  uploadBook
);

bookRouter.patch(
  "/upload/:id",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/getAll", getAllBooks);
bookRouter.get("/", authenticate, getBooks);
bookRouter.get("/:bookId", getBookById);
bookRouter.delete("/:bookId", authenticate, deleteBook);
bookRouter.patch("/hide/:id", authenticate, updateBookFlag);

export default bookRouter;
