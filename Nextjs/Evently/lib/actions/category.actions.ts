import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    };

    const newCategory = await fetch(
      "http://localhost:3000/api/category",
      requestOptions
    );
    return await newCategory.json();
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await fetch("http://localhost:3000/api/category");
    const cat = await categories.json();
    return cat;
  } catch (error) {
    handleError(error);
  }
};
