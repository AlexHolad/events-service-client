import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useToken, useSearchField, useEventActions } from "./store";

import Search from "../components/Search.component/Search";
import CalendarElement from "../components/Calendar.component/Calendar";

import "./Navbar.css";

export const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [visCalendar, toggleVisCalendar] = useState(false);

  const accessToken = useToken();
  const { signout, setCategory, setDate, setSearchField } = useEventActions();

  const navigate = useNavigate();

  const filterByCategory = (category) => {
    setCategory(category);
    setMenuToggle(false);
  };

  const resetFilters = () => {
    filterByCategory("все");
    setDate(new Date());
    setSearchField('')
  };

  const handleSignOut = async () => {
    try {
      signout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <nav className="nav container direction">
        <div className="nav__firstline row">
          <Link to="/" onClick={() => resetFilters()}>
            <h1 className="logo">{`Berlin Event`}</h1>
          </Link>
          <div className="nav__icons row">
            <div className="dropdown">
            <svg
              className="nav__icon calendar__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <div className="dropdown-content">
                <Search/>
              </div>
            </div>
            <div className="dropdown">
              <svg
                onClick={() => toggleVisCalendar(!visCalendar)}
                className="nav__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
              </svg>
              <div className="dropdown-content">
                <CalendarElement />
              </div>
            </div>
            {!accessToken ? (
              <Link to="/signin" className="nav__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
              </Link>
            ) : (
              <div className="nav__icons row">
                <Link to="/user" className="nav__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="nav__icon"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </Link>
                <svg
                  onClick={handleSignOut}
                  className="nav__icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
              </div>
            )}
            <svg
              onClick={() => setMenuToggle(!menuToggle)}
              className="nav__icon hamburger"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
        </div>
        <div className={`nav__secondline ${menuToggle ? "shown" : "toggle"}`}>
          <ul className="nav__list">
            <li onClick={() => resetFilters()} className="nav__item">
              Все
            </li>
            <li className="nav__item">Площадки</li>
            <li
              onClick={() => filterByCategory("концерты")}
              className="nav__item"
            >
              Концерты
            </li>
            <li onClick={() => filterByCategory("театр")} className="nav__item">
              Театр
            </li>
            <li onClick={() => filterByCategory("детям")} className="nav__item">
              Детям
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
