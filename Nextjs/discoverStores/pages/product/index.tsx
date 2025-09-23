"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Product from "@/components/product";

const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;
export default function product() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{ _id: "" }]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://api.storerestapi.com/products",
    })
      .then(({ data }) => {
        console.log(data);
        setData(data.data);
      })
      .catch((err) => console.dir(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <ProductsListStyles>
        {data &&
          data.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </ProductsListStyles>
    </div>
  );
}
