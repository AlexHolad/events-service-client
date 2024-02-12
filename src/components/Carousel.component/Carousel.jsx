// REACT HOOKS
import { useMemo } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css";

// COMPONENTS
import EventCard from "../EventCard.component/EventCard";
import SkeletonCard from "../SkeletonCard.component/SkeletonCard";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export const EventCarousel = ({ events, category }) => {
  const skeletonArr = Array.from(Array(6));
  const sortedEvents = useMemo(() => {
    const sortedEvents = [...events];
    // Sort posts in inscending chronological order
    sortedEvents.sort((a, b) => {
      if (!a.dates[0]) {
        return 1;
      }
      if (!b.dates[0]) {
        return -1;
      }
      return a.dates[0].localeCompare(b.dates[0]);
    });
    return sortedEvents;
  }, [events]);

  const filteredEvents = useMemo(() => {
    let filteredEvents = [...sortedEvents];
    // Sort posts in inscending chronological order
    const finalList = filteredEvents.filter(
      (event) => event.category === category
    );
    return finalList;
  }, [sortedEvents]);

  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      className="carousel__container"
      infinite={false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      slidesToSlide={5}
    >
      {!events.length &&
        skeletonArr.map((card, index) => <SkeletonCard key={index} index={index}/>)}
      {filteredEvents &&
        filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
    </Carousel>
  );
};
