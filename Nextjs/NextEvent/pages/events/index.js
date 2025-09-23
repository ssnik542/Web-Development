import { Fragment } from "react";
import { useRouter } from "next/router";
import head from "next/head";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/event-list";
import EventsSearch from "../../components/events-search";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <head>
        <title>{"All Event List"}</title>
      </head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
