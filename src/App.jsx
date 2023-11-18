import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { useEventActions, useToken } from "./app/store";

import Layout from "./Layout";

import { EventsList } from "./features/events/EventsList";
import Register from "./features/auth/Register";
import NoMatch  from "./pages/NoMatch/NoMatch";
import AddEventForm from "./features/events/AddEventForm";
import Event from "./features/events/Event";
import SignIn from "./features/auth/SignIn";
import UserPage from "./pages/UserPage/UserPage";
import EditEventForm from "./features/events/EditEventForm";

function App() {
  const {refresh} = useEventActions()
  useEffect(()=> {
    refresh()
  })
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* USER FUNC */}
          <Route index element={<EventsList />} />/
          <Route path="about" element={<h1>About</h1>} />
          <Route path="category" element={<h1>Category</h1>} />
          <Route path="events/:eventId" element={<Event />} />


          <Route path="register" element={<Register/>} />
          <Route path="signin" element={<SignIn/>} />

          {/* USER ROLE 'ORG' */}
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
