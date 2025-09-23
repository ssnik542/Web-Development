import React from "react";
import { getEventById } from "../../dummy-data";
import { useRouter } from "next/router";
import EventSummary from "../../event-detail/event-summary";
import EventLogistics from "../../event-detail/event-logistics";
import EventContent from "../../event-detail/event-content";
import head from "next/head";
import ErrorAlert from "../../components/ui/error-alert";
export default function SingleEventPageDetails() {
  const router = useRouter();
  const id = router.query.eventId;
  const event = getEventById(id);
  if (!event) {
    return (
      <ErrorAlert>
        {" "}
        <p>No Event found</p>
      </ErrorAlert>
    );
  }
  return (
    <>
      <head>
        <title>{event.title}</title>
      </head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}
