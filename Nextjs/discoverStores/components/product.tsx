import ItemStyles from "@/styles/ItemStyles";
import PriceTag from "@/styles/PriceTag";
import Title from "@/styles/Title";
import Link from "next/link";

export default function Product({ product }: any) {
  const Delete = (slug: string) => {
    fetch(`https://api.storerestapi.com/products/${slug}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <ItemStyles>
      <img
        src={
          product?.img
            ? product?.img
            : `https://picsum.photos/id/${Math.floor(
                Math.random() * 500
              )}/200/300`
        }
        alt={product.title}
      />
      <Title>
        <Link href={`/product/${product.slug}`}>{product.title}</Link>
      </Title>
      <PriceTag>{product.price}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: "/update",
            query: {
              id: product._id,
            },
          }}
        >
          Edit ✏️
        </Link>
        <button type="button">Add To Cart 🛒</button>
        <button
          type="button"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (confirm("Are you sure you want to delete this item?")) {
              Delete(product.slug);
            }
          }}
        >
          Delete
        </button>
      </div>
    </ItemStyles>
  );
}
