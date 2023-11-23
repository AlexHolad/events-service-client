// REACT HOOKS
import { useMemo } from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./Carousel.css"

// COMPONENTS
import EventCard from '../EventCard.component/EventCard'


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

export const EventCarousel = ({events, category}) => {

const sortedEvents = useMemo(() => {
const sortedEvents = [...events]
// Sort posts in inscending chronological order
sortedEvents.sort((a, b) => a.date.localeCompare(b.date));
return sortedEvents;
}, [events]);

const filteredEvents = useMemo(() => {
  let filteredEvents = [...sortedEvents]
  // Sort posts in inscending chronological order
  filteredEvents = filteredEvents.filter((event) => event.category === category);
  return filteredEvents;
  }, [sortedEvents]);
  


return (
<Carousel
  swipeable={true}
  draggable={false}
  showDots={true}
  responsive={responsive}
  className='carousel__container'
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
{filteredEvents.map(event => <EventCard key={event._id} event={event}/>)}
</Carousel>

)}