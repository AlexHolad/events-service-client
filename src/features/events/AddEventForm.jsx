// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// DATA DATABASE AND REDUX STORE ACTIONS
import { useEventActions } from "../../app/store";

// COMPONENTS
import Button from "../../components/Button.component/Button";
import CloudinaryUploadWidget from "../../components/Cloudinary.component/Cloudinary";

// CSS
import "./AddEventForm.css";

const AddEventForm = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    subcategories: [],
    location: "",
    address: "",
    date: "",
    imgUrl: "",
    description: "",
  });
  const [imgUrl, setImgUrl] = useState("")

  // SUBCATEGORIES
  const subcategories = ["концерты", "театр", "детям"];
  // CHECKBOXES FOR SUBCATEGORIES
  const [checkedState, setCheckedState] = useState([]);

  const navigate = useNavigate();
  const { addNewEvent } = useEventActions();

  const onFormChanged = (e) => {
    setForm({...form,
        [e.target.name]: e.target.value,
      })
  }



  const handleSend = () => {
    console.log(form)
    const newEvent = addNewEvent({...form,
      subcategories: checkedState,
      img: imgUrl,
    });
    if (newEvent) {
      navigate("/user");
    }
  };
  const handleClear = () => { 
    setForm({
      title: "",
      category: "",
      subcategories: [],
      location: "",
      address: "",
      date: "",
      imgUrl: "",
      description: "",
    })
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
            name="title"
            placeholder="Название события"
            value={form.title}
            onChange={onFormChanged}
          />
        </div>
        <div className="form__item">
          <h4 htmlFor="data">Дата и время</h4>
          <input
            className="input"
            type="datetime-local"
            id="data"
            name="date"
            value={form.date}
            onChange={onFormChanged}
          />
        </div>
        <div className="form__item">
          <h4 htmlFor="category">Категория</h4>
          <select
            className="input"
            name="category"
            id="category"
            value={form.category}
            onChange={onFormChanged}
          >
            <option value="">Выберите категорию</option>
            <option value="гастроли">Гастроли</option>
            <option value="местные представления">Местные представления</option>
            <option value="вечера">Вечера</option>
            <option value="настольные игры">Настольные игры</option>
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
            value={form.location}
            onChange={onFormChanged}
          />
        </div>
        <div className="form__item">
          <h4 htmlFor="address">Адрес</h4>
          <input
            className="input"
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={onFormChanged}
          />
        </div>
      </div>
      <div className="form__block form__block__second">
        <div className="form__item">
          <CloudinaryUploadWidget setImgUrl={setImgUrl} />
          <img id="uploadedimage" className="form__image" src=""></img>
        </div>
      </div>
      <div className="form__block">
        <h4 htmlFor="dsec">Описание</h4>
        <textarea
          name="description"
          rows="5"
          cols="40"
          className="form__textarea input"
          value={form.description}
          onChange={onFormChanged}
        />
      </div>
      <div className="actions">
        <Button className="form__btn" action={handleSend}>
          {"Добавить"}
        </Button>
        <Button className="form__btn" action={handleClear}>
          {"Очистить"}
        </Button>
      </div>
    </div>
  );
};

export default AddEventForm;
