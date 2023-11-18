import { Outlet } from "react-router-dom";
import { Navbar } from "./app/Navbar";

export default function Layout() {
    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <Navbar/>
        <Outlet />
      </div>
    );
  }