import React, { FC } from 'react';
import TaskContainer from './TaskContainer';

interface CellProps {
  date?: number;
}

const Cell: FC<CellProps> = ({ date }) => {
  return (
    <td className="p-2 w-8 h-6 align-top border-4 border-solid border-white bg-slate-100">
      {date}
      <TaskContainer day={date} />
    </td>
  );
};

export default Cell;
