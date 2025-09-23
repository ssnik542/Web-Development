import useForm from "@/hooks/useForm";
import Form from "@/styles/form";
import React from "react";

export default function CreateProduct() {
  const { inputs, handleChange, resetForm } = useForm({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(inputs);
      }}
    >
      <fieldset aria-busy>
        <label htmlFor="image">
          Image:
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={handleChange}
            value={inputs.name}
            required
          />
        </label>
        <label htmlFor="price">
          Price:
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            onChange={handleChange}
            value={inputs.price}
            required
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
            value={inputs.description}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
