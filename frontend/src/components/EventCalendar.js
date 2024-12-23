import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = ({ events }) => {
  const handleDateClick = (date) => {
    // Logic to fetch and display events on the selected date
    console.log('Selected date:', date);
  };

  return (
    <div>
      <Calendar onClickDay={handleDateClick} />
      {/* Render events based on the selected date */}
    </div>
  );
};

export default EventCalendar;