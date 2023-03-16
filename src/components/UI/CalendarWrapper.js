import React, { useState } from "react";

import Calendar from "react-calendar";

import classes from "./CalendarWrapper.module.css";

const CalendarWrapper = () => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <div className={classes.div}>
      <Calendar
        className={classes.calendar}
        tileContent={({ date, view }) =>
          view === "month" && date.getDay() === 0 ? <p>It's Sunday!</p> : ""
        }
        onChange={setCalendarDate}
        value={calendarDate}
      />
    </div>
  );
};

export default CalendarWrapper;
