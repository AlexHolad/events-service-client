import { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner.component/Spinner";

import moment from "moment";
import "moment/dist/locale/ru";

import { useUserEvents, useEventActions, useToken } from "../../app/store";
import Button from "../../components/Button.component/Button";

import "./UserPage.css";

let EventExcerpt = ({ event, deleteEvent, goToEditPage }) => {
  const { _id } = event;
  return (
    <div className="event__container" key={event._id}>
      <Link to={`/events/${event._id}`}>
        <div className="event__img__container">
          <img className="event__img" src={event.img} />
        </div>
        <div className="event__info">
          <h2 className="event__title truncate">{event.title}</h2>
          <div className="event__date__container">
            <p className="event__weekday">
              {moment(event.date).format("ddd")},
            </p>
            <p className="event__month">{moment(event.date).format("MMM")}</p>
            <p className="event__day">{moment(event.date).format("D")},</p>
            <p className="event__time">{moment(event.date).format("HH:mm")}</p>
          </div>
          <p className="event__district">{event.district}</p>
          <p className="event__location">{event.location}</p>
        </div>
      </Link>
      <div className="userpage__event__buttons__container">
        <button className="button" onClick={() => deleteEvent(_id)}>
          Удалить
        </button>
        <button className="button" onClick={() => goToEditPage(_id)}>
          Изменить
        </button>
      </div>
    </div>
  );
};

function UserPage() {
  const events = useUserEvents();
  const navigate = useNavigate();
  const { deleteEvent, getUserEvents } = useEventActions();
  const token = useToken();

  useEffect(() => {
    if (token !== null) {
      getUserEvents();
    }
  }, [token, getUserEvents]);

  useEffect(() => {
    moment.updateLocale("ru");
  }, []);

  const goToAdding = () => {
    navigate("/events/add");
  };
  const goToEditPage = (eventId) => {
    navigate(`/events/edit/${eventId}`);
  };

  const sortedEvents = useMemo(() => {
    const sortedEvents = events.slice();
    // Sort posts in descending chronological order
    sortedEvents.sort((a, b) => b.date.localeCompare(a.date));
    return sortedEvents;
  }, [events]);

  let content;

  if (events.length) {
    content = sortedEvents.map((event) => (
      <EventExcerpt
        key={event._id}
        event={event}
        deleteEvent={deleteEvent}
        goToEditPage={goToEditPage}
      />
    ));
  } else {
    content = <div>{"No user events now"}</div>;
  }

  return (
    <div className="userpage__container gen__container">
      <Button action={goToAdding}>Add new Event</Button>
      <div className="userpage__events__container">{content}</div>
    </div>
  );
}

export default UserPage;
