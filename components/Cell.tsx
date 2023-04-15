import { eventAPI } from '@/services/EventService';
import React, { FC } from 'react';
import TaskContainer from './TaskContainer';

interface CellProps {
  date?: number;
  month: number;
  year: number;
}

const Cell: FC<CellProps> = ({ date, month, year }) => {
  const { data: events } = eventAPI.useFetchAllEventsQuery(5);
  const cellEvents = events?.filter(event => {
    const dateArr = event.date.split('-');
    return Number(dateArr[dateArr.length-1]) === date
});
  return (
    <td className="p-2 h-6 align-top border-4 border-solid border-white bg-slate-100 w-[170px]">
      <strong>{date}</strong>
      {cellEvents?.length ? (
        <span className="ml-2 text-sm">{cellEvents[0].name}</span>
      ): null}
      {date && <TaskContainer date={date} month={month} year={year} />}
    </td>
  );
};

export default Cell;
