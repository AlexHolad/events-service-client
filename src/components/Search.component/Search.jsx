import { useSearchField, useEventActions } from "../../app/store"
import './Search.css'

export default function Search() {
    const searchField = useSearchField()
    const {setSearchField} = useEventActions()
    const handleChange = (e) => {
        e.preventDefault();
        setSearchField(e.target.value);
        console.log(searchField)
      };
  return (
    <input className='search'
          type="text"
          placeholder="Search here"
          value={searchField}
          onChange={handleChange}
        />
  )
}
