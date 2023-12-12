// HOOKS
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";

// DATA DATABASE AND REDUX STORE ACTIONS
import { useEventActions, useEvent } from "../../app/store";

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
  const [event, setLocalEvent] = useState({});

  useEffect(() => {
    getEventById(eventId)
      .then((data) => {
        setLocalEvent(data);
        return data
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
        setImgUrl(data.img);
        setDescription(data.description);
        setIsLoading(false)
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
  const [date, setDate] = useState(new Date());
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);

  const handleSave = () => {
    const editedEvent = editEvent({
      _id: eventId,
      title,
      category,
      subcategories: checkedState,
      location,
      address,
      date,
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
          <h4 htmlFor="data">Дата и время</h4>
          <p>
            {moment.utc(event.date).format("L")}
            {` `}
            {moment.utc(event.date).format("LT")}
          </p>
          <input
            className="input"
            type="datetime-local"
            id="data"
            name="data"
            value={date}
            onChange={onDateChanged}
          />
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
