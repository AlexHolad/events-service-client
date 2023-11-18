import { Link } from "react-router-dom"
import "./NoMatch.css"


const NoMatch = () => {
  return (
    <div className="notfound__container">
      <h1 className="notfound__text">Page not found</h1>
      <p className="notfound__link">
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}


export default NoMatch