const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image:
      "https://images.pexels.com/photos/1687093/pexels-photo-1687093.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image:
      "https://images.pexels.com/photos/3872364/pexels-photo-3872364.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image:
      "https://images.pexels.com/photos/2416653/pexels-photo-2416653.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFeatured: true,
  },
  {
    id: "e4",
    title: "Extratrestrial life",
    description:
      "Extraterrestrial life, colloquially referred to as alien life, is life that may occur outside of Earth and which did not originate on Earth. No extraterrestrial life has yet been conclusively detected, although efforts are underway.",
    location: "NASA HEADq",
    date: "2022-06-10",
    image:
      "https://images.pexels.com/photos/7311920/pexels-photo-7311920.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFeatured: true,
  },
  {
    id: "e5",
    title: "Auto Expo",
    description:
      "A signature event, that witness the best minds coming together on a single platform to showcases all that is best in the automotive world",
    location:
      "Etps Rd, Farnborough GU14 6FD, United Kingdom",
    date: "2022-07-10",
    image:
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
    isFeatured: true,
  },
];

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((event) => event.isFeatured);
}

export function getAllEvents() {
  return DUMMY_EVENTS;
}

export function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id === id);
}
