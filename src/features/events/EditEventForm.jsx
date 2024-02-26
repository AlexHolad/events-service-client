// HOOKS
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import moment from "moment";

// DATA DATABASE AND REDUX STORE ACTIONS
import { useEventActions } from "../../app/store";

import TextEditor from "../../components/Editor.component/Editor";

// COMPONENTS
import Button from "../../components/Button.component/Button";
import CloudinaryUploadWidget from "../../components/Cloudinary.component/Cloudinary";

// CSS
import "./EditEventForm.css";

const EditEventForm = () => {
  let { state } = useLocation();
  const { eventId } = state;
  const { setEvent, getEventById, editEvent, findEventById } =
    useEventActions();
  const [isLoading, setIsLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  // SUBCATEGORIES
  const subcategories = ["концерты", "театр", "детям"];
  // CHECKBOXES FOR SUBCATEGORIES
  const [checkedState, setCheckedState] = useState([]);

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [tempDate, setTempDate] = useState(moment([moment().year(), moment().month()]).format('YYYY-MM-DDTHH:mm'));

  const [tempStartDate, setTempStartDate] = useState(moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm"))
  const [tempEndDate, setTempEndDate] = useState(moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm"))


  const [dates, setDates] = useState([]);
  const [period, setPeriod] = useState(false);

  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getEventById(eventId)
      .then((data) => {
        return data;
      })
      .then((data) => {
        if (data) {
          setCheckedState(data.subcategories);
        }
        setTitle(data.title);
        setCategory(data.category);
        setLocation(data.location);
        setAddress(data.address);
        setPeriod(data.period)
        if (data.dates.length > 0) {
          setDates(data.dates);
        }
        setImgUrl(data.img);
        setDescription(data.description);
        setIsLoading(false);
      });
    return () => {
      // Component unmounted
      setEvent({});
    };
  }, [eventId, findEventById, getEventById, setEvent]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onTempDateChanged = (e) => setTempDate(e.target.value);
  const onTempStartDateChanged = (e) => setTempStartDate(e.target.value);
  const onTempEndDateChanged = (e) => setTempEndDate(e.target.value);

  const addDate = () => {
    if (tempDate) {
      const sortedDates = [...dates, moment.utc(tempDate).format()]
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
      setTempDate(moment([moment().year(), moment().month()]).format('YYYY-MM-DDTHH:mm'));
    }
  };
  const addStartDate = () => {
    const arr = [...dates]
    arr[0] = moment.utc(tempStartDate)
    setDates(arr);
    setTempStartDate(moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm"));
  };
  const addEndDate = () => {
    const arr = [...dates]
    arr[1] = moment.utc(tempEndDate)
    setDates(arr);
    setTempEndDate(moment([moment().year(), moment().month()]).format("YYYY-MM-DDTHH:mm"));
  };
  const deleteDate = (index) => {
    setDates(dates.filter((dateFromArray, i) => i !== index));
  };
  const onPeriodChange = () => {
    setDates([]);
    setPeriod(!period);
  };

  const handleSave = () => {
    const editedEvent = editEvent({
      _id: eventId,
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
    if (editedEvent) {
      navigate("/user");
    }
  };

  if (isLoading) return <div className="gen__container">{"Loading. . ."}</div>;

  return (
    <div className="form__container">
      <div className="form__block form__block__first">
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
            {/* SWITCH */}
            <label className="switch">
              <input
                type="checkbox"
                checked={period}
                onChange={onPeriodChange}
              ></input>
              <span className="slider round"></span>
            </label>
            <label htmlFor={"oneDate"}>{"Период"}</label>
            {/* SWITCH */}
          </div>
          <div className={period ? "show date__block" : "hidden date__block"}>
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
          <div className={!period ? "show date__block" : "hidden date__block"}>
            <input
              className="input"
              type="datetime-local"
              id="tempdate"
              name="tempdate"
              value={tempDate}
              onChange={onTempDateChanged}
            />
            <button className="form__button" onClick={addDate}>+</button>
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
            <option value="">Выберите категорию</option>
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
                                (subcategory) => subcategory !== e.target.value
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
        <h4 htmlFor="img">Изображение</h4>
        <div className="form__item">
          <CloudinaryUploadWidget setImgUrl={setImgUrl} />
          <img id="uploadedimage" className="form__image" src={imgUrl}></img>
        </div>
      </div>
      <div className="form__block">
        <h4 htmlFor="dsec">Описание</h4>
        <TextEditor description={description} setDescription={setDescription} />
      </div>
      <div className="actions">
        <Button className="form__btn" action={handleSave}>
          {"Сохранить"}
        </Button>
      </div>
    </div>
  );
};

export default EditEventForm;
