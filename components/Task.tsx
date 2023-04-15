import { ITask } from '@/models/ITask';
import { FC } from 'react';
import Label from './Label';

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  return (
    <div className="bg-white rounded p-2 mb-2">
      <div className="flex flex-wrap">
        {task.labels?.length ? task.labels.map(label => (
          <Label key={label.value} color={label.value} />
        )) : null}
      </div>
      <p>{task.title}</p>
    </div>
  );
};

export default Task;
