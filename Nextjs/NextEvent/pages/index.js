import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/event-list";
import head from "next/head";
export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <head>
        <title>{"Event List"}</title>
      </head>
      <EventList items={featuredEvents} />
    </div>
  );
}
