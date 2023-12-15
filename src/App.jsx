import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";



import "./App.css";

import { useEventActions} from "./app/store";

import Layout from "./Layout";

import HomePage from "./pages/HomePage/HomePage";
import Impressum from "./pages/Impressum/Impressum"
import Datenschutz from "./pages/Datenschutz/Datenschutz";

// import Register from "./features/auth/Register";
import NoMatch  from "./pages/NoMatch/NoMatch";
import AddEventForm from "./features/events/AddEventForm";
import Event from "./features/events/Event";
import SignIn from "./features/auth/SignIn";
import UserPage from "./pages/UserPage/UserPage";
import EditEventForm from "./features/events/EditEventForm";
import { EventsList } from "./features/events/EventsList";
import VenuesPage from "./pages/VenuesPage/VenuesPage";



function App() {

  const {refresh} = useEventActions()
  useEffect(()=> {
    refresh()
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* HOMEPAGE */}
          <Route index element={<HomePage />} />/
          {/* GENERAL PAGES */}
          <Route path="about" element={<h1>About</h1>} />
          <Route path="datenschutz" element={<Datenschutz/>} />
          <Route path="impressum" element={<Impressum/>} />

          <Route path="venues" element={<VenuesPage/>} />
         
          {/* SHOW EVENTS BY VENUE/CATEGORY/DATE */}
          <Route path="events/venue/:venue" element={<EventsList/>} />
          <Route path="events/category/:category" element={<EventsList/>} />
          <Route path="events/subcategory/:subcategory" element={<EventsList/>} />
          <Route path="events/date" element={<EventsList/>} />
          <Route path="events/search/:search" element={<EventsList/>} />

          {/* SHOW EVENT BY ID */}
          <Route path="event/:eventId" element={<Event />} />

          {/* REGISTER SIGNIN */}
          {/* <Route path="register" element={<Register/>} /> */}
          <Route path="signin" element={<SignIn/>} />

          {/* USER ROLE 'ORG' CAN REGISTER ADD EDIT AND DELETE THEIR EVENTS*/}
          <Route path="user" element={<UserPage />} />
          <Route path="events/add" element={<AddEventForm />} />
          <Route path="events/edit/:eventId" element={<EditEventForm/>} />
          <Route path="events/preview/:id" element={<h1>Edit Event</h1>} />
          
          {/* ADMIN FUNC 'ADMIN' */}
          {/* Add, Edit, Delete all events */}
          {/* Share event to social media all in one */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
