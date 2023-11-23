import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { useEvents, useDate, useSearchField, useEventActions } from "../../app/store";

import Spinner from "../../components/Spinner.component/Spinner";

import moment from "moment";
import "moment/dist/locale/ru";


import "./EventsList.css";

let EventExcerpt = ({ event }) => {
  return (<div className="event__container" key={event._id}>
  <Link to={`/${event._id}`}>
    <div className="event__img__container">
      <img className="event__img" src={event.img} />
    </div>
    <div className="event__info">
      <h2 className="event__title truncate">{event.title}</h2>
      <div className="event__date__container">
        <p className="event__weekday">
          {moment(event.date).format("ddd")},
        </p>
        <p className="event__month">
          {moment(event.date).format("MMM")}
        </p>
        <p className="event__day">{moment(event.date).format("D")},</p>
        <p className="event__time">
          {moment(event.date).format("HH:mm")}
        </p>
      </div>
      <p className="event__district">{event.district}</p>
      <p className="event__location">{event.location}</p>
    </div>
  </Link>
</div>

  )}

export const EventsList = () => {
  // Using a query hook automatically fetches data and returns query values
  const events = useEvents();
  const date = useDate()
  const searchField = useSearchField()
  const {getEvents} = useEventActions()
  const { category } = useParams();

  useEffect(() => {
    moment.updateLocale("ru");
  }, []);

  useEffect(() => {
   getEvents()
  },[getEvents]);

  const sortedEvents = useMemo(() => {
    const sortedEvents = [...events]
    // Sort posts in inscending chronological order
    sortedEvents.sort((a, b) => a.date.localeCompare(b.date));
    return sortedEvents;
  }, [events]);
 
  let filteredEvents = [...sortedEvents]
  

  if(category === 'все') {
      filteredEvents = [...sortedEvents]
  }
  if(category !== 'все') {
      filteredEvents = filteredEvents.filter((event)=> event.category === category)
  }
  if(moment(date).format("MMM Do YY") !== moment(new Date()).format("MMM Do YY")) {
      filteredEvents = filteredEvents.filter((event)=> moment(event.date).format("MMM Do YY") === moment(date).format("MMM Do YY"))
  }
  if(searchField.length > 0){
    filteredEvents = filteredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchField.toLowerCase())
  );
  }

  let content;

  if (filteredEvents) {
      content = filteredEvents.map(event => <EventExcerpt key={event._id} event={event} />)
  } else {
    content = <div>{'Something goes wrong'}</div>;
  }

  return (
    <div className="gen__container">
      <h3 className="eventslist__headline">{category || date}</h3>
      <div className="events__container">{content}</div>
    </div>
  )
};
