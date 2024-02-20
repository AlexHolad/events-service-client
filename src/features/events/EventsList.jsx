import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import {
  useEvents,
  useSearchField,
  useDate,
  useEventActions,
} from "../../app/store";

import moment from "moment";
import "moment/dist/locale/ru";

// cyrillic-to-translit converter
import CyrillicToTranslit from 'cyrillic-to-translit-js';

import "./EventsList.css";

let EventExcerpt = ({ event }) => {
    // TRANSLIT FROM CYRILLIC
    const cyrillicToTranslit = new CyrillicToTranslit();
    const translitTitle = cyrillicToTranslit.transform(event.title, '-').toLowerCase();
    // TRANSLIT FROM CYRILLIC
  return (
    <div className="event__container" key={event._id}>
      <Link to={`/event/${translitTitle}`} state={{ eventId: event._id }}>
        <div className="event__img__container">
          <img className="event__img" src={event.img} />
        </div>
        <div className="event__info">
          <div className="eventcard__title__container">
            <h2 className="event__title truncate">{event.title}</h2>
          </div>
          {event.category !== "места для посещения" &&
            event.category !== "игры" && (
              <div className="eventcard__dates__container">
                {event.date && (
                  <div className="eventcard__date__container">
                    <p className="eventcard__day">
                      {moment(event.date).format("D")}
                    </p>
                    <p className="eventcard__month">
                      {moment(event.date).format("MMM")}
                    </p>
                    <p className="eventcard__time">
                      {moment.utc(event.date).format("HH:mm")}
                    </p>
                    <p className="eventcard__weekday">
                      {moment(event.date).format("ddd")}
                    </p>
                  </div>
                )}
                {event.dates.length > 0 &&
                  event.dates.map((date, index) =>
                    !event.period ? (
                      <div className="eventcard__date__container" key={index}>
                        <p className="eventcard__day">
                          {moment(date).format("D")}
                        </p>
                        <p className="eventcard__month">
                          {moment(date).format("MMM")}
                        </p>
                        <p className="eventcard__time">
                          {moment.utc(date).format("HH:mm")}
                        </p>
                        <p className="eventcard__weekday">
                          {moment(date).format("ddd")}
                        </p>
                      </div>
                    ) : (
                      <div className="eventcard__date__container" key={index}>
                        {event.period && index === 0 ? (
                          <p className="eventcard__date__period">С</p>
                        ) : null}
                        {event.period && index === 1 ? (
                          <p className="eventcard__date__period">По</p>
                        ) : null}
                        <p className="eventcard__day">
                          {moment(date).format("D")}
                        </p>
                        <p className="eventcard__month">
                          {moment(date).format("MMM")}
                        </p>
                      </div>
                    )
                  )}
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
    if(category || subcategory){
      setDate("")
    }
  }, [subcategory, category, date, setDate]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    return () => {
      // Component unmounted
      setDate('');
      setSearchField("");
    };
  }, [setDate, setSearchField]);

  const sortedEvents = useMemo(() => {
    const sortedEvents = [...events];
    // Sort posts in inscending chronological order
    sortedEvents.sort((a, b) => {
      if (!a.dates[0]) {
        // Change this values if you want to put `null` values at the end of the array
        return +1;
      }

      if (!b.dates[0]) {
        // Change this values if you want to put `null` values at the end of the array
        return -1;
      }

      return a.dates[0].localeCompare(b.dates[0]);
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

  if (date) {
    console.log("Date", typeof date);
    console.log("Moment date", typeof moment(new Date()).format("L"));
    filteredEvents = filteredEvents.filter(
      (event) => event.dates[0] && moment(event.dates[0]).format("L") === moment(date).format("L")
    );
    console.log(filteredEvents)
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
