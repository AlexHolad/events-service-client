// HOOKS
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const { eventId } = useParams();
  const { setEvent, getEventById, editEvent, findEventById } =
    useEventActions();
  const [isLoading, setIsLoading] = useState(true);

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
        if (data.date) setDate(data.date);
        if (data.dates.length > 0) {
          setDates(data.dates);
          setToggleDate(false);
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




  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  // SUBCATEGORIES
  const subcategories = ["концерты", "театр", "детям"];
  // CHECKBOXES FOR SUBCATEGORIES
  const [checkedState, setCheckedState] = useState([]);

  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const [toggleDate, setToggleDate] = useState(true);
  const [date, setDate] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [dates, setDates] = useState([]);
  const [range, setRange] = useState([]);

  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=> {
    console.log("Is One Date: ", toggleDate)
    console.log("Date: ", date)
    console.log("Dates: ", dates)
  }, [dates, date, toggleDate])

  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onTempDateChanged = (e) => setTempDate(e.target.value);

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
      setTempDate("");
    }
  };
  const deleteDate = (index) => {
    setDates(dates.filter((dateFromArray, i) => i !== index));
  };
  const onToggleChanged = () => {
    setToggleDate(!toggleDate);

    if (toggleDate) {
      setDate("");
    } else {
      setDates([]);
    }
  };

  const handleSave = () => {
    const editedEvent = editEvent({
      _id: eventId,
      title: title.trim(),
      category: category.trim(),
      subcategories: checkedState,
      location: location.trim(),
      address: address.trim(),
      date: date ? moment.utc(date).format() : "",
      dates,
      range,
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
          {!toggleDate && dates.length > 0 ? (
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
          {date.length > 0 && (
            <div className="addeventform__dates__container">
              <div className="addeventform__date">
                <p>{moment.utc(date).format("L, HH:mm")}</p>
              </div>
            </div>
          )}
          <ul className="subcategories-list">
            <li>
              <div className="subcategories-list-item">
                <input
                  type="checkbox"
                  name={"oneDate"}
                  value={"one"}
                  checked={toggleDate}
                  onChange={onToggleChanged}
                />
                <label htmlFor={"oneDate"}>{"Одна"}</label>
              </div>
            </li>
            <li>
              <div className="subcategories-list-item">
                <input
                  type="checkbox"
                  name={"manyDate"}
                  value={"many"}
                  checked={!toggleDate}
                  onChange={onToggleChanged}
                />
                <label htmlFor={"oneDate"}>{"Несколько"}</label>
              </div>
            </li>
          </ul>
          <div
            className={toggleDate ? "show date__block" : "hidden date__block"}
          >
            <input
              className="input"
              type="datetime-local"
              id="date"
              name="date"
              value={date}
              onChange={onDateChanged}
            />
          </div>
          <div
            className={!toggleDate ? "show date__block" : "hidden date__block"}
          >
            <input
              className="input"
              type="datetime-local"
              id="tempdate"
              name="tempdate"
              value={tempDate}
              onChange={onTempDateChanged}
            />
            <Button action={addDate}>Добавить</Button>
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
