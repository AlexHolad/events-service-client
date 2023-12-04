import { useEffect } from "react";
import { useParams } from "react-router-dom";

import moment from "moment";

import Spinner from "../../components/Spinner.component/Spinner";

import "./Event.css";

import { useEvent, useEventActions } from "../../app/store";

function Event() {
  const { eventId } = useParams();
  const {getEventById} = useEventActions()
  const event = useEvent();

  useEffect(()=> {
    getEventById(eventId)
  },[eventId, getEventById])

  let content;

  if (event) {
    content = (
      <div className="eventpage__container gen__container">
        <div className="eventpage__img__container">
          <img className="eventpage__img" src={event.img} />
        </div>
        <div className="eventpage__info">
        <div className="eventpage__date__container">
            <p className="eventpage__weekday">
              {moment(event.date).format("dddd")}, 
            </p>
            <p className="eventpage__day">{moment(event.date).format("LL")}</p>
            <p className="eventpage__time">{moment.utc(event.date).format("HH:mm")}</p>
          </div>
          <h2 className="eventpage__title truncate">{event.title}</h2>
          <div className="event__item">
          <h5 className="event__item__headline">Площадка</h5>
          <p className="eventpage__location">{event.location}</p>
          <p className="eventpage__address">{event.address}</p>
          </div>
          <div className="event__item">
          <h5 className="event__item__headline">Описание</h5>
          <p className="eventpage__description">{event.description}</p>
          </div>
        </div>
      </div>
    );
  } else {
    content = <div>{"Something wrong"}</div>;
  }

  return <div>{content}</div>;
}

export default Event;
