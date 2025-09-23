import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

type expType = {
  id?: string | string[];
};

const Divstyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShowImg = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
  border: 3px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: all ease-in;
  &:hover {
    background: #f1f1;
    transform: scale(1.01);
  }
`;

const Pstyle = styled.p`
  font-size: 28px;
  font-weight: 600;
  margin: 0 !important;
`;

const ButtonSt = styled.button`
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  background-color: #8585cf;
  font-size: 28px;
  box-shadow: 5px 5px 5px #d48282;
  border: 1px solid black;
  border-radius: 10px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    box-shadow: -5px -5px 5px #d48282;
  }
`;
export default function ProductExp({ id }: expType) {
  const [prod, setProd] = useState({
    title: "",
    price: "",
    createdBy: {
      role: "",
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.storerestapi.com/products/${id}`
      );
      const data = await response.json();
      console.log(data);
      setProd(data.data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Divstyle>
      <ShowImg>
        <div>
          <img
            src={`https://picsum.photos/id/${Math.floor(
              Math.random() * 500
            )}/500/300`}
            alt={prod?.title}
          />
        </div>
        <div>
          <Pstyle>Title : {prod.title}</Pstyle>
          <Pstyle>Price : $ {prod.price}</Pstyle>
        </div>
      </ShowImg>
      <ShowImg>
        <Pstyle>Created By : {prod.createdBy.name}</Pstyle>
        <Pstyle>Role : {prod.createdBy.role}</Pstyle>
        <ButtonSt>Edit</ButtonSt>
      </ShowImg>
    </Divstyle>
  );
}
