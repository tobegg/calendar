import { v4 as uuid } from 'uuid';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import IOption from '@/models/IOption';
import { ITask } from '@/models/ITask';
import { tasksSlice } from '@/store/reducers/TasksSlice';
import { FC, useState } from 'react';
import Task from './Task';
import TaskModal from './TaskModal';

interface TaskContainerProps {
  date: number;
  month: number;
  year: number;
}

const TaskContainer: FC<TaskContainerProps> = ({ date, month, year }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { list, filter, labelFilter } = useAppSelector(state => state.taskReducer);
  const { addTask, editTask } = tasksSlice.actions;
  const dispatch = useAppDispatch();

  const cellTasks = list.filter(task => {
    return task.date === date
      && (!filter || task.title.toLowerCase().includes(filter.toLowerCase()))
      && (!labelFilter.length || labelFilter.some(item => task.labels.some(tl => tl.label === item.label)));
  });

  const handleNewTaskSubmit = (title: string, labels: IOption[]) => {
    dispatch(addTask({ 
      id: uuid(),
      labels,
      date,
      month,
      year, 
      title,
    }));
    setSelectedTask(null);
  };

  const handleTaskUpdate = (title: string, labels: IOption[]) => {
    dispatch(editTask({  ...selectedTask, title, labels }));
    setSelectedTask(null);
  };

  const handleTaskEdit = (task: ITask) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div>
      <Droppable droppableId={`task-${month}-${date}`} key={`task-${month}-${date}`}>
        {(provided) => (
          <div
            className="characters min-h-[50px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cellTasks.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => {
                    return (
                      <div
                        key={item.id}
                        className="task-wrapper"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task task={item} />
                        <button
                          type="button"
                          className="edit-task-btn bg-lime rounded px-2 absolute bottom-0 right-0 text-white z-10"
                          onClick={() => handleTaskEdit(item)}
                        >
                          Edit
                        </button>
                      </div>
                    )
                  }}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleNewTaskSubmit={handleNewTaskSubmit}
        handleTaskUpdate={handleTaskUpdate}
        editableTask={selectedTask}
      />
    </div>
  );
};

export default TaskContainer;