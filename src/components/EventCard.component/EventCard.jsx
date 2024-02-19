import { Link } from "react-router-dom";
import moment from "moment";
// CSS
import "./EventCard.css";

export default function EventCard({ event }) {
  return (
    <div className="eventcard__container" key={event._id}>
      <Link to={`/event/${event._id}`}>
        <div className="eventcard__img__container">
          <img className="eventcard__img" src={event.img} />
        </div>
        <div className="eventcard__info">
          <div className="eventcard__title__container">
            <h2 className="eventcard__title truncate">{event.title}</h2>
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
          <p className="eventcard__location">{event.location}</p>
        </div>
      </Link>
    </div>
  );
}
