import { Link } from "react-router-dom"
import moment from "moment"
// CSS
import "./EventCard.css"

export default function EventCard({event}) {
  return (
    <div className="eventcard__container" key={event._id}>
    <Link to={`/event/${event._id}`}>
      <div className="eventcard__img__container">
        <img className="eventcard__img" src={event.img} />
      </div>
      <div className="eventcard__info">
        <h2 className="eventcard__title truncate">{event.title}</h2>
        <div className="eventcard__date__container">
          <p className="eventcard__weekday">
            {moment(event.date).format("ddd")},
          </p>
          <p className="eventcard__month">
            {moment(event.date).format("MMM")}
          </p>
          <p className="eventcard__day">{moment(event.date).format("D")},</p>
          <p className="eventcard__time">
            {moment(event.date).format("HH:mm")}
          </p>
        </div>
        <p className="eventcard__district">{event.district}</p>
        <p className="eventcard__location">{event.location}</p>
      </div>
    </Link>
  </div>
  )
}
