// REACT HOOKS
import { useEffect } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";

// DATA FROM STORE
import {useEvents, useEventActions} from "../../app/store"

// COMPONENTS
import {EventCarousel} from "../../components/Carousel.component/Carousel";

// CSS
import "./HomePage.css";


export default function HomePage() {
  const categories = [
    "гастроли",
    "местные представления",
    "вечера",
    "настольные игры",
  ];

  const {getEvents} = useEventActions()

  useEffect(() => {
    getEvents()
   },[getEvents]);
 
  const events = useEvents()

  return (
    <div className="homepage__container gen__container">
      {categories.map((category) => (
        <div key={category}>
          <Link to={`/events/${category}`} className="homepage__category__headline">{category}</Link>
          <EventCarousel events={events} category={category}/>
        </div>
      ))}
    </div>
  );
}
