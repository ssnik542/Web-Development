import NavStyles from "@/styles/NavStyle";
import Link from "next/link";
import React from "react";

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/product">products</Link>
      <Link href="/sell">sell</Link>
      <Link href="/order">orders</Link>
      <Link href="/account">account</Link>
    </NavStyles>
  );
}
