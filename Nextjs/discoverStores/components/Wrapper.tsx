import React from "react";
import { Header } from "./Header";
import Head from "next/head";
import { createGlobalStyle, styled } from "styled-components";

const GlobalStyles = createGlobalStyle`

    *,*:before,*:after{
        box-sizing: inherit;
    }
    body{
        padding: 0;
        margin:0;
        font-size:1.5rem;
        line-height: 2;
    }
    :root{
        --red:#ff0000;
        --black:#393939;
        --grey:#3a3a3a;
        --lightGray:#e1e1e1;
        --offWhite:#ededed;
        --maxWidth:1000px;
        -bs: 0 12px 24px 0 rgba(0,0,0,0.09);
    }
    a{
        text-decoration: none;
        color:var(--black);
    }

`;
const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`;

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Alibancous Shopcisps</title>
      </Head>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </>
  );
}
