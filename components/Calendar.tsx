import React, { useState } from 'react';

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthDays = () => {
    const days = [];
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    return days;
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    event.preventDefault();
    setTasks([...tasks, { date: date.getDate(), month: date.getMonth(), year: date.getFullYear(), text: newTask }]);
    setNewTask('');
  };

  const renderCalendar = () => {
    const weekdays = weekdaysShort.map((day) => {
      return <th key={day}>{day}</th>;
    });

    const blanks = [];
    for (let i = 0; i < new Date(date.getFullYear(), date.getMonth(), 1).getDay(); i++) {
      blanks.push(<td key={i * 100}></td>);
    }

    const days = monthDays().map((day) => {
      const task = tasks.find((t) => t.date === day && t.month === date.getMonth() && t.year === date.getFullYear());
      return (
        <td key={day} className={day === new Date().getDate() && date.getMonth() === new Date().getMonth() ? 'today' : null}>
          {day}
          {task && <div className="task">{task.text}</div>}
        </td>
      );
    });

    const totalSlots = [...blanks, ...days];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    const dayHeaders = weekdaysShort.map(day => (
      <th key={day}>{day}</th>
  ));

    const calRows = rows.map((day, i) => {
      return <tr key={i * 100}>{day}</tr>;
    });

    return (
      <div className="calendar">
        <h2>{date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
        <table>
          <thead>
            <tr>{dayHeaders}</tr>
          </thead>
          <tbody>{calRows}</tbody>
        </table>
        <form onSubmit={handleNewTaskSubmit}>
          <label>
            Add task:
            <input type="text" value={newTask} onChange={handleNewTaskChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };

  return <div>{renderCalendar()}</div>;
}

export default Calendar;
