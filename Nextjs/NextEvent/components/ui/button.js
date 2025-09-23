import React from "react";
import styles from "./button.module.css";
import Link from "next/link";
export default function Button(props) {
  if (!props.link) {
    return (
      <button className={styles.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
  return (
    <Link href={props.link}>
      <span className={styles.btn}>{props.children}</span>
    </Link>
  );
}
