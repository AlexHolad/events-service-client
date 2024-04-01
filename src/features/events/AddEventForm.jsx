// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// NPM FOR DATES FORMATTING
import moment from "moment";

// STORE DATA ACTIONS
import { useEventActions } from "../../app/store";

// COMPONENTS
import Button from "../../components/Button.component/Button";
import CloudinaryUploadWidget from "../../components/Cloudinary.component/Cloudinary";

import { Editor } from "@tinymce/tinymce-react";

// CSS
import "./AddEventForm.css";
import Telegram from "../../components/Telegram.component/Telegram";

const AddEventForm = () => {
  // SOCIAL POSTS ACTIVENESS STATE
  const [social, setSocial] = useState({ telegram: false, instagram: false, facebook: false });
  // EVENT INFORMATION STATES
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("гастроли");

  // SUBCATEGORIES
  const subcategories = ["концерты", "театр", "детям"];
  // CHECKBOXES FOR SUBCATEGORIES
  const [checkedState, setCheckedState] = useState([]);

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [tempDate, setTempDate] = useState(
    moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
  );
  const [tempStartDate, setTempStartDate] = useState(
    moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
  );
  const [tempEndDate, setTempEndDate] = useState(
    moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
  );

  const [dates, setDates] = useState([]);
  const [period, setPeriod] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { addNewEvent } = useEventActions();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onTempDateChanged = (e) => setTempDate(e.target.value);
  const onTempStartDateChanged = (e) => setTempStartDate(e.target.value);
  const onTempEndDateChanged = (e) => setTempEndDate(e.target.value);

  const addDate = () => {
    if (tempDate) {
      const sortedDates = [...dates, moment.utc(tempDate).format()];
      sortedDates.sort((a, b) => {
        if (!a) {
          // Change this values if you want to put `null` values at the end of the array
          return +1;
        }

        if (!b) {
          // Change this values if you want to put `null` values at the end of the array
          return -1;
        }

        return a.localeCompare(b);
      });
      setDates(sortedDates);
      setTempDate(
        moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
      );
    }
  };
  const addStartDate = () => {
    const arr = [...dates];
    arr[0] = moment.utc(tempStartDate);
    setDates(arr);
    setTempStartDate(
      moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
    );
  };
  const addEndDate = () => {
    const arr = [...dates];
    arr[1] = moment.utc(tempEndDate);
    setDates(arr);
    setTempEndDate(
      moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm")
    );
  };
  const deleteDate = (index) => {
    setDates(dates.filter((dateFromArray, i) => i !== index));
  };
  const onPeriodChange = () => {
    setDates([]);
    setPeriod(!period);
  };

  // SOCIAL SWITCHER FUNC
  const onSocialChange = (socialName) => {
    const socialStatuses = {...social, [socialName]: !social[socialName]}
    console.log("SOCIAL", socialStatuses)
    setSocial(socialStatuses);
  }

  const handleSend = () => {
    const newEvent = addNewEvent({
      title: title.trim(),
      category: category.trim(),
      subcategories: checkedState,
      location: location.trim(),
      address: address.trim(),
      dates,
      period,
      img: imgUrl,
      description,
    });
    if (newEvent) {
      navigate("/user");
    }
  };

  return (
    <div className="form__parent__container">
      <div className="form__child__container">
        <div className="form__block form__block__first">
        <div className="form__item">
        <h4 htmlFor="title">Сайт</h4>
        </div>
          <div className="form__item">
            <h4 htmlFor="title">Название</h4>
            <input
              className="input"
              type="text"
              id="title"
              name="eventname"
              placeholder="Название события"
              value={title}
              onChange={onTitleChanged}
            />
          </div>
          <div className="form__item">
            <h4 htmlFor="dates">Дата</h4>
            {!period && dates.length > 0 ? (
              <div className="addeventform__dates__container">
                {dates.map((dateFromDates, index) => (
                  <div key={index} className="addeventform__date">
                    <p>{moment.utc(dateFromDates).format("L, HH:mm")}</p>
                    <img
                      onClick={() => deleteDate(index)}
                      className="addeventform__closeicon"
                      width="14"
                      height="14"
                      src="https://img.icons8.com/metro/26/8da220/delete-sign.png"
                      alt="delete-sign"
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="subcategories-list-item">
              {/* SWITCH DATES*/}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={period}
                  onChange={onPeriodChange}
                ></input>
                <span className="slider round"></span>
              </label>
              <label htmlFor={"oneDate"}>{"Период"}</label>
              {/* SWITCH DATES*/}
            </div>
            <div
              className={period ? "show dates__block" : "hidden dates__block"}
            >
              <div className="addeventform__dates__container">
                <p>С</p>
                {dates[0] && (
                  <div key={0} className="addeventform__date">
                    <p>{moment.utc(dates[0]).format("L, HH:mm")}</p>
                    <img
                      onClick={() => deleteDate(0)}
                      className="addeventform__closeicon"
                      width="14"
                      height="14"
                      src="https://img.icons8.com/metro/26/8da220/delete-sign.png"
                      alt="delete-sign"
                    />
                  </div>
                )}
              </div>
              <div className="date__block">
                <input
                  className="input"
                  type="datetime-local"
                  id="startDate"
                  name="date"
                  value={tempStartDate}
                  onChange={onTempStartDateChanged}
                />
                <button className="form__button" onClick={addStartDate}>
                  +
                </button>
              </div>
              <div className="addeventform__dates__container">
                <p>По</p>
                {dates[1] && (
                  <div key={1} className="addeventform__date">
                    <p>{moment.utc(dates[1]).format("L, HH:mm")}</p>
                    <img
                      onClick={() => deleteDate(1)}
                      className="addeventform__closeicon"
                      width="14"
                      height="14"
                      src="https://img.icons8.com/metro/26/8da220/delete-sign.png"
                      alt="delete-sign"
                    />
                  </div>
                )}
              </div>
              <div className="date__block">
                <input
                  className="input"
                  type="datetime-local"
                  id="endDate"
                  name="date"
                  value={tempEndDate}
                  onChange={onTempEndDateChanged}
                />
                <button className="form__button" onClick={addEndDate}>
                  +
                </button>
              </div>
            </div>
            <div
              className={!period ? "show dates__block" : "hidden dates__block"}
            >
              <div className="date__block">
                <input
                  className="input"
                  type="datetime-local"
                  id="tempdate"
                  name="tempdate"
                  value={tempDate}
                  onChange={onTempDateChanged}
                />
                <button className="form__button" onClick={addDate}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="form__item">
            <h4 htmlFor="category">Категория</h4>
            <select
              className="input"
              name="category"
              id="category"
              value={category}
              onChange={onCategoryChanged}
            >
              <option value="гастроли">Гастроли</option>
              <option value="местные события">Местные события</option>
              <option value="места для посещения">Места для посещения</option>
              <option value="игры">Игры</option>
            </select>
          </div>
          <div className="form__item">
            <h4 htmlFor="">Также показывать в:</h4>
            <ul className="subcategories-list">
              {subcategories.map((subcategory, index) => {
                return (
                  <li key={index}>
                    <div className="subcategories-list-item">
                      <input
                        type="checkbox"
                        name={subcategory}
                        value={subcategory}
                        checked={checkedState.includes(subcategory)}
                        onChange={(e) => {
                          e.target.checked
                            ? setCheckedState([...checkedState, e.target.value])
                            : setCheckedState(
                                [...checkedState].filter(
                                  (subcategory) =>
                                    subcategory !== e.target.value
                                )
                              );
                        }}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>
                        {subcategory}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="form__item">
            <h4 htmlFor="location">Площадка</h4>
            <input
              className="input"
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={onLocationChanged}
            />
          </div>
          <div className="form__item">
            <h4 htmlFor="address">Адрес</h4>
            <input
              className="input"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={onAddressChanged}
            />
          </div>
        </div>
        <div className="form__block form__block__second">
          <div className="form__item">
            <CloudinaryUploadWidget setImgUrl={setImgUrl} />
            <img id="uploadedimage" className="form__image" src=""></img>
          </div>
        </div>
        <div>
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={description}
            onEditorChange={(newValue) => setDescription(newValue)}
            initialValue={""}
            init={{
              language: "ru",
              height: 500,
              menubar: true,
              browser_spellcheck: true,
              contextmenu: false,
              plugins:
                "anchor lists link autolink preview searchreplace visualblocks code fullscreen insertdatetime code",
              toolbar:
                "undo redo | blocks link |" +
                "bold italic | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | ",
              link_default_target: "_blank",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              relative_urls: false,
            }}
          />
        </div>
        <div className="actions">
          <Button className="form__btn" action={handleSend}>
            {"Сохранить"}
          </Button>
        </div>
      </div>
      <div className="form__child__container telegram">
        <div className="form__block form__block__first">
          <div className="form__item">
          <div className="row space-between align-center">
            <h4 htmlFor="title" className="color__telegram">
              Telegram
            </h4>
            {/* SWITCH */}
            <label className="switch">
                <input
                  type="checkbox"
                  checked={social.telegram}
                  onChange={()=> onSocialChange('telegram')}
                ></input>
                <span className="slider slider__telegram round"></span>
              </label>
              {/* SWITCH */}
            </div>
            {social.telegram && (
              <Telegram
                title={title}
                dates={dates}
                period={period}
                location={location}
                address={address}
                description={description}
                photo={imgUrl}
              />
            )}
          </div>
        </div>
      </div>
      <div className="form__child__container">
        <div className="form__block form__block__first">
          <div className="form__item">
            <div className="row space-between align-center">
            <h4 htmlFor="title">Instagram</h4>
            {/* SWITCH */}
            <label className="switch">
                <input
                  type="checkbox"
                  checked={social.instagram}
                  onChange={()=> onSocialChange('instagram')}
                ></input>
                <span className="slider round"></span>
              </label>
              {/* SWITCH */}
              </div>
            {social.instagram && (
              <h5>Instagram Component</h5>
            )}
          </div>
        </div>
      </div>
      <div className="form__child__container">
        <div className="form__block form__block__first">
          <div className="form__item">
          <div className="row space-between align-center">
            <h4 htmlFor="title">Facebook</h4>
            {/* SWITCH */}
            <label className="switch">
                <input
                  type="checkbox"
                  checked={social.facebook}
                  onChange={()=> onSocialChange('facebook')}
                ></input>
                <span className="slider round"></span>
              </label>
          </div>
              {/* SWITCH */}
            {social.facebook && (
              <h5>Facebook Component</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventForm;
