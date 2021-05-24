import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const CalendarEmbed = (props) => {
  const [value, onChange] = useState(new Date());
  return (<div>
    <Calendar
      onChange={onChange}
      value={value}
    />
  </div>)
}

export default CalendarEmbed


// Extras

// <iframe src="https://calendar.google.com/calendar/embed?src=atg1dds4cqq5qi6177jgf44lm4%40group.calendar.google.com&ctz=Europe%2FZurich" style={{border: 0 }} width="800" height="600" frameBorder="0" scrolling="no"></iframe>