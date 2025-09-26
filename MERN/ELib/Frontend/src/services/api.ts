import axios from "axios";
import useTokenStore from "../store";

const api = axios.create({
  baseURL: "http://localhost:8800",
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data: { email: string; password: string }) => {
  return api.post("/users/login", data);
};

api.interceptors.request.use((config) => {
  // @ts-expect-error noErr
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getBookOfUser = async () =>
  api.get("http://localhost:8800/api/books");

export const getBooks = async () =>
  api.get("http://localhost:8800/api/books/getAll");

export const getBookById = async (id: string | undefined) =>
  api.get(`http://localhost:8800/api/books/${id}`);

export const createBook = async ({
  data,
  id,
}: {
  data: FormData;
  id?: string;
}) => {
  const url = id
    ? `http://localhost:8800/api/books/upload/${id}`
    : "http://localhost:8800/api/books/upload";
  return id
    ? api.patch(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    : api.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
};

export const deleteBook = async (id: string) => {
  return api.delete(`http://localhost:8800/api/books/${id}`);
};

export const hideShowBook = async (id: string) => {
  return api.patch(`http://localhost:8800/api/books/hide/${id}`);
};
