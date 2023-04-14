import { ITask } from '@/models/ITask';
import React, { FC } from 'react';
import Label from './Label';

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  console.log(task);
  return (
    <div className="bg-white rounded p-2 mb-2">
      <div>
        {task.labels.map(label => (
          <Label key={label.id} color={label.color} />
        ))}
      </div>
      <p>{task.title}</p>
    </div>
  );
};

export default Task;
