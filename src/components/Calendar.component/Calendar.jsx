import { useState } from "react";

import { useNavigate } from "react-router-dom";

import moment from "moment";

import Calendar from 'react-calendar';
import './Calendar.css';

import {useEvents,  useDate, useEventActions} from '../../app/store.js'

function CalendarElement() {
    const date = useDate()
    const {setDate} = useEventActions()
    const events = useEvents()
    const mark = new Set(events.map(({date})=> (moment(date).format("DD-MM-YYYY"))))

    console.log('dates array', mark)


    const navigate = useNavigate()
    const goToDateList = () => {
      navigate(`/events/date`)
    }
    return (
      <div>
        <Calendar 
        // MARKED DATAS CLASS
        tileClassName={({ date }) => {
          if(mark.has(moment(date).format("DD-MM-YYYY"))){
           return  'highlight'
          }
        }}
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
            minDate={new Date()}
            /> 
      </div>
    );
  }

  export default CalendarElement