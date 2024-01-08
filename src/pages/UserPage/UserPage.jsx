import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../../components/Spinner.component/Spinner";

import moment from "moment";
import "moment/dist/locale/ru";

import { useUserEvents, useEventActions, useToken, useEventId } from "../../app/store";

import Agree from "../../components/Agree.component/Agree";
import Button from "../../components/Button.component/Button";

import "./UserPage.css";

let EventExcerpt = ({ event, goToEditPage, setEventId}) => {
  const { _id } = event;
  return (
    <div className="userpage__event__container" key={event._id}>
      <Link to={`/event/${event._id}`}>
        <div className="event__img__container">
          <img className="event__img" src={event.img} />
        </div>
        <div className="event__info">
        <div className="event__title__container">
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
      <div className="userpage__event__buttons__container">
        <button className="button" onClick={() => goToEditPage(_id)}>
          Изменить
        </button>
        <button className="button" onClick={()=> setEventId(_id)}>
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
  const eventId = useEventId()

  useEffect(() => {
    if (token !== null) {
      getUserEvents();
    }
  }, [token, getUserEvents, events]);

  useEffect(() => {
    moment.updateLocale("ru");
  }, []);


  const deletEventAndClearId = (eventId) => {
    deleteEvent(eventId)
    setEventId("")
  }

  const goToAdding = () => {
    navigate("/events/add");
  };
  const goToEditPage = (eventId) => {
    navigate(`/events/edit/${eventId}`);
  };

  const sortedEvents = useMemo(() => {
    const sortedEvents = events.slice();
    // Sort posts in descending chronological order
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
        doaction={deletEventAndClearId} cancel={setEventId} cancelValue={""} thequestion={"Вы действительно хотите удалить?"} theaction__param={eventId} thebtn1text={"Отмена"} thebtn2text={"Удалить"}
        />
    </div>
  );
}

export default UserPage;
