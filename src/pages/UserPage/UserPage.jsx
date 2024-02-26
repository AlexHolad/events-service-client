import { useEffect, useMemo} from "react";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";
import "moment/dist/locale/ru";

// cyrillic-to-translit converter
import CyrillicToTranslit from "cyrillic-to-translit-js";

import {
  useUserEvents,
  useEventActions,
  useToken,
  useEventId,
} from "../../app/store";

import Agree from "../../components/Agree.component/Agree";
import Button from "../../components/Button.component/Button";

import "./UserPage.css";

let EventExcerpt = ({ event, goToEditPage, setEventId }) => {
  // TRANSLIT FROM CYRILLIC
  const cyrillicToTranslit = new CyrillicToTranslit();
  const translitTitle = cyrillicToTranslit
    .transform(event.title, "-")
    .toLowerCase();
  // TRANSLIT FROM CYRILLIC
  return (
    <div className="userpage__event__container" key={event._id}>
      <Link to={`/event/${translitTitle}`} state={{ eventId: event._id }}>
        <div className="event__img__container">
          <img className="event__img" src={event.img} />
        </div>
        <div className="event__info">
          <div className="event__title__container">
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
      <div className="userpage__event__buttons__container">
        <button className="button">
          <Link to={`/events/edit/${event._id}`} state={{ eventId: event._id }}>Изменить</Link>
        </button>
        <button className="button" onClick={() => setEventId(event._id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

function UserPage() {
  const events = useUserEvents();
  const navigate = useNavigate();
  const { deleteEvent, getUserEvents, setEventId } = useEventActions();
  const token = useToken();
  const eventId = useEventId();

  useEffect(() => {
    if (token !== null) {
      getUserEvents();
    }
  }, [token, getUserEvents]);

  useEffect(() => {
    moment.updateLocale("ru");
  }, []);

  const deletEventAndClearId = (eventId) => {
    deleteEvent(eventId);
    setEventId("");
  };

  const goToAdding = () => {
    navigate("/events/add");
  };
  const goToEditPage = (eventId) => {
    navigate(`/events/edit/${eventId}`, eventId);
  };

  const sortedEvents = useMemo(() => {
    const sortedEvents = [...events];
    // Sort posts in descending chronological order
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

  let content;

  if (events.length) {
    content = sortedEvents.map((event) => (
      <EventExcerpt
        key={event._id}
        event={event}
        deleteEvent={deleteEvent}
        goToEditPage={goToEditPage}
        setEventId={setEventId}
      />
    ));
  } else {
    content = <div>{"No user events now"}</div>;
  }

  return (
    <div className="userpage__container gen__container">
      <Button action={goToAdding}>Add new Event</Button>
      <div className="userpage__events__container">{content}</div>
      <Agree
        doaction={deletEventAndClearId}
        cancel={setEventId}
        cancelValue={""}
        thequestion={"Вы действительно хотите удалить?"}
        theaction__param={eventId}
        thebtn1text={"Отмена"}
        thebtn2text={"Удалить"}
      />
    </div>
  );
}

export default UserPage;
