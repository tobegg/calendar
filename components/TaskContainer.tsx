import { mockedLabel } from '@/constants/mock';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { tasksSlice } from '@/store/reducers/TasksSlice';
import React, { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';

interface TaskContainerProps {
  day: number | undefined;
}

const TaskContainer: FC<TaskContainerProps> = ({ day }) => {
  const [date, setDate] = useState(new Date());
  const [newTask, setNewTask] = useState<string>('');
  const { list } = useAppSelector(state => state.taskReducer);
  const { addTask } = tasksSlice.actions
  const dispatch = useAppDispatch();

   const getDayTasks = () => {
    console.log('list', list)
    return list.filter(task => task.date === day);
  };

  const handleNewTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleNewTaskSubmit = (event) => {
    console.log(event);
    event?.preventDefault();

    dispatch(addTask({ 
      id: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      labels: [mockedLabel],
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(), 
      title: newTask 
    }));
    setNewTask('');
  };


  return (
    <div>
      {getDayTasks().map(item => (
        <Task key={item.id} task={item} />
      ))}
      <TaskModal newTask={newTask} handleNewTaskChange={handleNewTaskChange} handleNewTaskSubmit={handleNewTaskSubmit} />
    </div>
  );
};

export default TaskContainer;