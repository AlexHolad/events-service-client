import { Outlet } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import Footer from "./app/Footer";
import { useCookies } from 'react-cookie';
import CookieConsent from "./components/CookieConsent/CookieConsent";

export default function Layout() {
  const [cookies] = useCookies(['cookieConsent']);

    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <Navbar/>
        <Outlet />
        {!cookies.cookieConsent && <CookieConsent/>}
        <Footer />
      </div>
    );
  }