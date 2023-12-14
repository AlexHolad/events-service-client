// REACT HOOKS
import { useEffect } from "react";
// REACT ROUTER
import { Link } from "react-router-dom";
// STORE
import { useVenues, useEventActions } from "../../app/store";

import "./VenuesPage.css";

export default function VenuesPage() {
  const { getVenues } = useEventActions();
  useEffect(() => {
    getVenues();
  }, [getVenues]);

  const venues = useVenues();

  return (
    <div className="gen__container">
      <h3 className="venuepage__headline">Площадки</h3>
      <ul className="venuepage__venuelist">
        {venues.map((venue) => (
          <li className='venues__venueblock' key={venue.title}>
            <a href={venue.maplink} target="_blank" rel="noreferrer">
            <img width="25" height="25" src="https://img.icons8.com/ios/f0a500/marker--v1.png" alt="marker--v1"/>
            </a>
            <Link to={`/events/venue/${venue.location}`}>{venue.location}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
