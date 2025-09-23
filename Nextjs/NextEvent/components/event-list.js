import React from "react";
import EventItem from "./event-item";
import styles from "./event-list.module.css";
export default function EventList({ items }) {
  console.log(items);
  return (
    <ul className={styles.list}>
      {items?.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </ul>
  );
}
