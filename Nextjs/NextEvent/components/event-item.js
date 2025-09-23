import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./event-item.module.css";
import Button from "./ui/button";
import DateIcon from "../components/icons/date-icon";
import AddressIcon from "../components/icons/address-icon";
import ArrowIcon from "../components/icons/arrow-right-icon";
export default function EventItem(props) {
  const { title, image, date, location, id } = props;
  const ReadableDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const expLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <Image src={image} alt={title} width={500} height={300} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
        </div>
        <div className={styles.date}>
          <DateIcon />
          <time>{ReadableDate}</time>
        </div>
        <div className={styles.address}>
          <AddressIcon />
          <address>{location.replace(",", "\n")}</address>
        </div>
        <div className={styles.actions}>
          <Button link={expLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}
