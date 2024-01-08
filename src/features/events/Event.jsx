import { useEffect } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";

// SHOW HTML STRING TO JSX
import parse from "html-react-parser";

import "./Event.css";

import { useEvent, useEventActions } from "../../app/store";

function Event() {
  const { eventId } = useParams();
  const { getEventById, setEvent } = useEventActions();
  const event = useEvent();

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
          {/* SHOW ONE DATE IF DATE EXIST */}
          {typeof event.date === Date && (
            <div className="eventpage__date__container">
              <p className="eventpage__weekday">
                {moment(event.date).format("dddd")},
              </p>
              <p className="eventpage__day">
                {moment(event.date).format("LL")}
              </p>
              <p className="eventpage__time">
                {moment.utc(event.date).format("HH:mm")}
              </p>
            </div>
          )}

          {event.category !== "места для посещения" &&
            event.category !== "игры" && (
              <div className="event__date__container">
                <ul className="dateslist">
                  {/* SHOW ONE DATE IF DATE EXIST */}
                  {event.date && (
                    <div className="eventpage__date__container">
                      <p className="eventpage__weekday">
                        {moment(event.date).format("dddd")},
                      </p>
                      <p className="eventpage__day">
                        {moment(event.date).format("LL")}
                      </p>
                      <p className="eventpage__time">
                        {moment.utc(event.date).format("HH:mm")}
                      </p>
                    </div>
                  )}
                  {/* SHOW MANY DATES IF DATES ExIST */}
                  {event.dates.length > 0 &&
                    event.dates.map((date, index) => (
                      <li key={index} className="eventpage__date__container">
                        <p className="eventpage__time">
                          {moment.utc(date).format("HH:mm")}
                        </p>
                        <p className="eventpage__day">
                          {moment(date).format("LL")}
                        </p>
                        <p className="eventpage__weekday">
                          {moment(date).format("dddd")},
                        </p>
                      </li>
                    ))}
                  {/* SHOW RANGELIST IF LIST EXIST */}
                </ul>
              </div>
            )}

          <h1 className="eventpage__title truncate">{event.title}</h1>
          <div className="event__item">
            <h5 className="event__item__headline">Площадка</h5>
            <p className="eventpage__location">{event.location}</p>
            <p className="eventpage__address">{event.address}</p>
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
