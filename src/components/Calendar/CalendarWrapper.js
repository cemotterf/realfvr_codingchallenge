import React, { useState } from "react";

import Calendar from "react-calendar";

import classes from "./CalendarWrapper.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const CalendarWrapper = (props) => {
  const [calendarDate, setCalendarDate] = useState(new Date());

  return (
    <div className={classes.div}>
      {props.isModalOpen && (
        <Modal
          title={props.modalContent.title}
          message={props.modalContent.message}
          onConfirm={props.onOpenModal}
        />
      )}
      <Button className={classes.button} onClick={props.onOpenModal}>
        Add Calendar Entry
      </Button>
      <Calendar
        className={classes.calendar}
        tileContent={({ date, view }) => {
          for (let i = 0; i < props.calendarEntries?.length; i++) {
            if (
              view === "month" &&
              date.getDate() - 1 ===
                new Date(props.calendarEntries?.[i].date).getDate() &&
              date.getMonth() ===
                new Date(props.calendarEntries?.[i].date).getMonth() &&
              date.getFullYear() ===
                new Date(props.calendarEntries?.[i].date).getFullYear()
            ) {
              return <p>{props.calendarEntries?.[i].path}</p>;
            }
          }
        }}
        onChange={setCalendarDate}
        value={calendarDate}
      />
    </div>
  );
};

export default CalendarWrapper;
