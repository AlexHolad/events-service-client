import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import moment from "moment";

// SHOW HTML STRING TO JSX
import parse from "html-react-parser";

import "./Event.css";

import { useEvent, useEventActions } from "../../app/store";

function Event() {
  let { state } = useLocation();
  const { eventId } = state;
  const { getEventById, setEvent } = useEventActions();
  const event = useEvent();

  useEffect(() => {
    console.log(event.date);
    console.log(event.dates);
  }, [event.date, event.dates]);

  useEffect(() => {
    getEventById(eventId);
  }, [eventId, getEventById]);

  useEffect(() => {
    return () => {
      // Component unmounted
      setEvent({});
    };
  }, [setEvent]);

  let content;

  if (event.description) {
    content = (
      <div className="eventpage__container gen__container">
        <div className="eventpage__img__container">
          <img className="eventpage__img" src={event.img} />
        </div>
        <div className="eventpage__info">
          {event.category !== "места для посещения" &&
            event.category !== "игры" && (
              <div className="event__date__container">
                <ul className="dateslist">
                  {/* SHOW ONE DATE IF DATE EXIST */}
                  {event.date && (
                    <div className="eventpage__date__container">
                      <p className="eventpage__day">
                        {moment(event.date).format("D")}
                      </p>
                      <p className="eventpage__month">
                        {moment(event.date).format("MMM")}
                      </p>
                      <p className="eventpage__time">
                        {moment.utc(event.date).format("HH:mm")}
                      </p>
                      <p className="eventpage__weekday">
                        {moment(event.date).format("ddd")}.
                      </p>
                    </div>
                  )}
                  {/* SHOW MANY DATES IF DATES ExIST */}
                  {event.dates.length > 0 &&
                    event.dates.map((date, index) =>
                      !event.period ? (
                        <div className="eventpage__date__container" key={index}>
                          <p className="eventpage__day">
                            {moment(date).format("D")}
                          </p>
                          <p className="eventpage__month">
                            {moment(date).format("MMM")}
                          </p>
                          <p className="eventpage__time">
                            {moment.utc(date).format("HH:mm")}
                          </p>
                          <p className="eventpage__weekday">
                            {moment(date).format("ddd")}
                          </p>
                        </div>
                      ) : (
                        <div className="eventpage__date__container" key={index}>
                          {event.period && index === 0 ? (
                            <p className="eventpage__date__period">С</p>
                          ) : null}
                          {event.period && index === 1 ? (
                            <p className="eventpage__date__period">По</p>
                          ) : null}
                          <p className="eventpage__day">
                            {moment(date).format("D")}
                          </p>
                          <p className="eventpage__month">
                            {moment(date).format("MMM")}
                          </p>
                        </div>
                      )
                    )}
                  {/* SHOW RANGELIST IF LIST EXIST */}
                </ul>
              </div>
            )}

          <h1 className="eventpage__title truncate">{event.title}</h1>
          <div className="event__item">
            <h5 className="event__item__headline">Площадка</h5>
            <p className="eventpage__location"><Link to={`/events/venue/${event.location}`}>{event.location}</Link></p>
            <p className="eventpage__address">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                  event.location
                )} ${encodeURI(event.address)}`}
                target="_blank"
                rel="noreferrer"
              >{event.address}</a>
            </p>
          </div>
          <div className="event__item">
            <h5 className="event__item__headline">Описание</h5>
            {event.description && (
              <p className="eventpage__description">
                {parse(event.description)}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="eventpage__container gen__container">{"Loading"}</div>
    );
  }

  return <div>{content}</div>;
}

export default Event;
