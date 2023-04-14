import { months, weekDays } from '@/constants';
import React, { useRef, useState } from 'react';
import Cell from './Cell';

function Calendar() {
  const dateNow = new Date();

  const daysList = () => {
    const lastDayOfCurrentMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const generateTableHeader = () => {
    return weekDays.map((weekName) => {
      return <th key={weekName}>{weekName}</th>;
    });
  }

  const generateTableBody = () => {
    const weekDayMonthBegins = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getDay();
    const emptyCells = Array.from({ length: weekDayMonthBegins }, (_, i) => (
      <Cell key={`empty-${i}`} />
    ));

    const days = daysList().map((day) => (
      <Cell key={day} date={day} />
    ));

    const totalCells = [...emptyCells, ...days];

    const rows = Array.from({ length: Math.ceil(totalCells.length / 7) }, (_, i) => {
      const startPosition = i * 7;
      return totalCells.slice(startPosition, startPosition + 7)
    });

    return rows.map((row, i) => (
      <tr key={i}>{row}</tr>
    ));
  };

  return (
    <div className="calendar">
      <div className="header text-3xl font-bold underline">
        <h1>
          {months[dateNow.getMonth()]} {dateNow.getFullYear()}
        </h1>
      </div>
      <table className="table w-[1200px] h-[600px]">
        <thead>
          <tr>{generateTableHeader()}</tr>
        </thead>
        <tbody>{generateTableBody()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;
