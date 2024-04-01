import { useEffect, useState } from "react";

import { useEventActions } from "../../app/store";

import moment from "moment";

// SHOW HTML STRING TO JSX
import parse from "html-react-parser";
// HTML TO STRING
import { convert } from 'html-to-text';


import "./Telegram.css";

export default function Telegram({
  title,
  dates,
  period,
  location,
  address,
  photo,
  description,
}) {

  useEffect(()=> {
    console.log(description)
  },[description])
  // TELEGRAM POSTING
  const [telegramResult, setTelegramResult] = useState("");
  const [chat_ids, setChat_ids] = useState(["@svoiberlintestbot"]);
  const { addNewTelegramPost } = useEventActions();

  const handleTelegramPost = () => {
    const caption = `${
      period
        ? `🗓 <strong>С ${moment(dates[0]).format("D")} ${moment(
            dates[0]
          ).format("MMM")} по ${moment(dates[1]).format("D")} ${moment(
            dates[1]
          ).format("MMM")}</strong>\n\n`
        : dates
            .map(
              (date, i) =>
                `🗓   ${moment(date).format("D")} ${moment(date).format(
                  "MMM"
                )} ${moment.utc(date).format("HH:mm")} ${moment(date).format(
                  "ddd"
                )}\n${i === dates.length - 1 ? "\n" : ""}`
            )
            .join("")
    }<strong>${title.trim()}</strong>\n\n📍<a href="https://www.google.com/maps/search/?api=1&query=${location} ${address}">${location}</a>\n
    ${convert(description,{
      selectors: [
        { selector: 'a', options: { baseUrl: '', linkBrackets: true, hideLinkHrefIfSameAsText: true, ignoreHref: true} }
      ]
    })}`;

    const telegramPostMessage = addNewTelegramPost({
      chat_ids: chat_ids,
      photo: photo,
      caption: caption,
    });

    if (telegramPostMessage) {
      console.log(telegramPostMessage);
      setTelegramResult(telegramPostMessage);
    }
  };

  return (
    <div className="telegram__section__container">
      <div className="telegram__post__container">
        <p className="telegram__post__botname">Afisha Berlin</p>
        {photo && (
          <img
            src={photo}
            alt="cloudinary-image"
            className="telegram__img"
          ></img>
        )}
        <div className="telegram__post__info">
          <div className="telegram__dates__container">
            {period ? (
              <div className="telegram__dates__block">
                <img
                  className="telegram__post__icon__spiral-calendar"
                  src="/icons/spiral-calendar.png"
                  alt="spiral-calender-icon"
                />
                {`С ${moment.utc(dates[0]).format("L")} по ${moment
                  .utc(dates[1])
                  .format("L")}`}
              </div>
            ) : (
              dates.map((date, i) => (
                <div key={i} className="telegram__dates__block">
                  <img
                  className="telegram__post__icon__spiral-calendar"
                  src="/icons/spiral-calendar.png"
                  alt="spiral-calender-icon"
                />
                <div className="telegram__date__block">
                  <p>{moment(date).format("D")}</p>
                  <p>{moment(date).format("MMM")}</p>
                  <p>{moment.utc(date).format("HH:mm")}</p>
                  <p>{moment(date).format("ddd")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <p className="telegram__post__title">{title.trim()}</p> 
          <a className="color__telegram" href={`https://www.google.com/maps/search/?api=1&query=${location} ${address}`}>{location}</a>
          {parse(description)}
        </div>

        {/* <p>{telegramResult}</p> */}
      </div>
      <button className="telegram__button button" onClick={handleTelegramPost}>
        Запостить в Botest
      </button>
    </div>
  );
}
