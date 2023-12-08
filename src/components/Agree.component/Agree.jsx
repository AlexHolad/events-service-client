import React from 'react'
import Button from '../Button.component/Button'

import "./Agree.css"

import { useEventActions } from '../../app/store'

export default function Agree({doaction, cancel, cancelValue, thequestion, theaction__param, thebtn1text, thebtn2text}) {
  return (
    <div className={`mask ${!theaction__param ? "hidden" : ""}`}>
    <div className={`agree__container`}>
        <p className='agree__question'>{thequestion}</p>
        <div className='agree_buttons'>
            <button className='button' onClick={()=> cancel(cancelValue)}>{thebtn1text}</button>
            <button className='button' onClick={()=> doaction(theaction__param)}>{thebtn2text}</button>
        </div>
    </div>
    </div>
  )
}
