import { useState } from "react";
import {useDate, useEventActions} from "../../app/store"

import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

function CalendarElement() {
    const date = useDate()
    const {setDate} = useEventActions()
  
    return (
      <div>
        <Calendar 
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date"
            yearAriaLabel="Year" 
            locale="ru-RU"
            onChange={setDate} 
            value={date} />
      </div>
    );
  }

  export default CalendarElement