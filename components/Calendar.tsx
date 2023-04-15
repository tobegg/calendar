import { MONTHS, WEEK_DAYS } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { toPng } from 'html-to-image'
import IOption from '@/models/IOption';
import { tasksSlice } from '@/store/reducers/TasksSlice';
import { ChangeEventHandler, useCallback, useRef } from 'react';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import Cell from './Cell';
import LabelMultiSelect from './LabelMultiSelect';

function Calendar() {
  const { list, labels, labelFilter } = useAppSelector(state => state.taskReducer);
  const { replaceTask, changeFilter, changeLabelFilter } = tasksSlice.actions
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth();


  const daysList = () => {
    const lastDayOfCurrentMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const generateTableHeader = () => {
    return WEEK_DAYS.map((weekName) => {
      return <th key={weekName}>{weekName}</th>;
    });
  }

  const generateTableBody = () => {
    const weekDayMonthBegins = new Date(year, month, 1).getDay();
    const emptyCells = Array.from({ length: weekDayMonthBegins }, (_, i) => (
      <Cell key={`empty-${i}`} month={month} year={year} />
    ));

    const days = daysList().map((day) => (
      <Cell key={day} date={day} month={month} year={year} />
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

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
      const destinationDate = destination.droppableId.split('-');
      const date = destinationDate[destinationDate.length-1];
      dispatch(replaceTask({
        id: result.draggableId,
        date: Number(date),
        order: destination.index
      }));
  }

  const downloadPng = useCallback(() => {
    if (ref.current === null) {
      return
    }
    toPng(ref.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'screen.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      })
  }, [ref]);

  const downloadJson = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(list))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
  };

  const handleChangeNameFilter: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeFilter(e.target.value));
  }

  const handleChangeLabelFilter = (val: IOption[]) => {
    dispatch(changeLabelFilter(val));
  }

  return (
    <div className="calendar" ref={ref}>
      <div className="header text-3xl font-bold underline">
        <h1>
          {MONTHS[month]} {year}
        </h1>
        <div className="flex items-end justify-end filter text-md mb-6">
          <label className="text-sm w-[300px]">Filter by name:
            <input type="text" onChange={handleChangeNameFilter} className="w-full rounded border-2 h-10 p-1" />
          </label>
          <label className="text-sm w-[300px] ml-4">Filter by label:
            <LabelMultiSelect
              options={labels}
              onChange={handleChangeLabelFilter}
              selectedValue={labelFilter} 
            />
          </label>
          <button type="button" className="text-sm bg-green px-6 py-2 ml-4 h-[38px] rounded" onClick={downloadPng}>Save Png</button>
          <button type="button" className="text-sm bg-green px-6 py-2 ml-4 h-[38px] rounded" onClick={downloadJson}>Save Json</button>
        </div>
      </div>
      <table className="table w-[1200px] h-[600px]">
        <thead>
          <tr>{generateTableHeader()}</tr>
        </thead>
        <tbody>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {generateTableBody()}
          </DragDropContext>
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
