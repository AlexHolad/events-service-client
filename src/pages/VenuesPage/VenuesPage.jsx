// REACT HOOKS
import { useEffect } from 'react'
// REACT ROUTER
import { Link } from 'react-router-dom'
// STORE
import { useVenues, useEventActions } from '../../app/store'

import './VenuesPage.css'

export default function VenuesPage() {
    const {getVenues} = useEventActions()
    useEffect(()=>{
        getVenues()
    },[getVenues])

    const venues = useVenues()
  return (
    <div className='gen__container'>
        <h3 className='venuepage__headline'>Площадки</h3>
        <ul className='venuepage__venuelist'>
            {venues.map(venue => <li key={venue}><Link to={`/events/venue/${venue}`}>{venue}</Link></li>)}
        </ul>
    </div>
  )
}
