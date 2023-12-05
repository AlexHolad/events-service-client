// HOOKS
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// DATA DATABASE AND REDUX STORE ACTIONS
import { useEventActions } from "../../app/store";

// COMPONENTS
import Button from "../../components/Button.component/Button";
import CloudinaryUploadWidget from "../../components/Cloudinary.component/Cloudinary";

// CSS
import "./EditEventForm.css";

const EditEventForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  // SUBCATEGORIES
  const subcategories = ['концерты', 'театр', 'детям']
  // CHECKBOXES FOR SUBCATEGORIES
  const [checkedState, setCheckedState] = useState([]);
  
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");

  const { eventId } = useParams();
  const navigate = useNavigate();
  const { editEvent } = useEventActions();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

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
  const handleClear = () => {
    setTitle("");
    setCategory("");
    setCheckedState([])
    setLocation("");
    setAddress("");
    setDate("");
    setDescription("");
    setImgUrl("");
  };

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
                        : setCheckedState([...checkedState].filter((subcategory) => subcategory !== e.target.value));
                    }}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{subcategory}</label>
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
          <button htmlFor="img" className="button">Загрузить изображение</button>
          <CloudinaryUploadWidget setImgUrl={setImgUrl} />
          <img id="uploadedimage" className="form__image" src=""></img>
        </div>
      </div>
      <div className="form__block">
        <h4 htmlFor="dsec">Описание</h4>
        <textarea
          name="textarea"
          rows="5"
          cols="40"
          className="form__textarea input"
          value={description}
          onChange={onDescriptionChanged}
        />
      </div>
      <div className="actions">
        <Button className="form__btn" action={handleSave}>
          {"Сохранить"}
        </Button>
        <Button className="form__btn" action={handleClear}>
          {"Очистить"}
        </Button>
      </div>
    </div>
  );
};

export default EditEventForm;
