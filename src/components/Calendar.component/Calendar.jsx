import { useState } from "react";

import { useNavigate } from "react-router-dom";

import moment from "moment";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {useDate, useEventActions} from '../../app/store.js'

function CalendarElement() {
    const date = useDate()
    const {setDate} = useEventActions()

    const navigate = useNavigate()
    const goToDateList = () => {
      navigate(`/events/date`)
    }
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
            value={date} 
            onClickDay={goToDateList}
            /> 
      </div>
    );
  }

  export default CalendarElement