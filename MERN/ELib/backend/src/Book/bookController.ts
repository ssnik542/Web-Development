import { NextFunction, Request, Response } from "express";
import path from "path";
import { deleteOnCloudinary, uploadOnCloudinary } from "../config/cloudinary";
import { BOOK } from "./book.model";
import { AuthRequest } from "../middleware/authenticate";

export const uploadBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  // coverImages
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );
  const uploadCoverImage = await uploadOnCloudinary(
    filePath,
    "book-covers",
    coverImageMimeType,
    fileName
  );

  // pdfFile
  const bookFileName = files.file[0].filename;
  const bookFilePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName
  );
  const uploadFile = await uploadOnCloudinary(
    bookFilePath,
    "book-pdf",
    "pdf",
    bookFileName
  );

  const _req = req as AuthRequest;
  const book = await BOOK.create({
    title,
    genre,
    author: _req.userId,
    coverImage: uploadCoverImage?.url,
    file: uploadFile?.url,
  });
  return res.json({ book: book });
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, genre } = req.body;
  const bookId = req.params.id;

  const book = await BOOK.findById(bookId);
  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  let updatedCloudUrl = {
    coverImage: book.coverImage,
    file: book.file,
  };
  if (files.coverImage) {
    const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      fileName
    );
    const uploadCoverImage = await uploadOnCloudinary(
      filePath,
      "book-covers",
      coverImageMimeType,
      fileName
    );
    updatedCloudUrl.coverImage = uploadCoverImage?.url || "";
  }

  if (files.file) {
    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );
    const uploadFile = await uploadOnCloudinary(
      bookFilePath,
      "book-pdf",
      "pdf",
      bookFileName
    );

    updatedCloudUrl.file = uploadFile?.url || "";
  }

  const newBook = await BOOK.findOneAndUpdate(
    {
      _id: bookId,
    },
    {
      title: title,
      genre: genre,
      author: _req.userId,
      coverImage: updatedCloudUrl.coverImage,
      file: updatedCloudUrl.file,
    },
    { new: true }
  );

  return res.json(newBook);
};

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _req = req as AuthRequest;
  const userId = _req.userId;

  const books = await BOOK.find({ author: userId }).populate("author", {
    name: 1,
  });
  return res.json({ books: books });
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  const book = await BOOK.findById(bookId);
  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }
  return res.json({ book: book });
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  const _req = req as AuthRequest;
  const book = await BOOK.findById(bookId);
  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }
  if (book.author.toString() !== _req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const coverFileSplit = book.coverImage.split("/");
  const cloudCoverImgId =
    coverFileSplit.at(-2) + "/" + coverFileSplit.at(-1)?.split(".").at(-2);
  await deleteOnCloudinary(cloudCoverImgId);
  const FileSplit = book.file.split("/");
  const cloudfileId = FileSplit.at(-2) + "/" + FileSplit.at(-1);
  await deleteOnCloudinary(cloudfileId);
  if (book.author.toString() !== _req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  await BOOK.deleteOne({ _id: bookId });
  return res.status(204).json({ bookId });
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await BOOK.find({ hide: false }).populate("author", {
      name: 1,
    });
    if (!book) {
      return res.status(403).json({ message: "Book not found" });
    }
    return res.json({ books: book });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateBookFlag = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.id;

  const book = await BOOK.findById(bookId);
  if (!book) {
    return res.status(403).json({ message: "Book not found" });
  }
  const _req = req as AuthRequest;
  if (book.author.toString() !== _req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const Updatebook = await BOOK.findOneAndUpdate(
      {
        _id: bookId,
      },
      {
        hide: !book.hide,
      }
    );
    return res.status(202).json({ Message: "Successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
