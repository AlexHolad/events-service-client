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
  const [district, setDistrict] = useState("");
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
  const onDistrictChanged = (e) => setDistrict(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);

  const handleSave = () => {
    const editedEvent = editEvent({
      _id: eventId,
      title,
      category,
      district,
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
    setDistrict("");
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
            <option value="концерты">Концерты</option>
            <option value="театр">Театр</option>
            <option value="детям">Детям</option>
          </select>
        </div>
        <div className="form__item">
          <h4 htmlFor="district">Район</h4>
          <input
            className="input"
            type="text"
            id="district"
            name="district"
            value={district}
            onChange={onDistrictChanged}
          />
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
          <h4 htmlFor="img">Загрузить изображение</h4>
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
