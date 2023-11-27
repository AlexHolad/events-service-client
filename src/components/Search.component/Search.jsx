import { useNavigate, Link } from "react-router-dom"

import { useSearchField, useEventActions } from "../../app/store"
import './Search.css'

export default function Search() {
  const navigate = useNavigate()
    const searchField = useSearchField()
    const {setSearchField} = useEventActions()
    const handleChange = (e) => {
        e.preventDefault();
        setSearchField(e.target.value);
        console.log(searchField)
      };
    const filterBySearch = (category) => {
      navigate(`/events/${category}`)
      setSearchField('')
    };
  return (
    <div className="search__container">
      <input className='search'
          type="text"
          placeholder="Search here"
          value={searchField}
          onChange={handleChange}
    />
    
    <Link to={`/events/search/${searchField}`}><svg
              className="search__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
    </Link>
    </div>    
  )
}
