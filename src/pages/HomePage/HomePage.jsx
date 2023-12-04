// REACT HOOKS
import { useEffect } from "react";

// REACT ROUTER
import { Link } from "react-router-dom";


// REACT QUERY FUNCTIONALITY
import { useQuery } from "@tanstack/react-query";
// DATA FROM API
import { getEvents } from "../../app/api";

// DATA FROM STORE
// import {useEvents, useEventActions} from "../../app/store"

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


  const {data, isLoading, isError} = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  })
  // const {getEvents} = useEventActions()

  // useEffect(() => {
  //   getEvents()
  //  },[getEvents]);
 
  // const events = useEvents()

  if(isLoading) return <h1>Loading</h1>
  if(isError) return <h1>{JSON.stringify(error)}</h1>

  return (
    <div className="homepage__container gen__container">
      {categories.map((category) => (
        <div key={category}>
          <Link to={`/events/category/${category}`} className="homepage__category__headline">{category}</Link>
          <EventCarousel events={data.data} category={category}/>
        </div>
      ))}

    </div>
  );
}
