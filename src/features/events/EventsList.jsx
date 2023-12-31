import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useEvents,
  useSearchField,
  useDate,
  useEventActions,
} from "../../app/store";

import Spinner from "../../components/Spinner.component/Spinner";

import moment from "moment";
import "moment/dist/locale/ru";

import "./EventsList.css";

let EventExcerpt = ({ event }) => {
  return (
    <div className="event__container" key={event._id}>
      <Link to={`/event/${event._id}`}>
        <div className="event__img__container">
          <img className="event__img" src={event.img} />
        </div>
        <div className="event__info">
          <div className="eventcard__title__container">
            <h2 className="event__title truncate">{event.title}</h2>
          </div>
          {event.category !== "места для посещения" &&
            event.category !== "игры" && (
              <div className="event__date__container">
                <ul className="dateslist">
                  {/* SHOW ONE DATE IF DATE EXIST */}
                  {event.date && (
                    <li className="event__date__container">
                      <p className="event__weekday">
                        {moment(event.date).format("ddd")},
                      </p>
                      <p className="event__month">
                        {moment(event.date).format("MMM")}
                      </p>
                      <p className="event__day">
                        {moment(event.date).format("D")},
                      </p>
                      <p className="event__time">
                        {moment.utc(event.date).format("HH:mm")}
                      </p>
                    </li>
                  )}
                  {/* SHOW MANY DATES IF DATES ExIST */}
                  {event.dates.length > 0 && event.dates.map((date, index)=> 
                    <li key={index} className="event__date__container">
                    <p className="event__weekday">
                      {moment(date).format("ddd")},
                    </p>
                    <p className="event__month">
                      {moment(date).format("MMM")}
                    </p>
                    <p className="event__day">
                      {moment(date).format("D")},
                    </p>
                    <p className="event__time">
                      {moment.utc(date).format("HH:mm")}
                    </p>
                  </li>
                  )}
                  {/* SHOW RANGELIST IF LIST EXIST */}
                </ul>
              </div>
            )}
          <p className="event__location">{event.location}</p>
        </div>
      </Link>
    </div>
  );
};

export const EventsList = () => {
  // Using a query hook automatically fetches data and returns query values
  const events = useEvents();
  const searchField = useSearchField();
  const { getEvents, setDate, setSearchField } = useEventActions();
  const { category, venue, subcategory } = useParams();
  const date = useDate();

  useEffect(() => {
    moment.updateLocale("ru");
  }, []);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    return () => {
      // Component unmounted
      setDate(new Date());
      setSearchField("");
    };
  }, [setDate, setSearchField]);

  const sortedEvents = useMemo(() => {
    const sortedEvents = [...events];
    // Sort posts in inscending chronological order
    sortedEvents.sort((a, b) => {
      if (!a.date) {
        // Change this values if you want to put `null` values at the end of the array
        return +1;
      }

      if (!b.date) {
        // Change this values if you want to put `null` values at the end of the array
        return -1;
      }

      return a.date.localeCompare(b.date);
    });
    return sortedEvents;
  }, [events]);

  let filteredEvents = [...sortedEvents];

  if (category === "все") {
    filteredEvents = [...sortedEvents];
  }

  if (category !== "все" && category !== undefined) {
    filteredEvents = filteredEvents.filter(
      (event) => event.category === category
    );
  }

  if (subcategory) {
    filteredEvents = filteredEvents.filter((event) =>
      event.subcategories.includes(subcategory)
    );
  }

  if (moment(date).format("L") !== moment(new Date()).format("L")) {
    console.log("Date", typeof date);
    console.log("Moment date", typeof moment(new Date()).format("L"));
    filteredEvents = filteredEvents.filter(
      (event) => moment(event.date).format("L") === moment(date).format("L")
    );
  }

  if (searchField.length > 0) {
    filteredEvents = filteredEvents.filter((event) =>
      event.title.toLowerCase().includes(searchField.toLowerCase())
    );
  }

  if (venue) {
    console.log("Venue", venue);
    console.log(filteredEvents);
    filteredEvents = filteredEvents.filter(
      (event) => event.location.toLowerCase() === venue.toLowerCase()
    );
  }

  let content;

  if (filteredEvents) {
    content = filteredEvents.map((event) => (
      <EventExcerpt key={event._id} event={event} />
    ));
  } else {
    content = <div>{"Something goes wrong"}</div>;
  }

  return (
    <div className="gen__container">
      <h3 className="eventslist__headline">
        {category ||
          venue ||
          searchField ||
          subcategory ||
          moment(date).format("L")}
      </h3>
      <div className="events__container">
        {content.length ? content : "В данный момент нет актуальных событий"}
      </div>
    </div>
  );
};
