// HOOKS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// DATA DATABASE AND REDUX STORE ACTIONS
import { useEventActions } from "../../app/store";

// COMPONENTS
import Button from "../../components/Button.component/Button";
import CloudinaryUploadWidget from "../../components/Cloudinary.component/Cloudinary";

import { Editor } from '@tinymce/tinymce-react';

// CSS
import "./AddEventForm.css";

const AddEventForm = () => {
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

  const navigate = useNavigate()
  const { addNewEvent } = useEventActions();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);  
  const onLocationChanged = (e) => setLocation(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onDateChanged = (e) => setDate(e.target.value);



  const handleSend = () => {
      const newEvent = addNewEvent({
        title: title.trim(),
        category: category.trim(),
        subcategories: checkedState,
        location: location.trim(),
        address: address.trim(),
        date,
        img: imgUrl,
        description
      })
      if(newEvent){
        navigate('/user')
      }

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
          <CloudinaryUploadWidget setImgUrl={setImgUrl} />
          <img id="uploadedimage" className="form__image" src=""></img>
        </div>
      </div>
      <div>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        value={description}
        onEditorChange={(newValue) => setDescription(newValue)}
        initialValue={''}
        init={{
          language: 'ru',
          height: 500,
          menubar: true,
          plugins: [
            'autolink', 'lists', 'link', 'preview',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'code'
          ],
          toolbar: 'undo redo | blocks link | ' +
            'bold italic | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          relative_urls : false,
        }}
      />
      </div>
      <div>
        {/* <div>{parse(convertedContent)}</div> */}
      </div>
      <div className="actions">
        <Button className="form__btn" action={handleSend}>
          {"Добавить"}
        </Button>
      </div>
    </div>
  );
};

export default AddEventForm;
